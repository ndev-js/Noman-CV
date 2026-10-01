import { ArrowUp } from "lucide-react";

export default function BackToTop({ onClick }) {
  return (
    <button onClick={onClick} aria-label="Back to top" className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-zinc-900 border border-zinc-700 text-white shadow-2xl hover:border-lime-300 hover:text-lime-300 hover:-translate-y-1 transition focus:outline-hidden focus:ring-2 focus:ring-lime-300"><ArrowUp size={20} /></button>
  );
}
