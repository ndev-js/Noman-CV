import Reveal from "./Reveal";

export default function SectionHead({ kicker, title, sub, center }) {
  return (
    <Reveal className={`mb-12 ${center ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}`}>
      <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-lime-300"><span className="w-6 h-px bg-lime-300" />{kicker}</span>
      <h2 className="mt-3 text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">{title}</h2>
      {sub && <p className="mt-4 text-zinc-400 text-lg">{sub}</p>}
    </Reveal>
  );
}
