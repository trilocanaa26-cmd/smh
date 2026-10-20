import assert from "node:assert/strict";
import test from "node:test";
import { sendInquiryEmail } from "../src/lib/inquiry-email.ts";

const inquiry = {
  fullName: "Test Patient",
  email: "patient@example.com",
  phone: "1234567890",
  subject: "Appointment",
  message: "Please call me.",
};

async function captureRecipients(setting) {
  const originalSetting = process.env.CONTACT_TO_EMAIL;
  const originalApiKey = process.env.RESEND_API_KEY;
  const originalFrom = process.env.CONTACT_FROM_EMAIL;
  const originalFetch = globalThis.fetch;
  let requestBody;

  process.env.CONTACT_TO_EMAIL = setting;
  process.env.RESEND_API_KEY = "test-api-key";
  process.env.CONTACT_FROM_EMAIL = "Hospital <hospital@example.com>";
  globalThis.fetch = async (_url, options) => {
    requestBody = JSON.parse(options.body);
    return new Response(null, { status: 200 });
  };

  try {
    await sendInquiryEmail(inquiry);
    return requestBody.to;
  } finally {
    if (originalSetting === undefined) delete process.env.CONTACT_TO_EMAIL;
    else process.env.CONTACT_TO_EMAIL = originalSetting;
    if (originalApiKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = originalApiKey;
    if (originalFrom === undefined) delete process.env.CONTACT_FROM_EMAIL;
    else process.env.CONTACT_FROM_EMAIL = originalFrom;
    globalThis.fetch = originalFetch;
  }
}

test("sends to multiple comma-separated contact recipients", async () => {
  assert.deepEqual(
    await captureRecipients("first@example.com, second@example.com"),
    ["first@example.com", "second@example.com"],
  );
});

test("sends to multiple JSON-array contact recipients", async () => {
  assert.deepEqual(
    await captureRecipients('["first@example.com","second@example.com"]'),
    ["first@example.com", "second@example.com"],
  );
});
