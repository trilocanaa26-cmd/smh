import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { organizationJsonLd, siteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sai Multispeciality Hospital Pune | Paediatrics & Surgery",
    template: "%s | Sai Multispeciality Hospital",
  },
  description:
    "Paediatrics, General, Endoscopic and Laparoscopic Surgery in Pimple Gurav, New Sangvi, Pune. Meet Dr. Neha Naik and Dr. Suresh Naik. Call +91 93739 10945.",
  applicationName: "Sai Multispeciality Hospital",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Sai Multispeciality Hospital",
    title: "Sai Multispeciality Hospital Pune | Paediatrics & Surgery",
    description:
      "Child healthcare and surgical consultations in Pimple Gurav, New Sangvi. Meet Dr. Neha Naik and Dr. Suresh Naik.",
    url: "/",
  },
  twitter: {
    card: "summary",
    title: "Sai Multispeciality Hospital Pune | Paediatrics & Surgery",
    description:
      "Paediatrics, General Surgery, Endoscopic Surgery and Laparoscopic Surgery in Pimple Gurav, New Sangvi, Pune.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
