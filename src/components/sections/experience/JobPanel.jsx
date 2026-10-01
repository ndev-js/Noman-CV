import { useEffect, useState } from "react";
import { Briefcase, Check, Clock, FolderGit2, Layers } from "lucide-react";
import { PROJECTS } from "../../../data/content";
import { jobSpan, tenure } from "../../../utils/career";
import Chip from "../../ui/Chip";
import Fade from "../../ui/Fade";
import JobProjectItem from "./JobProjectItem";

export default function JobPanel({ job, onOpen }) {
  const [on, setOn] = useState(false);
  const [open, setOpen] = useState(null);
  const [hl, setHl] = useState(null);
  useEffect(() => { const t = setTimeout(() => setOn(true), 30); return () => clearTimeout(t); }, []);
  const sp = jobSpan(job);
  const projects = PROJECTS.filter((p) => p.job === job.id);
  const tech = Array.from(new Set(projects.reduce((a, p) => a.concat(p.tech), [])));
  const stats = [[Clock, tenure(sp.months), "Tenure"], [FolderGit2, projects.length, projects.length === 1 ? "Project" : "Projects"], [Layers, tech.length, "Technologies"]];
  return (
    <div>
      <Fade on={on} className="flex items-start gap-4">
        <div className="w-14 h-14 shrink-0 rounded-2xl bg-linear-to-br from-lime-300 to-emerald-500 flex items-center justify-center text-black"><Briefcase size={22} /></div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-2xl font-bold text-white">{job.role}</h3>
            {sp.current && <span className="inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full bg-lime-300/10 text-lime-300"><span className="w-1.5 h-1.5 rounded-full bg-lime-300 animate-pulse" />Current</span>}
          </div>
          <p className="text-zinc-300">{job.company}</p>
          <p className="font-mono text-xs text-zinc-500 mt-1">{sp.from} – {sp.to}</p>
        </div>
      </Fade>
      <Fade on={on} d={80} className="mt-6 grid grid-cols-3 gap-3">
        {stats.map(([I, v, l]) => (
          <div key={l} className="rounded-2xl p-4 bg-zinc-900/60 border border-zinc-800">
            <I size={15} className="text-lime-300" /><p className="text-lg font-bold text-white mt-1 leading-tight">{v}</p><p className="text-xs text-zinc-500">{l}</p>
          </div>
        ))}
      </Fade>
      <Fade on={on} d={160}><p className="mt-6 text-zinc-300 leading-relaxed">{job.summary}</p></Fade>
      <ul className="mt-4 space-y-2">
        {job.highlights.map((h, i) => <li key={h}><Fade on={on} d={220 + i * 90} className="flex gap-3 text-zinc-300"><Check size={17} className="text-lime-300 mt-0.5 shrink-0" />{h}</Fade></li>)}
      </ul>
      <Fade on={on} d={450} className="mt-7">
        <p className="text-xs uppercase tracking-widest text-zinc-500 mb-3">Stack — tap to highlight projects</p>
        <div className="flex flex-wrap gap-2">{tech.map((t) => <Chip key={t} small active={hl === t} onClick={() => setHl(hl === t ? null : t)}>{t}</Chip>)}</div>
      </Fade>
      <Fade on={on} d={520} className="mt-7 space-y-3">
        {projects.map((p) => (
          <JobProjectItem key={p.id} project={p} isOpen={open === p.id} onToggle={() => setOpen(open === p.id ? null : p.id)} highlight={hl} onOpen={onOpen} />
        ))}
      </Fade>
    </div>
  );
}
