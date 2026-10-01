import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, GraduationCap, Pause, Play } from "lucide-react";
import { JOBS } from "../../../data/content";
import { jobSpan, tenure } from "../../../utils/career";
import Reveal from "../../ui/Reveal";
import SectionHead from "../../ui/SectionHead";
import CareerTimeline from "./CareerTimeline";
import JobPanel from "./JobPanel";

const TOUR_STEP = 60; // ticks of 100ms per job during the guided tour

export default function Experience({ onOpen }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [tick, setTick] = useState(0);
  const tabs = useRef([]);
  const n = JOBS.length;
  const select = (i) => { setActive(i); setTick(0); };
  const manual = (i) => { setPlaying(false); select(i); };
  const togglePlay = () => { if (playing) { setPlaying(false); return; } select(n - 1); setPlaying(true); };
  useEffect(() => {
    if (!playing) return;
    let k = 0;
    const t = setInterval(() => {
      k += 1;
      if (k >= TOUR_STEP) { k = 0; setActive((a) => (a === 0 ? n - 1 : a - 1)); }
      setTick(k);
    }, 100);
    return () => clearInterval(t);
  }, [playing, n]);
  const onKey = (e, i) => {
    const map = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    if (map[e.key]) { e.preventDefault(); const k = (i + map[e.key] + n) % n; manual(k); tabs.current[k].focus(); }
  };
  const job = JOBS[active];
  return (
    <section id="experience" className="max-w-6xl mx-auto px-6 py-28 scroll-mt-20">
      <SectionHead kicker="Experience" title="5+ years, three teams, one direction" sub="Hover the timeline, press play for a guided tour, or pick a company." />
      <Reveal>
        <CareerTimeline active={active} onSelect={manual} />
        <div className="md:flex gap-10">
          <div className="md:w-64 shrink-0 mb-8 md:mb-0">
            <div role="tablist" aria-orientation="vertical" aria-label="Companies" className="relative flex md:flex-col overflow-x-auto noscroll md:overflow-visible border-b md:border-b-0 md:border-l border-zinc-800">
              <div className="hidden md:block absolute -left-px top-0 w-0.5 h-16 bg-lime-300 transition-transform duration-300 ease-out" style={{ transform: `translateY(${active * 100}%)` }} aria-hidden="true" />
              {JOBS.map((j, i) => {
                const sp = jobSpan(j);
                return (
                  <button key={j.id} ref={(el) => (tabs.current[i] = el)} role="tab" aria-selected={active === i} aria-controls={`panel-${j.id}`} id={`tab-${j.id}`}
                    tabIndex={active === i ? 0 : -1} onClick={() => manual(i)} onKeyDown={(e) => onKey(e, i)}
                    className={`text-left whitespace-nowrap px-5 md:h-16 py-3 md:py-0 flex flex-col justify-center transition border-b-2 md:border-b-0 focus:outline-hidden focus:bg-zinc-900 ${active === i ? "text-lime-300 border-lime-300" : "border-transparent text-zinc-400 hover:text-white hover:bg-zinc-900"}`}>
                    <span className="text-sm font-semibold">{j.short}</span>
                    <span className="text-xs text-zinc-500">{sp.from.split(" ")[1]}{sp.current ? " – now" : ` – ${sp.to.split(" ")[1]}`} · {tenure(sp.months)}</span>
                  </button>
                );
              })}
            </div>
            <div className="mt-6 space-y-3">
              <button onClick={togglePlay} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full border border-zinc-800 bg-zinc-900 text-sm text-zinc-200 hover:border-lime-300 transition focus:outline-hidden focus:ring-2 focus:ring-lime-300">
                {playing ? <><Pause size={16} />Pause tour</> : <><Play size={16} />Play career journey</>}
              </button>
              {playing && <div className="h-1 rounded-full bg-zinc-900 overflow-hidden"><div className="h-full bg-lime-300 transition-all duration-100 ease-linear" style={{ width: `${(tick / TOUR_STEP) * 100}%` }} /></div>}
              <div className="rounded-2xl border border-zinc-800 p-4 mt-6">
                <GraduationCap size={18} className="text-lime-300" />
                <p className="mt-2 text-sm font-semibold text-white">B.S. Software Engineering</p>
                <p className="text-xs text-zinc-500">Lahore Garrison University · 2017–2021</p>
              </div>
            </div>
          </div>
          <div role="tabpanel" id={`panel-${job.id}`} aria-labelledby={`tab-${job.id}`} className="flex-1 min-w-0" onClickCapture={() => playing && setPlaying(false)}>
            <JobPanel key={job.id} job={job} onOpen={onOpen} />
            <div className="mt-8 flex items-center justify-between gap-3 border-t border-zinc-900 pt-5 text-sm">
              <button onClick={() => manual((active + 1) % n)} className="flex items-center gap-1 text-zinc-400 hover:text-lime-300 transition"><ChevronLeft size={16} />{JOBS[(active + 1) % n].short}</button>
              <span className="text-xs font-mono text-zinc-600">{active + 1} / {n}</span>
              <button onClick={() => manual((active - 1 + n) % n)} className="flex items-center gap-1 text-zinc-400 hover:text-lime-300 transition">{JOBS[(active - 1 + n) % n].short}<ChevronRight size={16} /></button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
