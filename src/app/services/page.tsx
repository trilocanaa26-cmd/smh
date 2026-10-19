import type { Metadata } from "next";
import Link from "next/link";
import { ServiceCard } from "@/components/service-card";
import { absoluteUrl, featuredServices, services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Paediatrics & Surgical Specialties in Pimple Gurav, New Sangvi",
  description:
    "Explore Paediatrics, General Surgery, Endoscopic Surgery and Laparoscopic Surgery at Sai Multispeciality Hospital in Pimple Gurav, New Sangvi, Pune.",
  alternates: { canonical: absoluteUrl("/services") },
  openGraph: {
    title: "Healthcare Services in Pimple Gurav, Pune",
    description: "Explore healthcare services at Sai Multispeciality Hospital, serving Pimple Gurav, New Sangvi, Pimple Saudagar and Pimpri-Chinchwad.",
    url: absoluteUrl("/services"),
  },
  twitter: {
    title: "Healthcare Services in Pimple Gurav, Pune",
    description: "Explore healthcare services at Sai Multispeciality Hospital for Pimple Gurav and nearby Pune communities.",
  },
};

export default function ServicesPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="page-hero"><div className="container"><div className="breadcrumbs"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>Services</span></div><span className="eyebrow">Care, thoughtfully connected</span><h1>Child healthcare.<br /><em>Focused surgical care.</em></h1><p>Explore Paediatrics, General Surgery, Endoscopic Surgery and Laparoscopic Surgery at Sai Multispeciality Hospital in Pimple Gurav, New Sangvi, Pune.</p></div></section>
      <section className="section-pad"><div className="container"><h2 className="directory-heading">Our medical specialties</h2><div className="service-grid specialty-grid">{featuredServices.map((service) => <ServiceCard key={service.slug} service={service} />)}</div><p className="medical-note" style={{ marginTop: 28 }}>Service information is general and does not replace advice from a qualified healthcare professional. Please confirm consultation availability and discuss the suitability of any procedure with your clinician.</p><div className="additional-services"><h2>Other healthcare information</h2><p>These existing information pages are not confirmation that a department or facility is available at the hospital. Please contact the team before making plans for these services.</p><ul>{services.slice(4).map((service) => <li key={service.slug}><Link className="text-link" href={`/services/${service.slug}`}>{service.title}</Link></li>)}</ul></div></div></section>
    </main>
  );
}
