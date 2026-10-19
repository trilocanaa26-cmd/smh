import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { absoluteUrl, hospitalContact, hospitalName, mapSearchUrl, phoneHref, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Appointments in Pimple Gurav, Pune",
  description:
    "Book a paediatric or surgical consultation at Sai Multispeciality Hospital, Govinda Market, Pimple Gurav, New Sangvi, Pune 411061. Call +91 93739 10945 or 020-29992511.",
  alternates: { canonical: absoluteUrl("/contact") },
  openGraph: {
    title: "Contact Sai Multispeciality Hospital",
    description: "Contact Sai Multispeciality Hospital to enquire about services or appointments in Pimple Gurav and nearby Pune communities.",
    url: absoluteUrl("/contact"),
  },
  twitter: {
    title: "Contact Sai Multispeciality Hospital",
    description: "Contact Sai Multispeciality Hospital to enquire about services or appointments in Pimple Gurav and nearby Pune communities.",
  },
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Sai Multispeciality Hospital",
  url: absoluteUrl("/contact"),
  mainEntity: { "@type": "Hospital", name: "Sai Multispeciality Hospital", url: siteUrl },
};

export default function ContactPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd).replace(/</g, "\\u003c") }} />
      <section className="page-hero"><div className="container"><div className="breadcrumbs"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>Contact</span></div><span className="eyebrow">{hospitalName}</span><h1>Book an appointment.<br /><em>Start a conversation.</em></h1><p>Request a consultation for Paediatrics, General Surgery, Endoscopic Surgery or Laparoscopic Surgery. The team will confirm availability; submitting an enquiry does not confirm a booking.</p></div></section>
      <section className="container contact-page-grid">
        <aside className="contact-info">
          <span className="eyebrow">Contact information</span>
          <h2>{hospitalName}</h2>
          <p>For your child’s health, ask about Dr. Neha Naik. For general, endoscopic or laparoscopic surgery, ask about Dr. Suresh Naik.</p>
          <div className="contact-info-card"><h3>Location</h3><address>{hospitalContact.address}</address></div>
          <div className="contact-info-card"><h3>Phone</h3><p><a href={phoneHref(hospitalContact.phone)}>{hospitalContact.phone}</a><br /><a href={phoneHref(hospitalContact.landline)}>{hospitalContact.landline}</a></p></div>
          <div className="contact-info-card"><h3>Email</h3><p><a href={`mailto:${hospitalContact.email}`}>{hospitalContact.email}</a></p></div>
          <div className="contact-info-card"><h3>Before your visit</h3><p>Please confirm consultation timings and any preparation directly with the team before travelling.</p></div>
          <div className="emergency-note"><strong>Medical emergency?</strong><p>Contact local emergency services or go to the nearest emergency department immediately. This form is not monitored for urgent care.</p></div>
          <a className="text-link directions-link" href={mapSearchUrl} target="_blank" rel="noreferrer">Get Directions <span aria-hidden="true">↗</span></a>
        </aside>
        <ContactForm />
      </section>
      <section className="container contact-map-section" aria-label="Location search">
        <div className="map-frame-heading"><span className="eyebrow">Find the location</span><p>Search results may not identify the correct entrance. Please confirm the exact hospital address before travelling.</p></div>
        <iframe
          className="contact-map-frame"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(hospitalContact.address)}&z=14&output=embed`}
          title="Sai Multispeciality Hospital, Govinda Market, Pimple Gurav, New Sangvi, Pune"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </section>
    </main>
  );
}
