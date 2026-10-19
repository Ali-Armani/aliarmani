import { createFileRoute } from "@tanstack/react-router";
import { AboutBlock, CertificatesSection, LanguagesSection, SoftSkillsSection } from "@/components/site/Sections";
import { Timeline } from "@/components/site/Showcase";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => seo("About — Ali Armani", "Aspiring frontend developer, former retail professional and English Language Teaching student. Soft skills, languages and certificates.", "/about"),
  component: () => (
    <div className="pt-4">
      <AboutBlock full />
      <Timeline />
      <SoftSkillsSection />
      <LanguagesSection />
      <CertificatesSection />
    </div>
  ),
});
