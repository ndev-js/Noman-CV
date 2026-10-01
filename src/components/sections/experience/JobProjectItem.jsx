import { ChevronDown, Maximize2, Radio } from "lucide-react";

// Expandable project row inside a job panel. `highlight` is the selected tech, if any.
export default function JobProjectItem({ project: p, isOpen, onToggle, highlight, onOpen }) {
  const dim = highlight && !p.tech.includes(highlight);
  return (
    <div className={`rounded-2xl border transition duration-300 ${isOpen ? "border-lime-300/60 bg-zinc-900" : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-600"} ${dim ? "opacity-30" : ""}`}>
      <button onClick={onToggle} aria-expanded={isOpen} aria-controls={`proj-${p.id}`} className="w-full text-left p-4 flex items-center gap-3 rounded-2xl focus:outline-hidden focus:ring-2 focus:ring-lime-300">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-white">{p.name}</span>
            {p.badge && <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-lime-300/10 text-lime-300"><Radio size={11} />{p.badge}</span>}
          </div>
          <p className="text-sm text-zinc-400 mt-0.5">{p.blurb}</p>
        </div>
        <ChevronDown size={18} className={`text-zinc-400 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-lime-300" : ""}`} />
      </button>
      {isOpen && (
        <div id={`proj-${p.id}`} className="fade-up px-4 pb-4">
          <div className="h-px bg-zinc-800 mb-4" />
          <ul className="space-y-2">{p.points.map((pt, i) => <li key={i} className="flex gap-2 text-sm text-zinc-300"><span className="text-lime-300">▹</span>{pt}</li>)}</ul>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1">{p.tech.map((t) => <span key={t} className={`text-xs px-2 py-0.5 rounded-sm ${t === highlight ? "bg-lime-300 text-black" : "bg-zinc-800 text-zinc-400"}`}>{t}</span>)}</div>
            <button onClick={() => onOpen(p)} className="text-xs flex items-center gap-1 text-lime-300 hover:text-lime-200"><Maximize2 size={12} />Case study</button>
          </div>
        </div>
      )}
    </div>
  );
}
