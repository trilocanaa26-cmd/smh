import { NextResponse } from "next/server";
import type { Inquiry } from "@/lib/inquiry";
import { sendInquiryEmail } from "@/lib/inquiry-email";
import { appendInquiryToGoogleSheet } from "@/lib/inquiry-storage";
import { isContactRateLimited } from "@/lib/rate-limit";

export const runtime = "nodejs";

const maxRequestBytes = 12_000;

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, maxLength);
}

function parseInquiry(input: unknown): Inquiry | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const data = input as Record<string, unknown>;
  const inquiry = {
    fullName: cleanText(data.fullName, 100).replace(/\s+/g, " "),
    email: cleanText(data.email, 254).toLowerCase(),
    phone: cleanText(data.phone, 20),
    subject: cleanText(data.subject, 120).replace(/\s+/g, " "),
    message: cleanText(data.message, 3000),
  };
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const phoneDigits = inquiry.phone.replace(/\D/g, "");
  
  if (
    inquiry.fullName.length < 2 ||
    !emailPattern.test(inquiry.email) ||
    phoneDigits.length < 7 ||
    !/^[+()\d\s.-]{7,20}$/.test(inquiry.phone) ||
    inquiry.subject.length < 2 ||
    inquiry.message.length < 10 ||
    Object.values(inquiry).some((value) => !value)
  ) {
    return null;
  }
  return inquiry;
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > maxRequestBytes) {
    return NextResponse.json({ message: "Your message is too large." }, { status: 413 });
  }

  let body: unknown;
  try {
    const rawBody = await request.text();
    if (Buffer.byteLength(rawBody, "utf8") > maxRequestBytes) {
      return NextResponse.json({ message: "Your message is too large." }, { status: 413 });
    }
    body = JSON.parse(rawBody) as unknown;
  } catch {
    return NextResponse.json({ message: "Please submit a valid form." }, { status: 400 });
  }
  if (
    body &&
    typeof body === "object" &&
    "website" in body &&
    cleanText((body as { website?: unknown }).website, 200)
  ) {
    return NextResponse.json(
      { message: "Your enquiry could not be submitted." },
      { status: 400 },
    );
  }

  const inquiry = parseInquiry(body);
  if (!inquiry) {
    return NextResponse.json(
      { message: "Check the required fields and enter valid contact details." },
      { status: 400 },
    );
  }

  try {
    if (await isContactRateLimited(request)) {
      return NextResponse.json(
        { message: "Too many enquiries were sent. Please try again in a few minutes." },
        { status: 429 },
      );
    }
  } catch (error) {
    console.error("Contact form rate limiting failed", error);
    return NextResponse.json(
      { message: "The enquiry service is temporarily unavailable. Please try again later." },
      { status: 503 },
    );
  }

  const results = await Promise.allSettled([
    appendInquiryToGoogleSheet(inquiry),
    sendInquiryEmail(inquiry),
  ]);
  const sheetSaved = results[0].status === "fulfilled";
  const emailSent = results[1].status === "fulfilled";
  if (!sheetSaved || !emailSent) {
    const failures = results.flatMap((result) =>
      result.status === "rejected" ? [result.reason] : [],
    );
    console.error("Contact form delivery failed", {
      sheetSaved,
      emailSent,
      failures,
    });
    return NextResponse.json(
      { message: "We couldn’t complete your enquiry. Please try again later." },
      { status: 502 },
    );
  }

  return NextResponse.json({ message: "Enquiry sent." }, { status: 200 });
}
