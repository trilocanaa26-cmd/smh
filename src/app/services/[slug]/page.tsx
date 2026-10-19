import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { absoluteUrl, featuredServices, hospitalContact, hospitalName, phoneHref, serviceArea, services, siteUrl } from "@/lib/site";
import { doctors } from "@/lib/doctors";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return {};
  return {
    title: `${service.title} in Pimple Gurav, New Sangvi, Pune`,
    description: `${service.shortDescription} Contact Sai Multispeciality Hospital in Pimple Gurav, New Sangvi, Pune.`,
    alternates: { canonical: absoluteUrl(`/services/${service.slug}`) },
    openGraph: {
      title: `${service.title} in Pimple Gurav, Pune`,
      description: service.shortDescription,
      url: absoluteUrl(`/services/${service.slug}`),
    },
    twitter: {
      title: `${service.title} in Pimple Gurav, Pune`,
      description: service.shortDescription,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();
  const isFeatured = featuredServices.some((item) => item.slug === service.slug);
  const serviceDoctors = doctors.filter((doctor) => doctor.serviceSlugs.includes(service.slug));
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: { "@type": "Hospital", "@id": `${siteUrl}/#hospital`, name: hospitalName, url: siteUrl },
    areaServed: serviceArea,
    url: absoluteUrl(`/services/${service.slug}`),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/services") },
      { "@type": "ListItem", position: 3, name: service.title, item: absoluteUrl(`/services/${service.slug}`) },
    ],
  };

  return (
    <main id="main-content" tabIndex={-1}>
      {isFeatured && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd).replace(/</g, "\\u003c") }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }} />
      <section className="page-hero"><div className="container"><div className="breadcrumbs"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/services">Services</Link><span aria-hidden="true">/</span><span>{service.title}</span></div><span className="eyebrow">{isFeatured ? "Our medical specialties" : "General healthcare information"}</span><h1>{service.title} in <em>Pimple Gurav, Pune.</em></h1><p>{service.shortDescription}</p></div></section>
      <section className="container service-context">
        {!isFeatured && <p className="medical-note">This is a general information page, not confirmation of an available hospital department or facility. Contact the team to confirm availability. For confirmed specialties, explore <Link href="/services">our paediatric and surgical care</Link>.</p>}
        {serviceDoctors.length > 0 && <div className="service-clinicians"><h2>Your consultation team</h2>{serviceDoctors.map((doctor) => <p key={doctor.slug}><Link className="text-link" href={`/doctors/${doctor.slug}`}>{doctor.name}</Link><br />{doctor.qualification}<br />{doctor.specialization}</p>)}<p>Call <a href={phoneHref(hospitalContact.phone)}>{hospitalContact.phone}</a> or <a href={phoneHref(hospitalContact.landline)}>{hospitalContact.landline}</a> to request an appointment in Pimple Gurav, New Sangvi.</p></div>}
      </section>
      <section className="prose-section"><div className="container prose-grid"><aside className="prose-aside">About this service</aside><div className="prose-content service-detail"><h2>Thoughtful guidance for your care</h2><p>{service.description}</p><p>People in Pimple Gurav, New Sangvi, Pimple Saudagar and across Pimpri-Chinchwad can contact the hospital to ask about current availability, appointment arrangements and any preparation they may need.</p><p className="medical-note">{service.slug === "emergency-care" ? "If you may be experiencing a medical emergency, contact local emergency services or go to the nearest emergency department immediately. Do not wait for a response through this website." : "This page provides general information only, not diagnosis or treatment advice. Please speak with a qualified healthcare professional about your individual circumstances."}</p><h2>Make an enquiry</h2><p>Send the team a message to ask about this service. For urgent or emergency symptoms, do not use the contact form.</p>      <Link className="button" href="/contact#contact-form">Enquire about {service.title} <span aria-hidden="true">↗</span></Link></div></div></section>
    </main>
  );
}
