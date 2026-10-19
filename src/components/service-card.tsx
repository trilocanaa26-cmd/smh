import Link from "next/link";

export function ServiceCard({
  service,
}: {
  service: {
    slug: string;
    title: string;
    shortDescription: string;
    icon: string;
    color: string;
  };
}) {
  return (
    <article className="service-card">
      <span className={`service-icon ${service.color}`} aria-hidden="true">{service.icon}</span>
      <h3>{service.title}</h3>
      <p>{service.shortDescription}</p>
      <Link href={`/services/${service.slug}`} aria-label={`Learn about ${service.title}`}>
        Explore service <span aria-hidden="true">↗</span>
      </Link>
    </article>
  );
}
