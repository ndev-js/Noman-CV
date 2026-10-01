import { SERVICES } from "../../../data/content";
import Chip from "../../ui/Chip";
import Reveal from "../../ui/Reveal";
import SectionHead from "../../ui/SectionHead";
import TiltCard from "../../ui/TiltCard";

export default function Services() {
  return (
    <section id="services" className="max-w-6xl mx-auto px-6 py-28 scroll-mt-20">
      <SectionHead kicker="What I do" title="Services built around your product" sub="From the first screen to the payment gateway — one engineer across the full stack." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {SERVICES.map((s, i) => (
          <Reveal key={s.title} delay={i * 70}>
            <TiltCard className="p-7 h-full">
              <div className="w-12 h-12 rounded-2xl bg-lime-300/10 border border-lime-300/20 flex items-center justify-center text-lime-300 group-hover:bg-lime-300 group-hover:text-black transition duration-300"><s.icon size={22} /></div>
              <h3 className="mt-6 text-xl font-bold text-white">{s.title}</h3>
              <p className="mt-2 text-zinc-400 leading-relaxed">{s.desc}</p>
              <div className="mt-5 flex flex-wrap gap-2">{s.tags.map((t) => <Chip key={t} small>{t}</Chip>)}</div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
