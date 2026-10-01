import { formatPKR } from "../../../utils/format";

export default function BidFeed({ history }) {
  return (
    <div className="lg:col-span-2">
      <p className="text-xs uppercase tracking-widest text-zinc-500 mb-3">Bid feed</p>
      <ul className="space-y-2" aria-live="polite">
        {history.length === 0 && <li className="text-sm text-zinc-600 border border-dashed border-zinc-800 rounded-2xl p-6 text-center">Bids stream in here in real time.</li>}
        {history.map((h, i) => (
          <li key={h.id} className={`fade-up flex items-center justify-between rounded-2xl px-4 py-3 border ${i === 0 ? "border-lime-300/60 bg-lime-300/5" : "border-zinc-800 bg-zinc-900/50"}`}>
            <span className={`text-sm ${h.me ? "text-lime-300 font-semibold" : "text-zinc-300"}`}>{h.who}</span>
            <span className="font-mono text-sm text-white">{formatPKR(h.amt)}</span>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-xs text-zinc-500 leading-relaxed">In production: bids broadcast to every participant over WebSockets, the highest bid is tracked server-side, and late bids extend the clock to stop last-second sniping.</p>
    </div>
  );
}
