// Transition controlled by the `on` prop, with an optional delay in ms.
export default function Fade({ on, d = 0, className = "", children }) {
  return <div style={{ transitionDelay: `${d}ms` }} className={`transition duration-500 ease-out motion-reduce:transition-none ${on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"} ${className}`}>{children}</div>;
}
