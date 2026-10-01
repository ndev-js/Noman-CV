import { Clock, Gavel } from "lucide-react";
import { formatPKR } from "../../../utils/format";
import Reveal from "../../ui/Reveal";
import SectionHead from "../../ui/SectionHead";
import BidFeed from "./BidFeed";
import { useAuction } from "./useAuction";

const START = 8500000;
const DURATION = 45;
const INCREMENTS = [50000, 100000, 250000];

export default function LiveAuction() {
  const { bid, history, left, running, ended, flash, leader, start, raise } = useAuction({ start: START, duration: DURATION });
  return (
    <section id="demo" className="max-w-6xl mx-auto px-6 py-28 scroll-mt-20">
      <SectionHead kicker="Live demo" title="Real-time bidding, playable right here" sub="A simulation of the bidding engine from my real-estate marketplace. Start the auction and try to win the plot." />
      <Reveal>
        <div className="grid lg:grid-cols-5 gap-6 rounded-3xl p-6 md:p-8 bg-linear-to-br from-zinc-900 to-black border border-zinc-800">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-2">
              {running ? <span className="flex items-center gap-2 text-xs font-bold px-3 py-1 rounded-full bg-red-500/10 text-red-300"><span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />LIVE</span>
                : <span className="text-xs px-3 py-1 rounded-full bg-zinc-800 text-zinc-400">{ended ? "Auction closed" : "Not started"}</span>}
              <span className="text-xs text-zinc-500">Simulated bidders</span>
            </div>
            <h3 className="mt-5 text-2xl font-bold text-white">10 Marla Residential Plot</h3>
            <p className="text-sm text-zinc-500">Sample listing · Lahore</p>
            <p className="mt-8 text-xs uppercase tracking-widest text-zinc-500">Current highest bid</p>
            <p className={`text-4xl md:text-5xl font-black transition duration-300 ${flash ? "text-lime-300 scale-105" : "text-white"}`} aria-live="polite">{formatPKR(bid)}</p>
            <p className="text-sm mt-2 h-5">{leader ? (leader.me ? <span className="text-lime-300 font-semibold">You're winning! 🔥</span> : <span className="text-zinc-400">Leading: {leader.who}</span>) : ""}</p>
            <div className="mt-6">
              <div className="flex justify-between text-xs text-zinc-400 mb-1.5"><span className="flex items-center gap-1"><Clock size={12} />Time left</span><span className={`font-mono ${left <= 10 && running ? "text-red-300" : ""}`}>{left}s</span></div>
              <div className="h-2 rounded-full bg-zinc-800 overflow-hidden"><div className={`h-full transition-all duration-1000 ease-linear ${left <= 10 ? "bg-red-400" : "bg-lime-300"}`} style={{ width: `${(left / DURATION) * 100}%` }} /></div>
            </div>
            {running ? (
              <div className="mt-7 grid grid-cols-3 gap-3">
                {INCREMENTS.map((inc) => (
                  <button key={inc} onClick={() => raise(inc)} className="py-4 rounded-2xl bg-lime-300 text-black font-bold hover:bg-lime-200 active:scale-95 transition focus:outline-hidden focus:ring-2 focus:ring-lime-100">
                    +{inc >= 100000 ? inc / 100000 + " Lac" : inc / 1000 + "K"}
                  </button>
                ))}
              </div>
            ) : (
              <button onClick={start} className="mt-7 w-full py-4 rounded-2xl bg-lime-300 text-black font-bold hover:bg-lime-200 transition flex items-center justify-center gap-2 focus:outline-hidden focus:ring-2 focus:ring-lime-100">
                <Gavel size={18} />{ended ? "Restart auction" : "Start live auction"}
              </button>
            )}
            {ended && leader && <p className="mt-4 text-sm text-center text-zinc-300">{leader.me ? "🎉 You won at " : `Sold to ${leader.who} at `}<b className="text-white">{formatPKR(leader.amt)}</b></p>}
          </div>
          <BidFeed history={history} />
        </div>
      </Reveal>
    </section>
  );
}
