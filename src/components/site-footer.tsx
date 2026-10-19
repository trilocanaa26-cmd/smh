import Link from "next/link";
import { featuredServices, hospitalContact, mapSearchUrl, navLinks, phoneHref } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-about">
          <Link className="brand brand-footer" href="/" aria-label="Sai Multispeciality Hospital home">
            <span className="brand-mark" aria-hidden="true"><span /><span /></span>
            <span className="brand-copy"><strong>SAI</strong><small>MULTISPECIALITY HOSPITAL</small></span>
          </Link>
          <p>Sai Multispeciality Hospital: Paediatrics, General Surgery, Endoscopic Surgery and Laparoscopic Surgery in Pimple Gurav, New Sangvi, Pune.</p>
          <span className="footer-area">Pimple Gurav · Pune, Maharashtra</span>
        </div>
        <div>
          <h2>Explore</h2>
          <ul>{navLinks.slice(1).map((link) => <li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}</ul>
        </div>
        <div>
          <h2>Services</h2>
          <ul>{featuredServices.map((service) => <li key={service.slug}><Link href={`/services/${service.slug}`}>{service.title}</Link></li>)}</ul>
        </div>
        <div>
          <h2>Get in touch</h2>
          <p>For an enquiry or appointment request, use our contact form.</p>
          <p><a href={phoneHref(hospitalContact.phone)}>{hospitalContact.phone}</a><br /><a href={phoneHref(hospitalContact.landline)}>{hospitalContact.landline}</a></p>
          {hospitalContact.email && <p><a href={`mailto:${hospitalContact.email}`}>{hospitalContact.email}</a></p>}
          <Link className="footer-contact-link" href="/contact">Contact the hospital <span aria-hidden="true">↗</span></Link>
          <address className="footer-address">{hospitalContact.address}</address>
          <a className="footer-contact-link" href={mapSearchUrl} target="_blank" rel="noreferrer">Get Directions <span aria-hidden="true">↗</span></a>
          <p className="footer-address">Serving Pimple Gurav, New Sangvi, Pimple Saudagar and Pimpri-Chinchwad.</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Sai Multispeciality Hospital. All rights reserved.</span>
        <div><Link href="/privacy-policy">Privacy policy</Link><Link href="/terms">Terms &amp; conditions</Link></div>
        <span>Information on this website is not a substitute for medical advice.</span>
      </div>
    </footer>
  );
}
