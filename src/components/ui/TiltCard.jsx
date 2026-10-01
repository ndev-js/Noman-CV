import { useRef } from "react";
import { prefersReduced } from "../../utils/dom";

// Card with a cursor-following glow and slight 3D tilt. Renders a button when `onClick` is given.
export default function TiltCard({ children, className = "", onClick, label }) {
  const ref = useRef(null);
  const move = (e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect(); const x = e.clientX - r.left; const y = e.clientY - r.top;
    el.style.setProperty("--cx", `${x}px`); el.style.setProperty("--cy", `${y}px`);
    if (!prefersReduced()) el.style.transform = `perspective(1000px) rotateX(${(y / r.height - 0.5) * -5}deg) rotateY(${(x / r.width - 0.5) * 5}deg)`;
  };
  const leave = () => { if (ref.current) ref.current.style.transform = ""; };
  const cls = `group relative overflow-hidden text-left rounded-3xl border border-zinc-800 bg-zinc-900/40 transition-transform duration-200 ease-out hover:border-zinc-600 focus:outline-hidden focus:ring-2 focus:ring-lime-300 ${className}`;
  const inner = (<><div className="card-glow pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" /><div className="relative h-full">{children}</div></>);
  return onClick
    ? <button ref={ref} onMouseMove={move} onMouseLeave={leave} onClick={onClick} aria-label={label} className={cls}>{inner}</button>
    : <div ref={ref} onMouseMove={move} onMouseLeave={leave} className={cls}>{inner}</div>;
}
