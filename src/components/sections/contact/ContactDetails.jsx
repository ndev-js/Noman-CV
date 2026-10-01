import { useState } from "react";
import { Check, Copy, Mail, MapPin, Phone } from "lucide-react";
import { PROFILE } from "../../../data/profile";
import { copyText } from "../../../utils/dom";
import { Github, Linkedin } from "../../icons/BrandIcons";
import DownloadCV from "../../ui/DownloadCV";

const SOCIALS = [[Github, PROFILE.github, "GitHub"], [Linkedin, PROFILE.linkedin, "LinkedIn"]];

export default function ContactDetails({ onToast }) {
  const [copied, setCopied] = useState(false);
  const copyEmail = async () => {
    await copyText(PROFILE.email);
    setCopied(true); onToast("Email copied"); setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-3">
      <div className="flex items-center justify-between gap-3 rounded-2xl px-4 py-3 bg-black border border-zinc-800">
        <span className="flex items-center gap-3 text-sm text-zinc-200 truncate"><Mail size={16} className="text-lime-300 shrink-0" />{PROFILE.email}</span>
        <button onClick={copyEmail} aria-label="Copy email" className="p-2 rounded-lg text-zinc-400 hover:text-lime-300 hover:bg-zinc-900 focus:outline-hidden focus:ring-2 focus:ring-lime-300">{copied ? <Check size={16} /> : <Copy size={16} />}</button>
      </div>
      <a href={PROFILE.phoneHref} className="flex items-center gap-3 rounded-2xl px-4 py-3 bg-black border border-zinc-800 text-sm text-zinc-200 hover:border-lime-300 transition"><Phone size={16} className="text-lime-300" />{PROFILE.phone}</a>
      <div className="flex items-center gap-3 rounded-2xl px-4 py-3 bg-black border border-zinc-800 text-sm text-zinc-200"><MapPin size={16} className="text-lime-300" />{PROFILE.location}</div>
      <DownloadCV iconSize={16} className="flex items-center justify-center gap-2 rounded-2xl px-4 py-3 bg-lime-300/10 border border-lime-300/30 text-sm font-semibold text-lime-300 hover:bg-lime-300 hover:text-black transition focus:outline-hidden focus:ring-2 focus:ring-lime-300" />
      <div className="flex gap-3 pt-1">
        {SOCIALS.map(([I, href, l]) => (
          <a key={l} href={href} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border border-zinc-800 text-sm text-zinc-300 hover:border-lime-300 hover:text-lime-300 transition"><I size={16} />{l}</a>
        ))}
      </div>
    </div>
  );
}
