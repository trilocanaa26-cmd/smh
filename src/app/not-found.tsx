import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container not-found" id="main-content" tabIndex={-1}>
      <span className="eyebrow">404 · Page not found</span>
      <h1>This page took<br /><em>a wrong turn.</em></h1>
      <p>The page may have moved or the link may be out of date. Let’s get you back to the information you need.</p>
      <Link className="button" href="/">Back to home <span aria-hidden="true">↗</span></Link>
    </main>
  );
}
