import { useState } from "react";
import { Check, Copy, Send } from "lucide-react";
import { BRIEF_BUDGETS, BRIEF_FEATURES, BRIEF_TIMELINES, BRIEF_TYPES } from "../../../data/content";
import { PROFILE } from "../../../data/profile";
import { copyText } from "../../../utils/dom";
import Chip from "../../ui/Chip";

const STEPS = 5;

function StepLabel({ n, children }) {
  return <p className="text-sm font-semibold text-white mb-3 flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-zinc-800 text-xs flex items-center justify-center text-lime-300">{n}</span>{children}</p>;
}

export default function BriefBuilder({ onToast }) {
  const [type, setType] = useState("");
  const [feats, setFeats] = useState([]);
  const [time, setTime] = useState("");
  const [budget, setBudget] = useState("");
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [copied, setCopied] = useState(false);
  const toggle = (f) => setFeats((a) => (a.includes(f) ? a.filter((x) => x !== f) : [...a, f]));
  const done = [type, feats.length, time, budget, name].filter(Boolean).length;
  const brief = `Hi Noman,\n\n${name ? `I'm ${name}. ` : ""}I'd like help with a ${type ? type.toLowerCase() : "project"}.\n\n` +
    `Features: ${feats.length ? feats.join(", ") : "—"}\nTimeline: ${time || "—"}\nBudget: ${budget || "—"}\n\n${details ? `Details: ${details}\n\n` : ""}Looking forward to hearing from you.`;
  const mailto = `mailto:${PROFILE.email}?subject=${encodeURIComponent(`Project inquiry: ${type || "New project"}`)}&body=${encodeURIComponent(brief)}`;
  const copy = async () => {
    await copyText(brief);
    setCopied(true); onToast("Brief copied — paste it anywhere"); setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 md:p-8">
      <div className="flex items-center justify-between gap-4 mb-2">
        <h3 className="text-2xl font-black text-white">Build your project brief</h3>
        <span className="text-xs font-mono text-zinc-500">{done}/{STEPS}</span>
      </div>
      <div className="h-1 rounded-full bg-zinc-800 overflow-hidden mb-8"><div className="h-full bg-lime-300 transition-all duration-500" style={{ width: `${(done / STEPS) * 100}%` }} /></div>

      <StepLabel n="1">What are you building?</StepLabel>
      <div className="flex flex-wrap gap-2 mb-7">{BRIEF_TYPES.map((t) => <Chip key={t} small active={type === t} onClick={() => setType(type === t ? "" : t)}>{t}</Chip>)}</div>
      <StepLabel n="2">Features you need</StepLabel>
      <div className="flex flex-wrap gap-2 mb-7">{BRIEF_FEATURES.map((f) => <Chip key={f} small active={feats.includes(f)} onClick={() => toggle(f)}>{f}</Chip>)}</div>
      <div className="grid sm:grid-cols-2 gap-6 mb-7">
        <div><StepLabel n="3">Timeline</StepLabel><div className="flex flex-wrap gap-2">{BRIEF_TIMELINES.map((t) => <Chip key={t} small active={time === t} onClick={() => setTime(time === t ? "" : t)}>{t}</Chip>)}</div></div>
        <div><StepLabel n="4">Budget</StepLabel><div className="flex flex-wrap gap-2">{BRIEF_BUDGETS.map((b) => <Chip key={b} small active={budget === b} onClick={() => setBudget(budget === b ? "" : b)}>{b}</Chip>)}</div></div>
      </div>
      <StepLabel n="5">About you</StepLabel>
      <div className="grid gap-3">
        <label><span className="sr-only">Your name</span><input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name / company" className="w-full px-4 py-3 rounded-2xl bg-black border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-hidden focus:border-lime-300" /></label>
        <label><span className="sr-only">Project details</span><textarea value={details} onChange={(e) => setDetails(e.target.value)} rows={3} placeholder="Anything else? Links, goals, current stack…" className="w-full px-4 py-3 rounded-2xl bg-black border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-hidden focus:border-lime-300 resize-none" /></label>
      </div>

      <div className="mt-7 rounded-2xl bg-black border border-zinc-800 p-4">
        <p className="text-xs uppercase tracking-widest text-zinc-500 mb-2">Preview</p>
        <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-sans leading-relaxed">{brief}</pre>
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <a href={mailto} className="flex-1 min-w-max px-6 py-4 rounded-full bg-lime-300 text-black font-bold flex items-center justify-center gap-2 hover:bg-lime-200 transition focus:outline-hidden focus:ring-2 focus:ring-lime-100"><Send size={17} />Send via email</a>
        <button onClick={copy} className="px-6 py-4 rounded-full border border-zinc-700 text-white font-semibold flex items-center gap-2 hover:border-zinc-400 transition focus:outline-hidden focus:ring-2 focus:ring-lime-300">{copied ? <Check size={17} /> : <Copy size={17} />}Copy brief</button>
      </div>
    </div>
  );
}
