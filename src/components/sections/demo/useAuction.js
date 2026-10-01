import { useCallback, useEffect, useRef, useState } from "react";

const BOT_NAMES = ["Bidder A21", "Bidder K07", "Bidder L88", "Bidder F14"];

// Simulated live auction: countdown, bot bidders, and anti-sniping clock extension.
export function useAuction({ start: startBid, duration }) {
  const [bid, setBid] = useState(startBid);
  const [history, setHistory] = useState([]);
  const [left, setLeft] = useState(duration);
  const [running, setRunning] = useState(false);
  const [ended, setEnded] = useState(false);
  const [flash, setFlash] = useState(false);
  const bidRef = useRef(startBid);
  const leftRef = useRef(duration);

  const updateLeft = useCallback((v) => { leftRef.current = v; setLeft(v); }, []);

  const place = useCallback((who, amt, me) => {
    bidRef.current = amt; setBid(amt);
    setHistory((h) => [{ who, amt, me, id: Date.now() + Math.random() }, ...h].slice(0, 6));
    setFlash(true); setTimeout(() => setFlash(false), 450);
    updateLeft(Math.max(leftRef.current, 10));
  }, [updateLeft]);

  const start = () => { bidRef.current = startBid; setBid(startBid); setHistory([]); updateLeft(duration); setEnded(false); setRunning(true); };
  const raise = (inc) => place("You", bidRef.current + inc, true);

  // Countdown
  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      const l = Math.max(leftRef.current - 1, 0);
      updateLeft(l);
      if (l === 0) { setRunning(false); setEnded(true); }
    }, 1000);
    return () => clearInterval(t);
  }, [running, updateLeft]);

  // Bot bidders
  useEffect(() => {
    if (!running) return;
    let to;
    const loop = () => { to = setTimeout(() => { place(BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)], bidRef.current + 50000 * (1 + Math.floor(Math.random() * 3)), false); loop(); }, 2500 + Math.random() * 3500); };
    loop(); return () => clearTimeout(to);
  }, [running, place]);

  return { bid, history, left, running, ended, flash, leader: history[0], start, raise };
}
