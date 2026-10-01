import { Download } from "lucide-react";
import { PROFILE } from "../../data/profile";

// Link that downloads the CV from /public. Renders nothing if no CV is configured.
export default function DownloadCV({ className = "", iconSize = 18, children = "Download CV" }) {
  if (!PROFILE.resume) return null;
  return (
    <a href={PROFILE.resume} download className={className}>
      <Download size={iconSize} />{children}
    </a>
  );
}
