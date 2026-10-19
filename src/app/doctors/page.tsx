import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/site";
import { doctors } from "@/lib/doctors";
import { DoctorCard } from "@/components/doctor-card";

export const metadata: Metadata = {
  title: "Doctors and Specialists",
  description:
    "Meet Dr. Suresh Naik, MS General Surgeon, and Dr. Neha Naik, MD Pediatrics, DNB Pediatrics, at Sai Multispeciality Hospital in Pimple Gurav, New Sangvi, Pune.",
  alternates: { canonical: absoluteUrl("/doctors") },
  openGraph: {
    title: "Doctors and Specialists",
    description: "Find doctor and specialist information at Sai Multispeciality Hospital in Pune. Ask about appointments and current clinician availability.",
    url: absoluteUrl("/doctors"),
  },
  twitter: {
    title: "Doctors and Specialists",
    description: "Find doctor and specialist information at Sai Multispeciality Hospital in Pune.",
  },
};

export default function DoctorsPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="page-hero"><div className="container"><div className="breadcrumbs"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>Doctors</span></div><span className="eyebrow">Meet your care team</span><h1>People who put <em>care first.</em></h1><p>Learn about the clinicians connected with Sai Multispeciality Hospital and ask the team about current availability.</p></div></section>
      <section className="prose-section"><div className="container">
        <h2 className="directory-heading">Paediatric and surgical specialists</h2>
        <div className="doctor-grid">{doctors.map((doctor) => <DoctorCard key={doctor.slug} doctor={doctor} />)}</div>
      </div></section>
    </main>
  );
}
