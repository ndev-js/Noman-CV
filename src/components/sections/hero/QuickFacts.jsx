// Fact cards that cascade in whenever the list changes (key the parent on audience).
export default function QuickFacts({ facts }) {
  return (
    <ul className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-3 max-w-xl">
      {facts.map(({ icon: Icon, title, value }, i) => (
        <li key={title} className="fade-up group flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/50 px-3.5 py-3 hover:border-lime-300/50 hover:bg-zinc-900 hover:-translate-y-0.5 transition duration-300"
          style={{ animationDelay: `${120 + i * 70}ms` }}>
          <span className="w-9 h-9 shrink-0 rounded-xl bg-lime-300/10 text-lime-300 flex items-center justify-center group-hover:bg-lime-300 group-hover:text-black group-hover:rotate-6 transition duration-300"><Icon size={16} /></span>
          <span className="min-w-0">
            <span className="block text-[11px] uppercase tracking-wider text-zinc-500">{title}</span>
            <span className="block text-sm font-semibold text-white leading-snug">{value}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
