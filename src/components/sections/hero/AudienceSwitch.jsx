import { Briefcase, Rocket } from "lucide-react";
import { AUDIENCES } from "../../../data/content";

const OPTIONS = [
  { id: "client", icon: Rocket },
  { id: "recruiter", icon: Briefcase },
];

// Segmented control with a sliding highlight.
export default function AudienceSwitch({ value, onChange }) {
  const index = OPTIONS.findIndex((o) => o.id === value);
  return (
    <div role="radiogroup" aria-label="I'm visiting because" className="relative inline-grid grid-cols-2 p-1 rounded-full border border-zinc-800 bg-zinc-900/70 backdrop-blur-sm">
      <span aria-hidden="true" className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-lime-300 shadow-lg shadow-lime-300/20 transition-transform duration-500 ease-[cubic-bezier(.2,.9,.2,1.2)]"
        style={{ transform: `translateX(${index * 100}%)` }} />
      {OPTIONS.map(({ id, icon: Icon }) => (
        <button key={id} type="button" role="radio" aria-checked={value === id} onClick={() => onChange(id)}
          className={`relative z-10 flex items-center justify-center gap-2 px-4 sm:px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors duration-300 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-lime-300 ${value === id ? "text-black" : "text-zinc-400 hover:text-white"}`}>
          <Icon size={15} />{AUDIENCES[id].label}
        </button>
      ))}
    </div>
  );
}
