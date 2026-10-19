import { createPrivateKey, createSign } from "node:crypto";
import type { Inquiry } from "@/lib/inquiry";

function base64Url(value: string | Buffer) {
  return Buffer.from(value).toString("base64url");
}

async function getGoogleAccessToken() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKeyValue = process.env.GOOGLE_PRIVATE_KEY
    ?.replace(/\\n/g, "\n")
    .trim()
    .replace(/^["']|["']$/g, "");
  if (!email || !privateKeyValue) {
    throw new Error("Spreadsheet credentials are not configured");
  }

  let privateKey;
  try {
    privateKey = createPrivateKey(privateKeyValue);
  } catch (error) {
    throw new Error(
      "GOOGLE_PRIVATE_KEY is not valid PEM. Copy the service account JSON private_key value, remove JSON punctuation, and use escaped \\n line breaks.",
      { cause: error },
    );
  }

  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64Url(
    JSON.stringify({
      iss: email,
      scope: "https://www.googleapis.com/auth/spreadsheets",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    }),
  );
  const unsignedToken = `${header}.${claims}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsignedToken);
  const assertion = `${unsignedToken}.${signer.sign(privateKey).toString("base64url")}`;

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
    cache: "no-store",
  });
  if (!response.ok) {
    const error = (await response.json().catch(() => null)) as
      | { error?: unknown; error_description?: unknown }
      | null;
    const code = typeof error?.error === "string" ? error.error : "unknown_error";
    const description =
      typeof error?.error_description === "string"
        ? error.error_description.slice(0, 180)
        : "no error description";
    throw new Error(
      `Google OAuth rejected the service account (HTTP ${response.status}, ${code}: ${description})`,
    );
  }
  const token = (await response.json()) as { access_token?: string };
  if (!token.access_token) throw new Error("Spreadsheet authentication returned no token");
  return token.access_token;
}

export async function appendInquiryToGoogleSheet(inquiry: Inquiry) {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const range = process.env.GOOGLE_SHEETS_RANGE ?? "Inquiries!A:F";
  if (!spreadsheetId) throw new Error("Spreadsheet ID is not configured");

  const accessToken = await getGoogleAccessToken();
  const endpoint = new URL(
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(spreadsheetId)}/values/${encodeURIComponent(range)}:append`,
  );
  endpoint.searchParams.set("valueInputOption", "RAW");
  endpoint.searchParams.set("insertDataOption", "INSERT_ROWS");
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      majorDimension: "ROWS",
      values: [[new Date().toISOString(), inquiry.fullName, inquiry.email, inquiry.phone, inquiry.subject, inquiry.message]],
    }),
    cache: "no-store",
  });
  if (!response.ok) {
    const error = (await response.json().catch(() => null)) as
      | { error?: { status?: unknown; message?: unknown } }
      | null;
    const code =
      typeof error?.error?.status === "string"
        ? error.error.status
        : "unknown_error";
    const message =
      typeof error?.error?.message === "string"
        ? error.error.message.slice(0, 180)
        : "no error description";
    throw new Error(
      `Google Sheets rejected the append request (HTTP ${response.status}, ${code}: ${message})`,
    );
  }
}
