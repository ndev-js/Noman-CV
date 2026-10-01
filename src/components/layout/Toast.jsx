import { Check } from "lucide-react";

export default function Toast({ message }) {
  if (!message) return null;
  return <div role="status" className="fade-up fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-lime-300 text-black text-sm font-semibold shadow-2xl flex items-center gap-2"><Check size={16} />{message}</div>;
}
