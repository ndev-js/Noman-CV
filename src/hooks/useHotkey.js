import { useEffect, useRef } from "react";

// Calls `handler` on Ctrl/Cmd + `key`.
export function useHotkey(key, handler) {
  const fn = useRef(handler);
  useEffect(() => { fn.current = handler; });
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === key) { e.preventDefault(); fn.current(e); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [key]);
}
