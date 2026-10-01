import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";

export default function CommandPalette({ open, ...props }) {
  // Mounting fresh on each open resets the query and selection.
  return open ? <CommandPaletteBody {...props} /> : null;
}

function CommandPaletteBody({ onClose, actions }) {
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);
  const inRef = useRef(null);
  useEffect(() => { const t = setTimeout(() => inRef.current && inRef.current.focus(), 20); return () => clearTimeout(t); }, []);
  const list = actions.filter((a) => a.label.toLowerCase().includes(q.toLowerCase()));
  const run = (a) => { onClose(); setTimeout(a.run, 60); };
  const onKey = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setI((x) => Math.min(x + 1, list.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setI((x) => Math.max(x - 1, 0)); }
    else if (e.key === "Enter" && list[i]) run(list[i]);
    else if (e.key === "Escape") onClose();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4" role="dialog" aria-modal="true" aria-label="Command palette">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-xs" onClick={onClose} />
      <div className="fade-up relative w-full max-w-lg rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-5 border-b border-zinc-800">
          <Search size={18} className="text-zinc-500" />
          <input ref={inRef} value={q} onChange={(e) => { setQ(e.target.value); setI(0); }} onKeyDown={onKey} placeholder="Jump to a section or run an action…" aria-label="Search commands"
            className="flex-1 bg-transparent py-4 text-white placeholder:text-zinc-600 focus:outline-hidden" />
          <kbd className="text-xs text-zinc-500 border border-zinc-800 rounded-sm px-1.5 py-0.5">esc</kbd>
        </div>
        <ul className="max-h-80 overflow-y-auto p-2" role="listbox">
          {list.length === 0 && <li className="px-4 py-6 text-center text-sm text-zinc-500">No results</li>}
          {list.map((a, k) => (
            <li key={a.label} role="option" aria-selected={k === i}>
              <button onMouseEnter={() => setI(k)} onClick={() => run(a)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm transition ${k === i ? "bg-lime-300 text-black" : "text-zinc-300"}`}>
                <a.icon size={16} />{a.label}<span className={`ml-auto text-xs ${k === i ? "text-black opacity-60" : "text-zinc-600"}`}>{a.group}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
