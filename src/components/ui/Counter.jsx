import { useEffect, useState } from "react";
import { useInView } from "../../hooks/useInView";

// Counts up from 0 to `to` once visible.
export default function Counter({ to, suffix = "", label }) {
  const [ref, seen] = useInView(0.5);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    let raf; const start = performance.now();
    const step = (now) => { const p = Math.min((now - start) / 1300, 1); setN(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [seen, to]);
  return (
    <div ref={ref} className="px-6 py-5">
      <div className="text-4xl md:text-5xl font-black text-white">{n}<span className="text-lime-300">{suffix}</span></div>
      <div className="text-sm text-zinc-500 mt-1">{label}</div>
    </div>
  );
}
