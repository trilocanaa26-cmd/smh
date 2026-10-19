import type { MetadataRoute } from "next";
import { absoluteUrl, services } from "@/lib/site";
import { doctors } from "@/lib/doctors";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "/",
    "/about",
    "/services",
    "/doctors",
    "/facilities",
    "/contact",
  ];
  const servicePages = services.map((service) => `/services/${service.slug}`);
  const doctorPages = doctors.map((doctor) => `/doctors/${doctor.slug}`);
  return [...staticPages, ...servicePages, ...doctorPages].map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/services" ? 0.8 : 0.7,
  }));
}
