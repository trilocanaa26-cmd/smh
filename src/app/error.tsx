"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error("Application route error", error);
  }, [error]);

  return (
    <main className="container not-found" id="main-content" tabIndex={-1}>
      <span className="eyebrow">Something went wrong</span>
      <h1>Let’s try<br /><em>that again.</em></h1>
      <p>The page could not be loaded just now. Please try again, or return to the home page.</p>
      <button className="button" onClick={() => retry()} type="button">Try again <span aria-hidden="true">↻</span></button>
    </main>
  );
}
