import { ArrowUpRight, Radio } from "lucide-react";
import { projectCover } from "../../../utils/projects";
import TiltCard from "../../ui/TiltCard";

export default function ProjectCard({ project: p, big, onOpen }) {
  return (
    <TiltCard onClick={() => onOpen(p)} label={`Open ${p.name} case study`} className="h-full flex flex-col">
      <div className={`relative ${big ? "h-44" : "h-32"} bg-linear-to-br ${projectCover(p)} overflow-hidden`}>
        <div className="absolute inset-0 grid-bg opacity-50" />
        <span className={`absolute -bottom-3 left-5 font-black tracking-tighter text-black opacity-20 ${big ? "text-8xl" : "text-6xl"} whitespace-nowrap`}>{p.name}</span>
        {p.badge && <span className="absolute top-4 left-4 inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-black/70 text-white"><Radio size={11} />{p.badge}</span>}
        <span className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center group-hover:rotate-45 transition duration-300"><ArrowUpRight size={16} /></span>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <p className="text-xs text-zinc-500">{p.industry.join(" · ")}</p>
        <h3 className="mt-1 text-xl font-bold text-white">{p.name}</h3>
        <p className="mt-2 text-sm text-zinc-400 leading-relaxed flex-1">{p.blurb}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.tech.slice(0, 4).map((t) => <span key={t} className="text-xs px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-400">{t}</span>)}
          {p.tech.length > 4 && <span className="text-xs px-2 py-0.5 text-zinc-500">+{p.tech.length - 4}</span>}
        </div>
      </div>
    </TiltCard>
  );
}
