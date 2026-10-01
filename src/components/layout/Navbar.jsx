import { useState } from "react";
import { Command, Menu, X } from "lucide-react";
import { SECTIONS } from "../../data/content";
import { PROFILE } from "../../data/profile";
import DownloadCV from "../ui/DownloadCV";

export default function Navbar({ active, scrolled, onNavigate, onOpenPalette }) {
  const [menu, setMenu] = useState(false);
  const go = (id) => { setMenu(false); onNavigate(id); };
  return (
    <header className="fixed top-4 inset-x-0 z-40 px-4">
      <nav aria-label="Main" className={`max-w-5xl mx-auto flex items-center justify-between gap-4 pl-5 pr-2 py-2 rounded-full border transition duration-300 ${scrolled ? "bg-zinc-950/80 border-zinc-800 backdrop-blur-md shadow-2xl" : "border-transparent"}`}>
        <button onClick={() => go("home")} className="font-black text-lg text-white tracking-tight focus:outline-hidden">noman<span className="text-lime-300">.</span></button>
        <ul className="hidden lg:flex items-center gap-1">
          {SECTIONS.slice(1).map((s) => (
            <li key={s.id}><button onClick={() => go(s.id)} aria-current={active === s.id ? "true" : undefined}
              className={`px-3.5 py-2 rounded-full text-sm transition focus:outline-hidden focus:ring-2 focus:ring-lime-300 ${active === s.id ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white"}`}>{s.label}</button></li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <button onClick={onOpenPalette} aria-label="Open command palette" className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full border border-zinc-800 text-xs text-zinc-400 hover:text-white hover:border-zinc-600 transition"><Command size={13} />K</button>
          <DownloadCV iconSize={14} className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-zinc-800 text-sm text-zinc-300 hover:text-lime-300 hover:border-lime-300 transition focus:outline-hidden focus:ring-2 focus:ring-lime-300">CV</DownloadCV>
          <button onClick={() => go("contact")} className="px-5 py-2.5 rounded-full bg-lime-300 text-black text-sm font-bold hover:bg-lime-200 transition focus:outline-hidden focus:ring-2 focus:ring-lime-100">Hire me</button>
          <button className="lg:hidden p-2 text-zinc-300" onClick={() => setMenu(!menu)} aria-label="Toggle menu" aria-expanded={menu}>{menu ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
      </nav>
      {menu && (
        <ul className="fade-up lg:hidden max-w-5xl mx-auto mt-2 p-2 rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl">
          {SECTIONS.map((s) => <li key={s.id}><button onClick={() => go(s.id)} className={`w-full text-left px-4 py-3 rounded-2xl ${active === s.id ? "bg-zinc-900 text-lime-300" : "text-zinc-300"}`}>{s.label}</button></li>)}
          {PROFILE.resume && <li className="mt-1 pt-1 border-t border-zinc-800"><DownloadCV iconSize={16} className="w-full flex items-center gap-2 px-4 py-3 rounded-2xl text-lime-300" /></li>}
        </ul>
      )}
    </header>
  );
}
