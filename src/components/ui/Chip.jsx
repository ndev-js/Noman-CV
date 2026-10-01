// Static tag, or a toggle button when `onClick` is given.
export default function Chip({ children, active, onClick, count, small }) {
  const base = `${small ? "text-xs px-2.5 py-1" : "text-sm px-4 py-2"} rounded-full border transition focus:outline-hidden focus:ring-2 focus:ring-lime-300`;
  if (!onClick) return <span className={`${base} border-zinc-800 bg-zinc-900 text-zinc-400`}>{children}</span>;
  return (
    <button type="button" onClick={onClick} aria-pressed={!!active}
      className={`${base} ${active ? "bg-lime-300 border-lime-300 text-black font-semibold" : "border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-500 hover:text-white"}`}>
      {children}{count !== undefined && <span className={`ml-1.5 ${active ? "text-black opacity-60" : "text-zinc-500"}`}>{count}</span>}
    </button>
  );
}
