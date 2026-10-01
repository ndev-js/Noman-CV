import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQ } from "../../../data/content";

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6">
      <p className="text-xs uppercase tracking-widest text-lime-300 mb-3">FAQ</p>
      {FAQ.map(([q, a], i) => (
        <div key={q} className="border-b border-zinc-800 last:border-0">
          <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} className="w-full flex items-center justify-between gap-3 py-4 text-left text-sm font-semibold text-white focus:outline-hidden focus:text-lime-300">
            {q}<ChevronDown size={16} className={`shrink-0 text-zinc-500 transition-transform duration-300 ${open === i ? "rotate-180 text-lime-300" : ""}`} />
          </button>
          {open === i && <p className="fade-up pb-4 text-sm text-zinc-400 leading-relaxed">{a}</p>}
        </div>
      ))}
    </div>
  );
}
