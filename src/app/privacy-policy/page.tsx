import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how Sai Multispeciality Hospital handles contact form information.",
  alternates: { canonical: absoluteUrl("/privacy-policy") },
  openGraph: {
    title: "Privacy Policy",
    description: "Learn how Sai Multispeciality Hospital handles contact form information.",
    url: absoluteUrl("/privacy-policy"),
  },
  twitter: {
    title: "Privacy Policy",
    description: "Learn how Sai Multispeciality Hospital handles contact form information.",
  },
  robots: { index: false, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="page-hero"><div className="container"><div className="breadcrumbs"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>Privacy policy</span></div><span className="eyebrow">Your information</span><h1>Privacy <em>policy.</em></h1><p>How information submitted through this website is handled.</p></div></section>
      <section className="prose-section"><div className="container prose-grid"><aside className="prose-aside">Your information</aside><div className="prose-content legal-content"><h2>Information you provide</h2><p>When you use the contact form, we collect the name, email address, phone number, subject and message you submit. Please do not send sensitive health details through this general enquiry form.</p><h2>How we use it</h2><p>Your submission is used to respond to your enquiry and coordinate follow-up. Submissions are emailed to the hospital’s configured contact address and appended to the configured private inquiry spreadsheet.</p><h2>Storage and service providers</h2><p>The website uses email delivery, a spreadsheet service and a hosted rate-limiting service configured by the operator. Data is processed by those providers under their terms and privacy practices. The operator should confirm retention, access controls and applicable legal obligations before launch.</p><h2>Security and retention</h2><p>Reasonable technical measures are used to protect submissions in transit and to restrict access to configured services. Information should be retained only as long as required for the enquiry and applicable record-keeping obligations.</p><h2>Your questions</h2><p>For questions about an enquiry or personal information, use the <Link href="/contact">contact page</Link>. This policy must be reviewed against the hospital’s actual operational and legal requirements before publication.</p></div></div></section>
    </main>
  );
}
