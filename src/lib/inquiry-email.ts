import type { Inquiry } from "@/lib/inquiry";

const inquiryRecipient = "trilocanaa26@gmail.com";

function getInquiryRecipients() {
  const setting = process.env.CONTACT_TO_EMAIL?.trim();
  if (!setting) return [inquiryRecipient];

  let recipients: string[];
  if (setting.startsWith("[")) {
    let parsed: unknown;
    try {
      parsed = JSON.parse(setting);
    } catch {
      throw new Error("CONTACT_TO_EMAIL must be a valid JSON array or comma-separated list");
    }
    if (!Array.isArray(parsed) || !parsed.every((recipient) => typeof recipient === "string")) {
      throw new Error("CONTACT_TO_EMAIL JSON value must be an array of email addresses");
    }
    recipients = parsed;
  } else {
    recipients = setting.split(",");
  }

  const normalizedRecipients = recipients.map((recipient) => recipient.trim());
  if (normalizedRecipients.length === 0 || normalizedRecipients.some((recipient) => !recipient)) {
    throw new Error("CONTACT_TO_EMAIL must contain one or more non-empty email addresses");
  }

  return normalizedRecipients;
}

export async function sendInquiryEmail(inquiry: Inquiry) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = getInquiryRecipients();
  if (!apiKey || !from) throw new Error("Email delivery is not configured");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: inquiry.email,
      subject: `Website enquiry: ${inquiry.subject}`,
      text: [
        "A new website enquiry was submitted.",
        "",
        `Name: ${inquiry.fullName}`,
        `Email: ${inquiry.email}`,
        `Phone: ${inquiry.phone}`,
        `Subject: ${inquiry.subject}`,
        "",
        "Message:",
        inquiry.message,
      ].join("\n"),
    }),
    cache: "no-store",
  });
  if (!response.ok) {
    const result = (await response.json().catch(() => null)) as
      | { name?: unknown; message?: unknown }
      | null;
    const reason =
      response.status === 401
        ? "check RESEND_API_KEY permissions and validity"
        : response.status === 403
          ? "check sender-domain verification and API-key permissions"
          : response.status === 422
            ? "check CONTACT_FROM_EMAIL and the recipient"
            : "check the Resend dashboard for details";
    const errorName =
      typeof result?.name === "string" ? `, ${result.name}` : "";
    const errorMessage =
      typeof result?.message === "string"
        ? `: ${result.message.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[email]").slice(0, 180)}`
        : "";
    throw new Error(
      `Resend rejected the email (HTTP ${response.status}${errorName}${errorMessage}; ${reason})`,
    );
  }
}
