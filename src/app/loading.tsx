export default function Loading() {
  return (
    <main className="container not-found" id="main-content" tabIndex={-1} aria-live="polite">
      <span className="eyebrow">Please wait</span>
      <h1>Loading your<br /><em>information.</em></h1>
    </main>
  );
}
