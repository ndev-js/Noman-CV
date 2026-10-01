import { useRef } from "react";
import { prefersReduced } from "../../utils/dom";

// Button that drifts slightly toward the cursor.
export default function Magnetic({ children, onClick, className = "" }) {
  const ref = useRef(null);
  const move = (e) => {
    if (prefersReduced()) return;
    const el = ref.current; const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
  };
  const leave = () => { if (ref.current) ref.current.style.transform = ""; };
  return <button ref={ref} onMouseMove={move} onMouseLeave={leave} onClick={onClick} className={`transition-transform duration-200 ease-out ${className}`}>{children}</button>;
}
