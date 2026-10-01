import { useMemo } from "react";
import { PROJECTS } from "../../../data/content";
import Chip from "../../ui/Chip";
import Reveal from "../../ui/Reveal";
import SectionHead from "../../ui/SectionHead";
import ProjectCard from "./ProjectCard";

// `filter` is controlled by App so other sections (the hero orbit) can set it.
export default function Work({ onOpen, filter, onFilter: setFilter }) {
  const industries = useMemo(() => {
    const c = {}; PROJECTS.forEach((p) => p.industry.forEach((i) => (c[i] = (c[i] || 0) + 1))); return c;
  }, []);
  const shown = PROJECTS.filter((p) => filter === "All" || p.industry.includes(filter));
  return (
    <section id="work" className="max-w-6xl mx-auto px-6 py-28 scroll-mt-20">
      <SectionHead kicker="Selected work" title="Products in the hands of real users" sub="Filter by industry, then open any project for the full case study." />
      <Reveal className="flex gap-2 overflow-x-auto noscroll pb-2 mb-8" >
        <Chip active={filter === "All"} onClick={() => setFilter("All")} count={PROJECTS.length}>All</Chip>
        {Object.entries(industries).map(([k, v]) => <Chip key={k} active={filter === k} onClick={() => setFilter(k)} count={v}>{k}</Chip>)}
      </Reveal>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5" aria-live="polite">
        {shown.map((p, i) => {
          const big = p.featured && filter === "All" && i < 2;
          return (
            <div key={p.id} className={`fade-up ${big ? "lg:col-span-2 lg:row-span-1" : ""}`} style={{ animationDelay: `${i * 50}ms` }}>
              <ProjectCard project={p} big={big} onOpen={onOpen} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
