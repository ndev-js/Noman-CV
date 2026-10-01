import Reveal from "../../ui/Reveal";
import SectionHead from "../../ui/SectionHead";
import BriefBuilder from "./BriefBuilder";
import ContactDetails from "./ContactDetails";
import Faq from "./Faq";

export default function Contact({ onToast }) {
  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 py-28 scroll-mt-20">
      <SectionHead kicker="Let's work together" title="Have a project in mind?" sub="Pick what you need below — it takes 30 seconds and turns into a ready-to-send brief." />
      <div className="grid lg:grid-cols-5 gap-6">
        <Reveal className="lg:col-span-3"><BriefBuilder onToast={onToast} /></Reveal>
        <Reveal delay={120} className="lg:col-span-2 space-y-6">
          <ContactDetails onToast={onToast} />
          <Faq />
        </Reveal>
      </div>
    </section>
  );
}
