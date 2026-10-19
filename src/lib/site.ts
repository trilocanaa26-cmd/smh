export const siteUrl = "https://sangavi-hospital.com";

export const hospitalName = "Sai Multispeciality Hospital";
export const serviceArea = [
  "Pimple Gurav",
  "New Sangvi",
  "Pimple Saudagar",
  "Pimpri-Chinchwad",
  "Pune",
];

export const hospitalContact = {
  address: "Govinda Market, Opposite Samarth Nagar, Shivaji Park, Pimple Gurav, New Sangvi, Pune – 411061",
  phone: "+91 93739 10945",
  landline: "020-29992511",
  email: "info@sangavi-hospital.com",
};

export function phoneHref(phone: string) {
  const digits = phone.replace(/[^\d+]/g, "");
  return `tel:${digits.startsWith("0") ? `+91${digits.slice(1)}` : digits}`;
}

export const mapSearchUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(hospitalContact.address)}`;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Doctors", href: "/doctors" },
  { label: "Facilities", href: "/facilities" },
  { label: "Contact", href: "/contact" },
];

export const services = [
  {
    slug: "pediatrics",
    title: "Paediatrics / Pediatrics",
    shortDescription:
      "Child healthcare and paediatric consultations with Dr. Neha Naik in Pimple Gurav.",
    description:
      "Dr. Neha Naik (MD Pediatrics, DNB Pediatrics) provides paediatric consultations at Sai Multispeciality Hospital. Families looking for a paediatrician in Pimple Gurav or a pediatrician in New Sangvi can discuss their child's health concerns and next steps in care. Contact the team to arrange a consultation.",
    icon: "✳",
    color: "blue",
  },
  {
    slug: "general-surgery",
    title: "General Surgery",
    shortDescription:
      "Surgical consultation, evaluation and treatment planning with Dr. Suresh Naik.",
    description:
      "Dr. Suresh Naik (MS General Surgeon) offers general surgical consultation, evaluation and treatment at Sai Multispeciality Hospital. If you are looking for a general surgeon in New Sangvi or Pimple Gurav, a consultation can help you understand your diagnosis, treatment options, potential risks and next steps.",
    icon: "✚",
    color: "blue",
  },
  {
    slug: "endoscopic-surgery",
    title: "Endoscopic Surgery",
    shortDescription:
      "Explore endoscopic surgical options with Dr. Suresh Naik in Pune.",
    description:
      "Endoscopic surgery uses a camera-equipped instrument to help a surgeon view and, where appropriate, treat an area inside the body. Dr. Suresh Naik's specialties include endoscopic surgery. People seeking an endoscopic surgeon in Pune can contact Sai Multispeciality Hospital to discuss their concern and whether an endoscopic approach is suitable. Specific procedures and preparation must be confirmed with the treating surgeon.",
    icon: "⌕",
    color: "blue",
  },
  {
    slug: "laparoscopic-surgery",
    title: "Laparoscopic Surgery",
    shortDescription:
      "Individual assessment for minimally invasive surgery where clinically appropriate.",
    description:
      "Laparoscopic surgery uses small incisions and a camera to guide surgery within the abdomen. Dr. Suresh Naik's specialties include laparoscopic surgery. For suitable patients, a minimally invasive approach may offer smaller incisions and a shorter recovery than open surgery, but benefits and risks vary by procedure and individual circumstances. If you are looking for a laparoscopic surgeon in Pune, contact the hospital for an assessment. Not every condition is suitable for this approach.",
    icon: "⌁",
    color: "blue",
  },
  {
    slug: "general-medicine",
    title: "General Medicine",
    shortDescription:
      "Everyday medical guidance, assessment and ongoing care for adults.",
    description:
      "General medicine supports the prevention, assessment and treatment of a wide range of adult health concerns. A consultation is a chance to discuss symptoms, medical history and next steps with a qualified clinician.",
    icon: "＋",
    color: "mint",
  },
  {
    slug: "cardiology",
    title: "Cardiology",
    shortDescription:
      "Heart-health consultations and coordinated cardiovascular care.",
    description:
      "Cardiology focuses on the heart and circulatory system. Speak with the hospital team about your concerns, the appropriate assessment and how to arrange a consultation.",
    icon: "♡",
    color: "coral",
  },
  {
    slug: "orthopedics",
    title: "Orthopedics",
    shortDescription:
      "Evaluation and care for bone, joint and movement-related concerns.",
    description:
      "Orthopedic care addresses concerns affecting bones, joints and movement. The care team can help you understand available consultation options and the right next step for your needs.",
    icon: "⌁",
    color: "blue",
  },
  {
    slug: "gynecology",
    title: "Gynecology",
    shortDescription:
      "Women's health consultations and compassionate guidance.",
    description:
      "Gynecology supports women's health through informed consultation and care planning. Contact the hospital team to discuss your concern and arrange an appropriate appointment.",
    icon: "❋",
    color: "lilac",
  },
  {
    slug: "emergency-care",
    title: "Emergency Care",
    shortDescription:
      "For urgent symptoms, seek emergency medical help immediately.",
    description:
      "If you or someone nearby may be experiencing a medical emergency, contact your local emergency services or go to the nearest emergency department now. Do not wait for an online response.",
    icon: "＋",
    color: "coral",
  },
  {
    slug: "diagnostics",
    title: "Diagnostics",
    shortDescription:
      "Information about diagnostic services and assessment options.",
    description:
      "Diagnostic testing can help clinicians understand a health concern and guide care. Please contact the hospital team to confirm which tests are available and whether a referral or preparation is needed.",
    icon: "⌕",
    color: "blue",
  },
  {
    slug: "surgery",
    title: "Surgery",
    shortDescription:
      "Consultation and care planning for surgical treatment options.",
    description:
      "Surgical care begins with a consultation to understand a diagnosis, treatment options, potential benefits and risks. The treating clinician will guide decisions based on each patient's individual circumstances.",
    icon: "✚",
    color: "mint",
  },
] as const;

export const featuredServices = services.slice(0, 4);

export const faqs = [
  {
    question: "How can I enquire about an appointment?",
    answer:
      "Use the contact form on this website and tell us which service you need. The hospital team can follow up using the contact details you provide.",
  },
  {
    question: "Which specialties are available at Sai Multispeciality Hospital?",
    answer:
      "Our specialties are Paediatrics, General Surgery, Endoscopic Surgery and Laparoscopic Surgery. Dr. Neha Naik provides paediatric care, and Dr. Suresh Naik provides surgical care in Pimple Gurav, New Sangvi, Pune.",
  },
  {
    question: "Can I use the contact form for a medical emergency?",
    answer:
      "No. The contact form is not monitored for emergencies. If you may be experiencing a medical emergency, contact local emergency services or go to the nearest emergency department immediately.",
  },
  {
    question: "How do I confirm a department's availability?",
    answer:
      "Send an enquiry through the contact form. Please confirm current services, clinician availability, timings and any preparation directly with the hospital before travelling.",
  },
];

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Hospital",
  name: hospitalName,
  description:
    "Paediatrics, General Surgery, Endoscopic Surgery and Laparoscopic Surgery in Pimple Gurav, New Sangvi, Pune.",
  "@id": `${siteUrl}/#hospital`,
  url: siteUrl,
  areaServed: serviceArea.map((name) => ({
    "@type": "City",
    name,
  })),
  address: {
    "@type": "PostalAddress",
    streetAddress: hospitalContact.address,
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
    postalCode: "411061",
  },
  telephone: hospitalContact.phone,
  contactPoint: [
    { "@type": "ContactPoint", telephone: hospitalContact.phone, contactType: "appointments" },
    { "@type": "ContactPoint", telephone: "+912029992511", contactType: "hospital enquiries" },
  ],
  medicalSpecialty: ["https://schema.org/Pediatric", "https://schema.org/Surgical"],
  hasMap: mapSearchUrl,
};

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}
