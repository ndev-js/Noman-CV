import profilePhoto from "../../../assets/profile.jpg";
import { PROFILE } from "../../../data/profile";

// Fades the photo's edge into the page background.
const BLEND_MASK = "radial-gradient(circle at center, black 62%, transparent 72%)";

// Places the photo so head-to-crossed-arms sits inside the circle (tuned for profile.jpg).
// Width is relative to the circle; left/top shift the image inside it.
const FRAME = { width: "84%", left: "11%", top: "-2%" };
// Softens the photo's own side edges so they melt into the black circle.
const EDGE_MASK = "linear-gradient(to right, transparent, black 14%, black 86%, transparent)";

export default function ProfilePhoto() {
  return (
    <div className="relative group rounded-full">
      <div className="absolute inset-4 rounded-full bg-linear-to-br from-lime-300 via-emerald-400 to-cyan-400 opacity-20 blur-3xl group-hover:opacity-35 transition duration-500" aria-hidden="true" />
      <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden bg-black" style={{ maskImage: BLEND_MASK, WebkitMaskImage: BLEND_MASK }}>
        <img src={profilePhoto} alt={PROFILE.name} draggable="false" className="absolute max-w-none h-auto select-none group-hover:scale-105 transition duration-700"
          style={{ ...FRAME, maskImage: EDGE_MASK, WebkitMaskImage: EDGE_MASK }} />
      </div>
    </div>
  );
}
