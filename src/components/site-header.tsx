"use client";

import Link from "next/link";
import { useState } from "react";
import { hospitalContact, navLinks, phoneHref } from "@/lib/site";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="utility-bar">
        <div className="container utility-inner">
          <p>Pimple Gurav · New Sangvi · Pune</p>
          <a href={phoneHref(hospitalContact.phone)}>Call Now: {hospitalContact.phone}</a>
        </div>
      </div>
      <div className="container nav-row">
        <Link
          className="brand"
          href="/"
          aria-label="Sai Multispeciality Hospital home"
          onClick={() => setMenuOpen(false)}
        >
          <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
          </span>
          <span className="brand-copy">
            <strong>SAI</strong>
            <small>MULTISPECIALITY HOSPITAL</small>
          </span>
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>
        <nav
          id="primary-navigation"
          className={`main-nav${menuOpen ? " is-open" : ""}`}
          aria-label="Main navigation"
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setMenuOpen(false);
              document.querySelector<HTMLButtonElement>(".menu-toggle")?.focus();
            }
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            className="button button-small nav-cta"
            href="/contact#contact-form"
            onClick={() => setMenuOpen(false)}
          >
            Book an appointment <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
