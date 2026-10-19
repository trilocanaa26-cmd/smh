import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { doctors } from "../src/lib/doctors.ts";
import {
  absoluteUrl,
  featuredServices,
  hospitalContact,
  hospitalName,
  mapSearchUrl,
  organizationJsonLd,
  phoneHref,
  services,
} from "../src/lib/site.ts";

test("verified hospital identity and contact details are exact", () => {
  assert.equal(hospitalName, "Sai Multispeciality Hospital");
  assert.equal(hospitalContact.address, "Govinda Market, Opposite Samarth Nagar, Shivaji Park, Pimple Gurav, New Sangvi, Pune – 411061");
  assert.equal(hospitalContact.phone, "+91 93739 10945");
  assert.equal(hospitalContact.landline, "020-29992511");
  assert.equal(phoneHref(hospitalContact.phone), "tel:+919373910945");
  assert.equal(phoneHref(hospitalContact.landline), "tel:+912029992511");
  assert.equal("hours" in hospitalContact, false);
  assert.equal("emergencyContact" in hospitalContact, false);
});

test("directions use the verified complete address", () => {
  const url = new URL(mapSearchUrl);
  assert.equal(url.hostname, "www.google.com");
  assert.equal(url.pathname, "/maps/dir/");
  assert.equal(url.searchParams.get("destination"), hospitalContact.address);
});

test("all four confirmed specialties are featured with unique URLs", () => {
  assert.deepEqual(featuredServices.map(({ slug }) => slug), [
    "pediatrics", "general-surgery", "endoscopic-surgery", "laparoscopic-surgery",
  ]);
  assert.equal(new Set(services.map(({ slug }) => slug)).size, services.length);
  for (const service of featuredServices) {
    assert.match(service.description, /Pimple Gurav|Pune/);
    assert.ok(service.shortDescription.length > 0);
  }
});

test("existing service URLs remain available", () => {
  for (const slug of ["general-medicine", "cardiology", "orthopedics", "pediatrics", "gynecology", "emergency-care", "diagnostics", "surgery"]) {
    assert.ok(services.some((service) => service.slug === slug), slug);
  }
});

test("doctor profiles include only supplied qualifications and specialties", () => {
  assert.equal(doctors.length, 2);
  assert.deepEqual(doctors.map(({ name, qualification, expertise }) => ({ name, qualification, expertise })), [
    { name: "Dr. Suresh Naik", qualification: "MS General Surgeon", expertise: ["General Surgery", "Endoscopic Surgery", "Laparoscopic Surgery"] },
    { name: "Dr. Neha Naik", qualification: "MD Pediatrics, DNB Pediatrics", expertise: ["Paediatrics / Pediatrics"] },
  ]);
  for (const doctor of doctors) {
    assert.equal("experience" in doctor, false);
    for (const slug of doctor.serviceSlugs) {
      assert.ok(services.some((service) => service.slug === slug));
    }
  }
  for (const service of featuredServices) {
    assert.equal(doctors.filter((doctor) => doctor.serviceSlugs.includes(service.slug)).length, 1);
  }
});

test("hospital schema uses verified identity, phones and medical specialties", () => {
  assert.equal(organizationJsonLd["@type"], "Hospital");
  assert.equal(organizationJsonLd.name, hospitalName);
  assert.equal(organizationJsonLd.address.streetAddress, hospitalContact.address);
  assert.equal(organizationJsonLd.address.postalCode, "411061");
  assert.equal(organizationJsonLd.telephone, hospitalContact.phone);
  assert.equal(organizationJsonLd.contactPoint[1].telephone, "+912029992511");
  assert.deepEqual(organizationJsonLd.medicalSpecialty, [
    "https://schema.org/Pediatric", "https://schema.org/Surgical",
  ]);
  assert.equal(organizationJsonLd["@id"], absoluteUrl("/#hospital"));
});

function luminance(hex) {
  const rgb = hex.match(/[a-f\d]{2}/gi).map((part) => {
    const value = parseInt(part, 16) / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
}

test("blue theme text and button pairs meet WCAG AA normal-text contrast", async () => {
  const css = await readFile(new URL("../src/app/globals.css", import.meta.url), "utf8");
  const tokens = Object.fromEntries([...css.matchAll(/--([\w-]+): (#[a-f\d]{6});/gi)].map((match) => [match[1], match[2]]));
  assert.equal(tokens.paper, "#ffffff");
  assert.equal(tokens.primary, "#175da8");
  for (const [foreground, background] of [
    ["ink", "paper"], ["body", "paper"], ["muted", "surface"],
    ["primary", "surface"], ["paper", "primary"], ["paper", "primary-dark"],
  ]) {
    const values = [luminance(tokens[foreground]), luminance(tokens[background])].sort((a, b) => b - a);
    const contrast = (values[0] + 0.05) / (values[1] + 0.05);
    assert.ok(contrast >= 4.5, `${foreground} on ${background}: ${contrast.toFixed(2)}:1`);
  }
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /\.form-status\.success \{ color: #236748;/);
});
