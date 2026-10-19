import type { Metadata } from "next";
import Link from "next/link";
import {
  absoluteUrl,
  additionalHospitalFacilities,
  facilityDepartments,
  hospitalContact,
  hospitalName,
  phoneHref,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Facilities & Specialties in New Sangvi, Pune",
  description:
    "Explore surgery, laser proctology, paediatrics, medicine, maternity, orthopaedics, diagnostics and hospital facilities at Sai Multispeciality Hospital, New Sangvi, Pune.",
  alternates: { canonical: absoluteUrl("/facilities") },
  openGraph: {
    title: "Facilities & Specialties | Sai Multispeciality Hospital",
    description: "Explore the hospital's specialties, diagnostic services and facilities in New Sangvi, Pune.",
    url: absoluteUrl("/facilities"),
  },
  twitter: {
    title: "Facilities & Specialties | Sai Multispeciality Hospital",
    description: "Explore the hospital's specialties and facilities in New Sangvi, Pune.",
  },
};

export default function FacilitiesPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumbs"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>Facilities</span></div>
          <span className="eyebrow">Cure with Care</span>
          <h1>Comprehensive healthcare <em>under one roof.</em></h1>
          <p>Explore the departments, specialties and hospital facilities at {hospitalName}, New Sangvi, Pune. Your health, our priority.</p>
        </div>
      </section>
      <section className="section-pad" aria-labelledby="facility-directory-heading">
        <div className="container">
          <h2 className="directory-heading" id="facility-directory-heading">Our facilities &amp; specialities</h2>
          <div className="facility-grid">
            {facilityDepartments.map((department, index) => (
              <article className="facility-card" key={department.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{department.title}</h3>
                <ul className="facility-services">
                  {department.services.map((service) => <li key={service}>{service}</li>)}
                </ul>
              </article>
            ))}
          </div>
          <p className="medical-note" style={{ marginTop: 24 }}>Please contact the hospital to confirm current service availability, clinician schedules and any preparation needed before your visit. Information on this website is not a substitute for medical advice.</p>
        </div>
      </section>
      <section className="section-pad additional-facilities" aria-labelledby="additional-facilities-heading">
        <div className="container">
          <span className="eyebrow">Support for your care</span>
          <h2 className="directory-heading" id="additional-facilities-heading">Additional hospital facilities</h2>
          <ul className="additional-facility-list">
            {additionalHospitalFacilities.map((facility) => <li key={facility}>{facility}</li>)}
          </ul>
        </div>
      </section>
      <section className="contact-banner">
        <div className="container contact-banner-inner">
          <div>
            <span className="eyebrow">Sai Multispeciality Hospital</span>
            <h2>Cure with Care –<br />Your Health, Our Priority</h2>
            <address className="facility-contact-address">{hospitalContact.address}</address>
            <p className="facility-contact-phones">
              <a href={phoneHref(hospitalContact.landline)}>{hospitalContact.landline}</a>
              {" | "}
              <a href={phoneHref(hospitalContact.phone)}>{hospitalContact.phone}</a>
            </p>
          </div>
          <Link className="button button-light" href="/contact#contact-form">Contact the hospital <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </main>
  );
}
