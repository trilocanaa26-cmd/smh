# Sai Multispeciality Hospital website

A responsive Next.js App Router website for Sai Multispeciality Hospital in Pimple Gurav, New Sangvi, Pune. It uses a shared blue-and-white theme, dedicated specialty pages, verified doctor profiles, accessibility features, local SEO metadata and structured data, `sitemap.xml`, `robots.txt`, and a contact form API for email and persistent inquiry storage.

## Hospital content

- Featured specialties: Paediatrics / Pediatrics, General Surgery, Endoscopic Surgery and Laparoscopic Surgery.
- Dr. Suresh Naik: MS General Surgeon; General Surgery, Endoscopic Surgery and Laparoscopic Surgery.
- Dr. Neha Naik: MD Pediatrics, DNB Pediatrics; Paediatrics / Pediatrics.
- Address: Govinda Market, Opposite Samarth Nagar, Shivaji Park, Pimple Gurav, New Sangvi, Pune – 411061.
- Phone: +91 93739 10945 and 020-29992511.

Contact information and featured specialties live in `src/lib/site.ts`; verified profiles live in `src/lib/doctors.ts`. Existing service URLs remain accessible, but unconfirmed departments are presented as general information rather than advertised services. No opening hours, emergency provision, experience claims or doctor photos have been added. Healthcare illustrations are decorative, not photographs of the actual premises.

Appointment buttons open the existing enquiry form. A successful submission is an enquiry, not a confirmed appointment. The existing email, spreadsheet and rate-limiting integrations are preserved.

## Local development

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Set the integration variables below before submitting the contact form. The form intentionally reports a service error until its providers are configured.

## Contact form setup

### Email delivery (Resend)

1. Create a Resend account and verify a sending domain.
2. Create an API key and set `RESEND_API_KEY`.
3. Set `CONTACT_FROM_EMAIL` to an address on the verified domain.
4. Submissions go to `admin@testhospital.com` by default. Set `CONTACT_TO_EMAIL` to override the receiving address.

#### Testing without a domain

Resend's shared sender can send only to the email address associated with your Resend account. Set these values in `.env.local`, keeping your existing `RESEND_API_KEY`:

```dotenv
CONTACT_FROM_EMAIL="Sai Multispeciality Hospital <onboarding@resend.dev>"
CONTACT_TO_EMAIL=your-resend-account-email@example.com
```

Restart the development server after changing the configuration. No domain verification is needed for this test setup. You cannot add or verify `gmail.com` because you do not own its DNS. A Gmail address can be the recipient or the enquiry's reply-to address, but not the Resend sender. The form already uses the visitor's email as `reply_to`.

For production, verify a domain you own by adding Resend's DNS records, change `CONTACT_FROM_EMAIL` to an address on that domain, and set `CONTACT_TO_EMAIL` to the intended hospital inbox. Configure these values separately in Vercel and redeploy.

If the API logs `sheetSaved: true` and `emailSent: false`, the enquiry is already stored in Google Sheets even though the API returns 502. Retrying submits another spreadsheet row; check existing entries before repeating a real enquiry.

### Persistent spreadsheet storage (Google Sheets)

The Google Sheets API appends each inquiry as a new row; Vercel's ephemeral filesystem is not used for persistence.

1. Create a Google Cloud project and enable the Google Sheets API.
2. Create a service account and private key. Keep the key secret. Copy the JSON `private_key` value into `.env.local` without the JSON field's trailing comma or surrounding JSON punctuation; keep its escaped `\n` line breaks.
3. Create a spreadsheet and share it with the service account email with Editor access.
4. Create a tab named `Inquiries`; add these headers in row 1: `Submission Date/Time`, `Full Name`, `Email`, `Phone Number`, `Subject`, `Message`.
5. Set `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY` and `GOOGLE_SHEETS_SPREADSHEET_ID`.
6. Set `GOOGLE_SHEETS_RANGE` to `Inquiries!A:F` or the matching range in your spreadsheet.

Each submission is appended with a UTC ISO-8601 timestamp using `INSERT_ROWS`; the spreadsheet can be downloaded or exported as an Excel workbook. Restrict spreadsheet access and set an appropriate retention policy.

### Rate limiting

Create an Upstash Redis database and configure `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`. The API allows five attempts per IP per minute. If the rate limiter is missing or unavailable, submissions fail closed with a service-unavailable response.

## Environment variables

See `.env.example`. Add the provider credentials to Vercel Project Settings for Production (and Preview if needed). The canonical URL and public hospital contact information are hardcoded in `src/lib/site.ts`; update those constants in source when the details change.

## Hospital-specific launch checklist

The supplied hospital name, address, phone numbers, doctors and four specialties are now used throughout the site. Before launch:

- Verify the existing canonical domain (`https://sangavi-hospital.com`) and public email (`info@sangavi-hospital.com`) in `src/lib/site.ts`. They have been preserved because no replacements were supplied.
- Confirm the Google Maps destination and entrance before publishing.
- Add approved doctor photographs only when available; do not substitute stock portraits.
- Confirm consultation timings and any additional departments or facilities before advertising them.
- Add approved patient testimonials only after obtaining permission and confirming that the wording is accurate.
- Review the privacy policy, terms, data retention and patient information handling with the responsible team.
- Test all contact integrations in the deployed Vercel environment.

## Build and deploy

```powershell
npm run lint
npm run typecheck
npm test
npm run build
```

The regression tests use Node.js native TypeScript support (Node.js 22.18+ or 24+), without additional test dependencies. They verify hospital details, telephone links, map destination, specialty coverage, preserved service URLs, doctor credentials, structured data and core WCAG AA palette contrast. For release, also check mobile navigation, keyboard focus, reduced motion and the enquiry form in a browser. Test delivery with approved test data in a non-production environment to avoid creating real patient enquiries.

Import the project into Vercel, choose the Next.js framework preset and configure production environment variables. The project uses standard Next.js routing and build settings, with no persistent local storage or custom Vercel build configuration.
