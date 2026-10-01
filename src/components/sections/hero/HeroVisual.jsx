import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Box, Building2, CreditCard, Gamepad2, Gavel, House, Radio, Stethoscope, Trophy } from "lucide-react";
import { PROJECTS } from "../../../data/content";
import { prefersReduced } from "../../../utils/dom";
import ProfilePhoto from "./ProfilePhoto";

// Icons that circle the photo, one per industry I've shipped for.
const ORBIT = [
  { icon: Gamepad2, label: "Gaming" },
  { icon: CreditCard, label: "Fintech" },
  { icon: House, label: "Real Estate" },
  { icon: Box, label: "Web3" },
  { icon: Trophy, label: "Sports" },
  { icon: Radio, label: "Telecom" },
  { icon: Stethoscope, label: "Healthcare" },
  { icon: Building2, label: "Enterprise" },
];

const COUNTS = PROJECTS.reduce((c, p) => { p.industry.forEach((i) => (c[i] = (c[i] || 0) + 1)); return c; }, {});

// Parallax offset for a layer: moves up to depth px with the cursor (negative = opposite way).
const depth = (px) => ({ translate: `calc(var(--px, 0) * ${px}px) calc(var(--py, 0) * ${px}px)`, transition: "translate .5s cubic-bezier(.2,.8,.2,1)" });

const FEATURED = PROJECTS.filter((p) => p.featured);
const ESTATE = PROJECTS.find((p) => p.id === "estate");

// Industry icons circling the photo. Hover pauses the ring and shows a tooltip; click filters the Work section.
function OrbitRing({ onIndustry }) {
  return (
    <div className="orbit-wrap pointer-events-none absolute inset-0 z-[5]" style={depth(-10)}>
      <div className="absolute inset-0 rounded-full border border-dashed border-zinc-800" aria-hidden="true" />
      <div className="orbit absolute inset-0">
        {ORBIT.map(({ icon: Icon, label }, i) => {
          const a = (360 / ORBIT.length) * i;
          const n = COUNTS[label] || 0;
          return (
            <div key={label} className="absolute w-9 h-9 md:w-10 md:h-10 left-1/2 top-1/2 -ml-[18px] -mt-[18px] md:-ml-5 md:-mt-5"
              style={{ transform: `rotate(${a}deg) translateX(var(--r)) rotate(${-a}deg)` }}>
              <div className="orbit-counter w-full h-full">
                <button type="button" onClick={() => onIndustry(label)} aria-label={`See ${n} ${label} project${n === 1 ? "" : "s"}`}
                  className="peer pointer-events-auto w-full h-full rounded-full bg-zinc-950 border border-zinc-800 shadow-lg flex items-center justify-center text-zinc-400 hover:text-black hover:bg-lime-300 hover:border-lime-300 hover:scale-125 hover:shadow-lime-300/30 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-lime-300 transition duration-300">
                  <Icon size={16} />
                </button>
                <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap rounded-lg px-2.5 py-1 bg-zinc-800 border border-zinc-700 text-xs text-white shadow-xl opacity-0 translate-y-1 peer-hover:opacity-100 peer-hover:translate-y-0 peer-focus-visible:opacity-100 peer-focus-visible:translate-y-0 transition duration-200">
                  {label} · <span className="text-lime-300">{n} project{n === 1 ? "" : "s"}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Card cycling through featured projects; clicking opens the case study.
function ProjectTicker({ onOpen }) {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % FEATURED.length), 3200); return () => clearInterval(t); }, []);
  const p = FEATURED[i];
  return (
    <button onClick={() => onOpen(p)} aria-label={`Open ${p.name} case study`}
      className="drift group relative flex items-center gap-3 pl-3 pr-4 py-3 rounded-2xl bg-zinc-900/90 border border-zinc-700 shadow-2xl backdrop-blur-sm text-left hover:border-lime-300 transition-colors focus:outline-hidden focus:ring-2 focus:ring-lime-300">
      <div className="w-9 h-9 rounded-xl bg-lime-300 flex items-center justify-center text-black shrink-0"><Gamepad2 size={18} /></div>
      <div key={p.id} className="fade-up min-w-0">
        <p className="text-xs text-zinc-500">Shipped · {p.industry[0]}</p>
        <p className="text-sm font-semibold text-white whitespace-nowrap">{p.name}</p>
      </div>
      <ArrowUpRight size={14} className="text-zinc-500 group-hover:text-lime-300 group-hover:rotate-45 transition" />
      <span className="absolute -bottom-1.5 left-3 right-3 flex gap-1">
        {FEATURED.map((f, k) => <span key={f.id} className={`h-0.5 flex-1 rounded-full transition-colors duration-500 ${k === i ? "bg-lime-300" : "bg-zinc-700"}`} />)}
      </span>
    </button>
  );
}

export default function HeroVisual({ onOpen, onIndustry }) {
  const ref = useRef(null);
  const move = (e) => {
    const el = ref.current; if (!el || prefersReduced()) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--px", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    el.style.setProperty("--py", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  };
  const leave = () => { ref.current?.style.setProperty("--px", "0"); ref.current?.style.setProperty("--py", "0"); };
  return (
    <div ref={ref} onMouseMove={move} onMouseLeave={leave}
      className="relative w-80 h-80 md:w-[28rem] md:h-[28rem] [--r:160px] md:[--r:224px] flex items-center justify-center">
      <div className="absolute inset-0 rounded-full bg-lime-300/5 blur-3xl" style={depth(6)} aria-hidden="true" />
      <OrbitRing onIndustry={onIndustry} />
      <div style={depth(8)}><ProfilePhoto /></div>

      {/* Cards sit in the corners outside the circle so they never cover the photo. */}
      <div className="fade-up hidden sm:block absolute -left-14 -top-8 z-10" style={{ animationDelay: "400ms", ...depth(20) }}>
        <ProjectTicker onOpen={onOpen} />
      </div>

      <div className="fade-up hidden sm:block absolute -right-10 top-4 z-10" style={{ animationDelay: "550ms", ...depth(26) }}>
        <button onClick={() => onOpen(ESTATE)} aria-label="Open the real-estate bidding case study"
          className="drift-2 flex items-center gap-2 px-3.5 py-2 rounded-full bg-zinc-900/90 border border-zinc-700 shadow-2xl backdrop-blur-sm text-xs font-semibold text-white hover:border-lime-300 transition-colors focus:outline-hidden focus:ring-2 focus:ring-lime-300">
          <span className="relative flex w-2 h-2"><span className="absolute inline-flex w-full h-full rounded-full bg-red-400 opacity-75 animate-ping" /><span className="relative inline-flex w-2 h-2 rounded-full bg-red-400" /></span>
          <Gavel size={13} className="text-lime-300" />Live bidding
        </button>
      </div>

      <div className="fade-up hidden sm:block absolute -right-12 -bottom-8 z-10" style={{ animationDelay: "700ms", ...depth(16) }}>
        <button onClick={() => onIndustry("Fintech")} aria-label="See payment and fintech projects"
          className="drift-3 flex items-center gap-3 px-4 py-3 rounded-2xl bg-zinc-900/90 border border-zinc-700 shadow-2xl backdrop-blur-sm text-left hover:border-lime-300 transition-colors focus:outline-hidden focus:ring-2 focus:ring-lime-300">
          <div className="w-9 h-9 rounded-xl bg-emerald-400 flex items-center justify-center text-black"><CreditCard size={18} /></div>
          <div><p className="text-xs text-zinc-500">Payments</p><p className="text-sm font-semibold text-white">Stripe · JazzCash · Easypaisa</p></div>
        </button>
      </div>

      <p className="hidden md:block absolute -bottom-16 inset-x-0 text-center text-xs text-zinc-600">Tip: hover the orbit — click an icon to filter my work</p>
    </div>
  );
}
