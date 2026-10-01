import { useEffect } from "react";

// Writes the cursor position to --x / --y on the element for the `.spot` background.
export function useSpotlight(ref) {
  useEffect(() => {
    let raf = 0;
    const onMove = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (ref.current) { ref.current.style.setProperty("--x", `${e.clientX}px`); ref.current.style.setProperty("--y", `${e.clientY}px`); }
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, [ref]);
}
