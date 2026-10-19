import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms for using the Sai Multispeciality Hospital website and its healthcare information.",
  alternates: { canonical: absoluteUrl("/terms") },
  openGraph: {
    title: "Terms and Conditions",
    description: "Terms for using the Sai Multispeciality Hospital website and its healthcare information.",
    url: absoluteUrl("/terms"),
  },
  twitter: {
    title: "Terms and Conditions",
    description: "Terms for using the Sai Multispeciality Hospital website and its healthcare information.",
  },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="page-hero"><div className="container"><div className="breadcrumbs"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>Terms</span></div><span className="eyebrow">Using this website</span><h1>Terms &amp; <em>conditions.</em></h1><p>Please read these general terms before using the website.</p></div></section>
      <section className="prose-section"><div className="container prose-grid"><aside className="prose-aside">Website information</aside><div className="prose-content legal-content"><h2>General information only</h2><p>Content on this website is provided for general information. It is not medical advice and cannot replace a consultation, diagnosis or treatment plan from a qualified healthcare professional.</p><h2>Emergencies</h2><p>This website and its contact form are not emergency services. If you may be experiencing a medical emergency, contact local emergency services or attend the nearest emergency department immediately.</p><h2>Availability and accuracy</h2><p>Service, clinician, facility, address and timing information may change. Contact Sai Multispeciality Hospital directly to confirm current details before making plans or travelling.</p><h2>Third-party services</h2><p>Links to third-party websites, including map services, are provided for convenience. Sai Multispeciality Hospital does not control their content or availability.</p><h2>Contact</h2><p>Questions about these terms can be sent through the <Link href="/contact">contact page</Link>. These terms should be reviewed for the hospital’s applicable legal requirements before publication.</p></div></div></section>
    </main>
  );
}
