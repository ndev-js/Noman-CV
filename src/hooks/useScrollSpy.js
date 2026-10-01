import { useEffect, useState } from "react";

// Tracks page scroll progress (0–100) and which section is currently in view.
export function useScrollSpy(sections, offset = 160) {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(sections[0].id);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement; const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
      let cur = sections[0].id;
      sections.forEach((s) => { const el = document.getElementById(s.id); if (el && el.getBoundingClientRect().top <= offset) cur = s.id; });
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections, offset]);
  return { progress, active };
}
