import { useEffect, useState } from "react";
import { ArrowRight, Download, Gavel, Mail } from "lucide-react";
import { AUDIENCES, HERO_WORDS } from "../../../data/content";
import { PROFILE } from "../../../data/profile";
import { useAudience } from "../../../hooks/useAudience";
import { downloadFile, scrollTo } from "../../../utils/dom";
import Counter from "../../ui/Counter";
import Magnetic from "../../ui/Magnetic";
import AudienceSwitch from "./AudienceSwitch";
import HeroVisual from "./HeroVisual";
import QuickFacts from "./QuickFacts";
import TechMarquee from "./TechMarquee";

const PRIMARY = "group px-7 py-4 rounded-full bg-lime-300 text-black font-bold flex items-center gap-2 hover:bg-lime-200 shadow-lg shadow-lime-300/10 focus:outline-hidden focus:ring-2 focus:ring-lime-200 focus:ring-offset-2 focus:ring-offset-black";
const SECONDARY = "px-7 py-4 rounded-full border border-zinc-700 text-white font-semibold hover:border-zinc-400 hover:bg-zinc-900 transition focus:outline-hidden focus:ring-2 focus:ring-lime-300";
const TERTIARY = "px-2 py-4 flex items-center gap-2 text-zinc-300 font-semibold hover:text-lime-300 transition focus:outline-hidden focus:ring-2 focus:ring-lime-300 rounded-full";

const Name = () => <span className="text-white font-semibold">{PROFILE.name}</span>;
const Shipped = () => <>including <span className="text-white">stc play</span> for stc 🇸🇦 and <span className="text-white">GameNow</span> for Jazz 🇵🇰.</>;

function Intro({ audience }) {
  return audience === "recruiter"
    ? <>I'm <Name />, a Software Engineer at Khaleef Technologies with 5+ years building production React, Next.js and Node.js apps — <Shipped /></>
    : <>I'm <Name />, a full-stack engineer (React · Next.js · Node.js) with 5+ years shipping products for telecoms and businesses — <Shipped /></>;
}

function Actions({ audience }) {
  if (audience === "recruiter") {
    return (
      <>
        {PROFILE.resume ? (
          <Magnetic onClick={() => downloadFile(PROFILE.resume)} className={PRIMARY}>
            <Download size={18} className="group-hover:translate-y-0.5 transition-transform" />Download CV
          </Magnetic>
        ) : (
          <Magnetic onClick={() => scrollTo("experience")} className={PRIMARY}>View experience<ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></Magnetic>
        )}
        {PROFILE.resume && <button onClick={() => scrollTo("experience")} className={SECONDARY}>View experience</button>}
        <a href={`mailto:${PROFILE.email}?subject=${encodeURIComponent("Opportunity for " + PROFILE.name)}`} className={TERTIARY}><Mail size={18} />Email me</a>
      </>
    );
  }
  return (
    <>
      <Magnetic onClick={() => scrollTo("contact")} className={PRIMARY}>
        Start a project<ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </Magnetic>
      <button onClick={() => scrollTo("work")} className={SECONDARY}>See my work</button>
      <button onClick={() => scrollTo("demo")} className={TERTIARY}><Gavel size={18} />Try the live demo</button>
    </>
  );
}

export default function Hero({ onOpen, onIndustry }) {
  const [w, setW] = useState(0);
  const [audience, setAudience] = useAudience();
  useEffect(() => { const t = setInterval(() => setW((x) => (x + 1) % HERO_WORDS.length), 2600); return () => clearInterval(t); }, []);
  return (
    <section id="home" className="relative pt-32 md:pt-40 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-12 gap-14 items-center">
        <div className="lg:col-span-7">
          <div className="fade-up flex flex-wrap items-center gap-3">
            <AudienceSwitch value={audience} onChange={setAudience} />
            <span className="inline-flex items-center gap-2 text-sm text-zinc-400">
              <span className="relative flex w-2.5 h-2.5"><span className="absolute inline-flex w-full h-full rounded-full bg-lime-300 opacity-75 animate-ping" /><span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-lime-300" /></span>
              Available for new projects
            </span>
          </div>
          <h1 className="fade-up mt-7 text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-none text-white" style={{ animationDelay: "80ms" }}>
            I build<br />
            <span key={w} className="fade-up inline-block shimmer-text pb-2">{HERO_WORDS[w]}</span><br />
            that scale.
          </h1>
          {/* Keyed on audience so the copy, buttons and facts re-animate on every switch. */}
          <div key={audience}>
            <p className="fade-up mt-6 text-lg text-zinc-400 max-w-xl leading-relaxed" style={{ animationDelay: "60ms" }}>
              <Intro audience={audience} />
            </p>
            <div className="fade-up mt-9 flex flex-wrap items-center gap-4" style={{ animationDelay: "100ms" }}>
              <Actions audience={audience} />
            </div>
            <div className="mt-9">
              <QuickFacts facts={AUDIENCES[audience].facts} />
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 relative flex justify-center pt-10 lg:pt-0">
          <HeroVisual onOpen={onOpen} onIndustry={onIndustry} />
        </div>
      </div>

      <TechMarquee />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-zinc-900 border-b border-zinc-900">
          <Counter to={5} suffix="+" label="Years building products" />
          <Counter to={10} suffix="+" label="Products shipped" />
          <Counter to={2} label="Telecom partners" />
          <Counter to={4} label="Payment integrations" />
        </div>
      </div>
    </section>
  );
}
