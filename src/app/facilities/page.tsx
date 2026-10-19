import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hospital Facilities",
  description:
    "Find information about facilities and care at Sai Multispeciality Hospital in Pimple Gurav, Pune. Contact the team to confirm current services and accessibility details.",
  alternates: { canonical: absoluteUrl("/facilities") },
  openGraph: {
    title: "Hospital Facilities",
    description: "Find information about facilities and care at Sai Multispeciality Hospital in Pimple Gurav, Pune, and confirm current availability.",
    url: absoluteUrl("/facilities"),
  },
  twitter: {
    title: "Hospital Facilities",
    description: "Find information about facilities and care at Sai Multispeciality Hospital in Pimple Gurav, Pune.",
  },
};

const facilities = [
  ["01", "Plan your arrival", "Contact the team about the entrance, waiting arrangements and any support you need for your visit."],
  ["02", "Paediatric consultations", "Ask about an appointment with Dr. Neha Naik, MD Pediatrics, DNB Pediatrics, for your child's healthcare."],
  ["03", "Surgical consultations", "Ask about General Surgery, Endoscopic Surgery and Laparoscopic Surgery with Dr. Suresh Naik, MS General Surgeon."],
  ["04", "Accessible information", "We aim to make it easy to find key information and contact the team with questions."],
  ["05", "Family involvement", "Where appropriate, patients can include family or caregivers in conversations about care."],
  ["06", "Local connection", "Serving people and families in Pimple Gurav, New Sangvi, Pimple Saudagar and nearby Pune areas."],
];

export default function FacilitiesPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="page-hero"><div className="container"><div className="breadcrumbs"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>Facilities</span></div><span className="eyebrow">Designed around people</span><h1>A more considered <em>care experience.</em></h1><p>Learn what shapes the patient experience at Sai Multispeciality Hospital. Contact our team directly to confirm the availability of a specific facility, service or accessibility feature.</p></div></section>
      <section className="section-pad"><div className="container"><div className="facility-grid">{facilities.map(([number, title, text]) => <article className="facility-card" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div><p className="medical-note" style={{ marginTop: 24 }}>Please confirm current facility availability and accessibility arrangements with the hospital before travelling.</p></div></section>
      <section className="contact-banner"><div className="container contact-banner-inner"><div><span className="eyebrow">Need a specific detail?</span><h2>Our team can help<br />you plan your visit.</h2></div><Link className="button button-light" href="/contact#contact-form">Send an enquiry <span aria-hidden="true">↗</span></Link></div></section>
    </main>
  );
}
