import Link from "next/link";
import type { Doctor } from "@/lib/doctors";

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <article className="doctor-card">
      <span className="doctor-mark" aria-hidden="true">+</span>
      <h3>{doctor.name}</h3>
      <p className="doctor-qualification">{doctor.qualification}</p>
      <p>{doctor.specialization}</p>
      <div className="doctor-actions">
        <Link className="text-link" href={`/doctors/${doctor.slug}`}>View profile <span aria-hidden="true">↗</span></Link>
        <Link className="button button-small" href="/contact#contact-form">Book an appointment</Link>
      </div>
    </article>
  );
}
