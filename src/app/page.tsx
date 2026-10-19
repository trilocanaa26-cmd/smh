import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { DoctorCard } from "@/components/doctor-card";
import { doctors } from "@/lib/doctors";
import { faqs, featuredServices, hospitalContact, hospitalName, mapSearchUrl, phoneHref, serviceArea } from "@/lib/site";

export default function Home() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
  return (
    <main id="main-content" tabIndex={-1}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
      <section className="hero">
        <div className="hero-orb orb-one" aria-hidden="true" />
        <div className="hero-orb orb-two" aria-hidden="true" />
        <div className="container hero-layout">
          <div className="hero-copy">
            <p className="hero-kicker"><span /> {hospitalName} · Pune</p>
            <h1>Care for your child.<br /><em>Surgical care for you.</em></h1>
            <p className="hero-lede">
              Paediatrics, General Surgery, Endoscopic Surgery and Laparoscopic Surgery in Pimple Gurav, New Sangvi. A patient-focused approach, with clear guidance at every step.
            </p>
            <div className="hero-actions">
              <Link className="button" href="/contact#contact-form">Book an appointment <span aria-hidden="true">↗</span></Link>
              <a className="button button-outline" href={phoneHref(hospitalContact.phone)}>Call Now <span aria-hidden="true">↗</span></a>
              <Link className="text-link" href="/contact">Contact Us <span aria-hidden="true">↗</span></Link>
            </div>
            <div className="hero-note"><span className="note-icon" aria-hidden="true">✳</span><span>Care starts with a conversation.<br /><strong>We’re here to help you take the next step.</strong></span></div>
          </div>
          <div className="hero-art" role="img" aria-label="Illustration of a welcoming healthcare centre">
            <div className="hero-sun" />
            <div className="hero-building">
              <div className="building-roof" />
              <div className="building-face">
                <div className="building-cross"><span /><span /></div>
                <div className="building-label">SAI MULTISPECIALITY<br />HOSPITAL</div>
                <div className="building-windows"><i /><i /><i /></div>
                <div className="building-door" />
              </div>
              <div className="building-shadow" />
            </div>
            <div className="art-leaf leaf-left">⌁</div>
            <div className="art-leaf leaf-right">⌁</div>
            <div className="art-caption"><span className="caption-dot" /> Your neighbourhood care team</div>
          </div>
        </div>
        <div className="hero-bottom">
          <div className="container hero-bottom-inner">
            <a href={phoneHref(hospitalContact.phone)}>{hospitalContact.phone}</a><span className="bottom-line" /><a href={phoneHref(hospitalContact.landline)}>{hospitalContact.landline}</a><span>Pimple Gurav · Pune</span>
          </div>
        </div>
      </section>

      <section className="intro-section section-pad">
        <div className="container intro-grid">
          <div className="intro-label"><span className="eyebrow">A little closer to home</span><span className="vertical-note">PIMPLE GURAV · PUNE</span></div>
          <div className="intro-content">
            <h2>Care is more than treatment.<br /><em>It’s how you feel along the way.</em></h2>
            <div className="intro-lower"><p>At Sai Multispeciality Hospital, Dr. Neha Naik provides child healthcare and Dr. Suresh Naik provides general, endoscopic and laparoscopic surgical care. Located at Govinda Market in Pimple Gurav, New Sangvi, we help families across Pune understand their options and arrange a consultation by phone or online enquiry.</p><Link className="text-link" href="/about">Get to know us <span aria-hidden="true">↗</span></Link></div>
          </div>
        </div>
      </section>

      <section className="services-section section-pad" id="services">
        <div className="container">
          <div className="section-topline"><SectionHeading eyebrow="Our medical specialties" title="Focused care. Personal attention." description="Child healthcare and surgical consultations, with treatment decisions guided by your individual needs." /><Link className="text-link desktop-link" href="/services">View our specialties <span aria-hidden="true">↗</span></Link></div>
          <div className="service-grid specialty-grid">{featuredServices.map((service) => <ServiceCard key={service.slug} service={service} />)}</div>
          <Link className="text-link mobile-link" href="/services">View all services <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section className="care-section section-pad">
        <div className="container care-layout">
          <div className="care-art" aria-hidden="true">
            <div className="care-circle"><span className="care-cross"><i /><i /></span><span className="care-art-word">CARE<br />WITH<br />HEART</span></div>
            <span className="care-spark spark-a">✳</span><span className="care-spark spark-b">✳</span>
            <div className="care-art-caption">A place to begin again</div>
          </div>
          <div className="care-copy">
            <span className="eyebrow">Why Sai Multispeciality Hospital</span>
            <h2>Human care.<br /><em>Clear next steps.</em></h2>
            <p>Finding healthcare should feel straightforward. We’re building a welcoming place where people can understand their options, ask questions and connect with the care they need.</p>
            <ul className="check-list"><li><span aria-hidden="true">✓</span> A patient-first approach to every conversation</li><li><span aria-hidden="true">✓</span> A range of healthcare services in one place</li><li><span aria-hidden="true">✓</span> Conveniently serving nearby Pune communities</li></ul>
            <Link className="button button-dark" href="/about">Discover our approach <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>

      <section className="community-section section-pad" aria-labelledby="home-doctors">
        <div className="container">
          <div className="section-heading"><span className="eyebrow">Meet your doctors</span><h2 id="home-doctors">People behind your care.</h2><p>Get to know our paediatric and surgical clinicians. Contact us to confirm consultation availability.</p></div>
          <div className="doctor-grid">{doctors.map((doctor) => <DoctorCard key={doctor.slug} doctor={doctor} />)}</div>
        </div>
      </section>

      <section className="community-section section-pad">
        <div className="container">
          <SectionHeading eyebrow="Your care, your way" title="Useful details for your next step." description="Get to know the care team and learn about the hospital experience before you get in touch." />
          <div className="community-grid">
            <article><span className="eyebrow">Our clinicians</span><h3>Meet the people behind your care.</h3><p>Find verified clinician information and ask the team about current appointment availability.</p><Link className="text-link" href="/doctors">Explore the doctor directory <span aria-hidden="true">↗</span></Link></article>
            <article><span className="eyebrow">Your visit</span><h3>Know what to ask before you arrive.</h3><p>Explore facility information and confirm the details that matter for your visit.</p><Link className="text-link" href="/facilities">Explore hospital facilities <span aria-hidden="true">↗</span></Link></article>
          </div>
        </div>
      </section>

      <section className="location-section section-pad">
        <div className="container location-layout">
          <div className="location-copy"><span className="eyebrow">Close to your community</span><h2>Care that’s<br /><em>within reach.</em></h2><p>Visit Sai Multispeciality Hospital in Pimple Gurav, New Sangvi, Pune.</p><address>{hospitalContact.address}</address><p><a href={phoneHref(hospitalContact.phone)}>{hospitalContact.phone}</a><br /><a href={phoneHref(hospitalContact.landline)}>{hospitalContact.landline}</a></p><div className="area-chips">{serviceArea.slice(0, 4).map((area) => <span key={area}>{area}</span>)}</div><Link className="text-link" href="/contact">Contact Us <span aria-hidden="true">↗</span></Link></div>
          <div className="map-card">
            <div className="map-grid" aria-hidden="true"><span className="map-road road-one" /><span className="map-road road-two" /><span className="map-road road-three" /><span className="map-road road-four" /><span className="map-park park-one" /><span className="map-park park-two" /></div>
            <div className="map-pin"><span>✚</span></div>
            <div className="map-label"><strong>Sai Multispeciality Hospital</strong><span>{hospitalContact.address || "Pimple Gurav · Pune, Maharashtra"}</span></div>
            <a className="map-open" href={mapSearchUrl} target="_blank" rel="noreferrer">Get Directions <span aria-hidden="true">↗</span></a>
            <p className="map-disclaimer">Illustrative map. Open Google Maps for directions.</p>
          </div>
        </div>
      </section>

      <section className="faq-section section-pad">
        <div className="container faq-layout">
          <div><span className="eyebrow">A few helpful answers</span><h2>Good questions.<br /><em>Clear answers.</em></h2><p>Can’t find what you need? Send the team an enquiry.</p><Link className="text-link" href="/contact">Ask us a question <span aria-hidden="true">↗</span></Link></div>
          <div className="faq-list">{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div>
        </div>
      </section>

      <section className="emergency-strip" aria-label="Emergency information">
        <div className="container"><strong>Medical emergency?</strong><p>This website is not an emergency service. Contact local emergency services or go to the nearest emergency department immediately.</p></div>
      </section>

      <section className="contact-banner" id="contact-cta">
        <div className="container contact-banner-inner"><div><span className="eyebrow">We’re listening</span><h2>Your health questions<br />deserve a conversation.</h2></div><Link className="button button-light" href="/contact#contact-form">Talk to our team <span aria-hidden="true">↗</span></Link><span className="banner-spark" aria-hidden="true">✳</span></div>
      </section>
    </main>
  );
}
