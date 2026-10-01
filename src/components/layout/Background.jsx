// Decorative page background: cursor spotlight, top grid and scroll progress bar.
export default function Background({ progress }) {
  return (
    <>
      <div className="spot pointer-events-none fixed inset-0 z-0" aria-hidden="true" />
      <div className="grid-bg pointer-events-none absolute inset-x-0 top-0 h-screen z-0" aria-hidden="true" />
      <div className="fixed top-0 left-0 h-0.5 bg-linear-to-r from-lime-300 to-emerald-400 z-50" style={{ width: `${progress}%` }} aria-hidden="true" />
    </>
  );
}
