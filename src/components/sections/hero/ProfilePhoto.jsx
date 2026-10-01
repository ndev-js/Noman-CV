import { useRef, useState } from "react";
import { Camera } from "lucide-react";
import { PROFILE } from "../../../data/profile";

// Fades the photo's edge into the page background.
const BLEND_MASK = "radial-gradient(circle at center, black 62%, transparent 72%)";

// Places the photo so head-to-crossed-arms sits inside the circle (tuned for /profile.jpg).
// Width is relative to the circle; left/top shift the image inside it.
const FRAME = { width: "84%", left: "11%", top: "-2%" };
// Softens the photo's own side edges so they melt into the black circle.
const EDGE_MASK = "linear-gradient(to right, transparent, black 14%, black 86%, transparent)";

// Profile photo; clicking lets the visitor preview a local image in its place.
export default function ProfilePhoto() {
  const [src, setSrc] = useState(PROFILE.photo);
  const input = useRef(null);
  const onFile = (e) => { const f = e.target.files && e.target.files[0]; if (f) setSrc(URL.createObjectURL(f)); };
  return (
    <button type="button" onClick={() => input.current && input.current.click()} aria-label="Upload profile photo"
      className="relative group rounded-full focus:outline-hidden focus-visible:ring-2 focus-visible:ring-lime-300 focus-visible:ring-offset-4 focus-visible:ring-offset-black">
      <div className="absolute inset-4 rounded-full bg-linear-to-br from-lime-300 via-emerald-400 to-cyan-400 opacity-20 blur-3xl group-hover:opacity-35 transition duration-500" />
      <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden bg-black" style={{ maskImage: BLEND_MASK, WebkitMaskImage: BLEND_MASK }}>
        {src ? (
          <img src={src} alt={PROFILE.name} className="absolute max-w-none h-auto group-hover:scale-105 transition duration-700"
            style={{ ...FRAME, maskImage: EDGE_MASK, WebkitMaskImage: EDGE_MASK }} />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-radial from-zinc-800 to-black">
            <span className="text-7xl font-black shimmer-text">MN</span>
            <span className="mt-4 flex items-center gap-2 text-xs text-zinc-400"><Camera size={14} />Click to add your photo</span>
          </div>
        )}
        {src && <span className="absolute bottom-16 inset-x-0 text-center text-xs text-white opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-1"><Camera size={12} />Change photo</span>}
      </div>
      <input ref={input} type="file" accept="image/*" className="hidden" onChange={onFile} />
    </button>
  );
}
