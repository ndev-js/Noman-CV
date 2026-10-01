import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { PROCESS } from "../../../data/content";
import { useInView } from "../../../hooks/useInView";
import { prefersReduced } from "../../../utils/dom";
import SectionHead from "../../ui/SectionHead";

export default function Process() {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const [ref, seen] = useInView(0.3);
  useEffect(() => {
    if (!seen || paused || prefersReduced()) return;
    const t = setInterval(() => setStep((s) => (s + 1) % PROCESS.length), 3500);
    return () => clearInterval(t);
  }, [seen, paused]);
  const S = PROCESS[step];
  return (
    <section id="process" className="max-w-6xl mx-auto px-6 py-28 scroll-mt-20">
      <SectionHead kicker="How we'll work" title="A clear process, no surprises" />
      <div ref={ref} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} className="grid lg:grid-cols-2 gap-8 items-stretch">
        <div className="space-y-3">
          {PROCESS.map((p, i) => (
            <button key={p.title} onClick={() => setStep(i)} aria-pressed={step === i}
              className={`w-full text-left flex items-center gap-5 p-5 rounded-2xl border transition duration-300 focus:outline-hidden focus:ring-2 focus:ring-lime-300 ${step === i ? "border-lime-300/60 bg-zinc-900" : "border-zinc-800 hover:border-zinc-600"}`}>
              <span className={`text-3xl font-black font-mono transition ${step === i ? "text-lime-300" : "text-zinc-700"}`}>0{i + 1}</span>
              <span className={`text-lg font-bold transition ${step === i ? "text-white" : "text-zinc-400"}`}>{p.title}</span>
              <ChevronRight size={18} className={`ml-auto transition ${step === i ? "text-lime-300 translate-x-1" : "text-zinc-700"}`} />
            </button>
          ))}
        </div>
        <div className="relative rounded-3xl border border-zinc-800 bg-linear-to-br from-zinc-900 to-black p-10 overflow-hidden flex flex-col justify-between" style={{ minHeight: 320 }}>
          <div className="absolute -right-10 -top-10 w-64 h-64 rounded-full bg-lime-300 opacity-10 blur-3xl" />
          <div key={step} className="fade-up relative">
            <div className="w-16 h-16 rounded-2xl bg-lime-300 text-black flex items-center justify-center"><S.icon size={28} /></div>
            <p className="mt-8 text-sm font-mono text-lime-300">Step 0{step + 1}</p>
            <h3 className="mt-2 text-3xl font-black text-white">{S.title}</h3>
            <p className="mt-4 text-lg text-zinc-400 leading-relaxed">{S.desc}</p>
          </div>
          <div className="relative mt-10 flex gap-2">
            {PROCESS.map((_, i) => <span key={i} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i <= step ? "bg-lime-300" : "bg-zinc-800"}`} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
