import { useRef, useState } from "react";
import { ArrowRight, Copy, Download, Gavel, Rocket } from "lucide-react";
import CommandPalette from "./components/command-palette/CommandPalette";
import { Github, Linkedin } from "./components/icons/BrandIcons";
import BackToTop from "./components/layout/BackToTop";
import Background from "./components/layout/Background";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import Toast from "./components/layout/Toast";
import Contact from "./components/sections/contact/Contact";
import LiveAuction from "./components/sections/demo/LiveAuction";
import Experience from "./components/sections/experience/Experience";
import Hero from "./components/sections/hero/Hero";
import Process from "./components/sections/process/Process";
import Services from "./components/sections/services/Services";
import ProjectModal from "./components/sections/work/ProjectModal";
import Work from "./components/sections/work/Work";
import { SECTIONS } from "./data/content";
import { PROFILE } from "./data/profile";
import { useHotkey } from "./hooks/useHotkey";
import { useScrollSpy } from "./hooks/useScrollSpy";
import { useSpotlight } from "./hooks/useSpotlight";
import { copyText, downloadFile, scrollTo } from "./utils/dom";

export default function App() {
  const rootRef = useRef(null);
  const [modal, setModal] = useState(null);
  const [palette, setPalette] = useState(false);
  const [toast, setToast] = useState("");
  const [workFilter, setWorkFilter] = useState("All");
  const { progress, active } = useScrollSpy(SECTIONS);
  useSpotlight(rootRef);
  useHotkey("k", () => setPalette((p) => !p));

  const showIndustry = (industry) => { setWorkFilter(industry); scrollTo("work"); };
  const showToast = (m) => { setToast(m); setTimeout(() => setToast(""), 2200); };

  const actions = [
    ...SECTIONS.map((s) => ({ label: `Go to ${s.label}`, group: "Navigate", icon: ArrowRight, run: () => scrollTo(s.id) })),
    { label: "Start a project", group: "Action", icon: Rocket, run: () => scrollTo("contact") },
    { label: "Play the live bidding demo", group: "Action", icon: Gavel, run: () => scrollTo("demo") },
    { label: "Copy email address", group: "Action", icon: Copy, run: async () => { await copyText(PROFILE.email); showToast("Email copied"); } },
    ...(PROFILE.resume ? [{ label: "Download CV", group: "Action", icon: Download, run: () => downloadFile(PROFILE.resume) }] : []),
    { label: "Open GitHub", group: "Link", icon: Github, run: () => window.open(PROFILE.github, "_blank") },
    { label: "Open LinkedIn", group: "Link", icon: Linkedin, run: () => window.open(PROFILE.linkedin, "_blank") },
  ];

  return (
    <div ref={rootRef} className="relative min-h-screen bg-black text-zinc-200 font-sans antialiased overflow-x-hidden">
      <a href="#services" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-lime-300 focus:text-black">Skip to content</a>
      <Background progress={progress} />
      <Navbar active={active} scrolled={progress > 2} onNavigate={scrollTo} onOpenPalette={() => setPalette(true)} />

      <main className="relative z-10">
        <Hero onOpen={setModal} onIndustry={showIndustry} />
        <Services />
        <Work onOpen={setModal} filter={workFilter} onFilter={setWorkFilter} />
        <Experience onOpen={setModal} />
        <Process />
        <LiveAuction />
        <Contact onToast={showToast} />
      </main>

      <Footer onNavigate={scrollTo} />

      {progress > 12 && <BackToTop onClick={() => scrollTo("home")} />}
      <Toast message={toast} />
      <ProjectModal project={modal} onClose={() => setModal(null)} />
      <CommandPalette open={palette} onClose={() => setPalette(false)} actions={actions} />
    </div>
  );
}
