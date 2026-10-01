import { useEffect, useRef } from "react";
import { ArrowRight, Check, Gavel, Radio, X } from "lucide-react";
import { scrollTo } from "../../../utils/dom";
import { jobName, projectCover } from "../../../utils/projects";
import Chip from "../../ui/Chip";

export default function ProjectModal({ project, onClose }) {
  const closeRef = useRef(null);
  const fn = useRef(onClose);
  useEffect(() => { fn.current = onClose; });
  useEffect(() => {
    if (!project) return;
    if (closeRef.current) closeRef.current.focus();
    const k = (e) => e.key === "Escape" && fn.current();
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [project]);
  if (!project) return null;
  const closeAndGo = (id) => { onClose(); setTimeout(() => scrollTo(id), 100); };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xs" onClick={onClose} />
      <div className="fade-up relative w-full max-w-xl max-h-screen overflow-y-auto rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl">
        <div className={`relative h-36 bg-linear-to-br ${projectCover(project)}`}>
          <div className="absolute inset-0 grid-bg opacity-50" />
          <button ref={closeRef} onClick={onClose} aria-label="Close" className="absolute top-4 right-4 p-2 rounded-full bg-black/70 text-white hover:bg-black/90 focus:outline-hidden focus:ring-2 focus:ring-lime-300"><X size={18} /></button>
          {project.badge && <span className="absolute bottom-4 left-6 inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-black/70 text-white"><Radio size={11} />{project.badge}</span>}
        </div>
        <div className="p-7">
          <p className="text-xs text-zinc-500">{jobName(project.job)} · {project.industry.join(" · ")}</p>
          <h3 id="modal-title" className="text-3xl font-black text-white mt-1">{project.name}</h3>
          <p className="mt-3 text-zinc-300">{project.blurb}</p>
          <p className="mt-6 text-xs uppercase tracking-widest text-lime-300">What I built</p>
          <ul className="mt-3 space-y-2.5">
            {project.points.map((p, i) => <li key={i} className="flex gap-3 text-sm text-zinc-300"><Check size={16} className="text-lime-300 mt-0.5 shrink-0" />{p}</li>)}
          </ul>
          <p className="mt-6 text-xs uppercase tracking-widest text-lime-300">Stack</p>
          <div className="mt-3 flex flex-wrap gap-2">{project.tech.map((t) => <Chip key={t} small>{t}</Chip>)}</div>
          <div className="mt-8 flex flex-wrap gap-3">
            {project.id === "estate" && (
              <button onClick={() => closeAndGo("demo")} className="px-5 py-3 rounded-full bg-lime-300 text-black text-sm font-bold flex items-center gap-2 hover:bg-lime-200"><Gavel size={16} />Try the live demo</button>
            )}
            <button onClick={() => closeAndGo("contact")} className="px-5 py-3 rounded-full border border-zinc-700 text-white text-sm font-semibold hover:border-zinc-400 flex items-center gap-2">Build something similar<ArrowRight size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
