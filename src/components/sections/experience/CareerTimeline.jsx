import { useState } from "react";
import { Calendar } from "lucide-react";
import { JOBS } from "../../../data/content";
import { CAREER_START, jobSpan, monthIndex, nowYM, tenure } from "../../../utils/career";

export default function CareerTimeline({ active, onSelect }) {
  const [hover, setHover] = useState(null);
  const total = monthIndex(nowYM()) + 1 - CAREER_START;
  const years = []; for (let y = 2022; y <= nowYM()[0]; y++) years.push(y);
  const pos = (m) => ((m - CAREER_START) / total) * 100;
  return (
    <div className="mb-12 select-none rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs uppercase tracking-widest text-zinc-500 flex items-center gap-2"><Calendar size={14} />Career timeline</p>
        <p className="text-xs font-mono text-lime-300">{tenure(total)} building</p>
      </div>
      <div className="relative h-16">
        <div className="absolute top-7 inset-x-0 h-1 rounded-full bg-zinc-800" />
        {JOBS.map((j, i) => {
          const sp = jobSpan(j);
          return (
            <button key={j.id} onClick={() => onSelect(i)} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} onFocus={() => setHover(i)} onBlur={() => setHover(null)}
              aria-label={`${j.company}, ${sp.from} to ${sp.to}`} style={{ left: `${pos(sp.s)}%`, width: `calc(${(sp.months / total) * 100}% - 4px)` }}
              className={`absolute top-5 h-5 rounded-full transition-all duration-300 focus:outline-hidden focus:ring-2 focus:ring-lime-200 ${active === i ? "bg-linear-to-r from-lime-300 to-emerald-400 shadow-lg scale-y-125" : "bg-zinc-700 hover:bg-zinc-500"}`}>
              {hover === i && (
                <span className="absolute bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg px-3 py-1.5 bg-zinc-800 border border-zinc-700 text-xs text-white shadow-xl z-10">
                  <b>{j.short}</b> · {sp.from} – {sp.to} · {tenure(sp.months)}
                </span>
              )}
            </button>
          );
        })}
        <span className="absolute top-6 right-0 flex w-3 h-3 translate-x-1/2" aria-hidden="true"><span className="absolute inline-flex w-full h-full rounded-full bg-lime-300 opacity-75 animate-ping" /><span className="relative inline-flex w-3 h-3 rounded-full bg-lime-300" /></span>
      </div>
      <div className="relative h-5 text-xs font-mono text-zinc-600">
        <span className="absolute left-0">Oct '21</span>
        {years.map((y) => { const p = pos(monthIndex([y, 0])); return p > 8 && p < 92 ? <span key={y} className="absolute -translate-x-1/2" style={{ left: `${p}%` }}>{y}</span> : null; })}
        <span className="absolute right-0 text-lime-300">Now</span>
      </div>
    </div>
  );
}
