import { ArrowRight, Zap } from "lucide-react";
import { PROFILE } from "../../data/profile";
import Magnetic from "../ui/Magnetic";

export default function Footer({ onNavigate }) {
  return (
    <footer className="relative z-10 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <p className="text-3xl md:text-4xl font-black text-white tracking-tight">Let's build something <span className="shimmer-text">great.</span></p>
          <p className="mt-2 text-sm text-zinc-500">© {new Date().getFullYear()} {PROFILE.name} · Press <kbd className="px-1.5 py-0.5 rounded-sm border border-zinc-800 text-zinc-400">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 rounded-sm border border-zinc-800 text-zinc-400">K</kbd> to navigate</p>
        </div>
        <Magnetic onClick={() => onNavigate("contact")} className="group px-8 py-4 rounded-full bg-lime-300 text-black font-bold flex items-center gap-2 hover:bg-lime-200">
          <Zap size={18} />Start a project<ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Magnetic>
      </div>
    </footer>
  );
}
