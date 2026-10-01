import { STACK } from "../../../data/content";

export default function TechMarquee() {
  return (
    <div className="marquee relative mt-24 border-y border-zinc-900 py-5 overflow-hidden" aria-label="Technologies">
      <div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-black to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-linear-to-l from-black to-transparent z-10" />
      <div className="marquee-track flex w-max gap-10">
        {[...STACK, ...STACK].map((s, i) => (
          <span key={i} className="flex items-center gap-10 text-xl md:text-2xl font-bold text-zinc-600 hover:text-lime-300 transition whitespace-nowrap">{s}<span className="text-zinc-800">✦</span></span>
        ))}
      </div>
    </div>
  );
}
