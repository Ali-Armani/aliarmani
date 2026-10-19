import { createFileRoute } from "@tanstack/react-router";
import { SkillsSection } from "@/components/site/Sections";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/skills")({
  head: () => seo("Skills — Ali Armani", "Technologies Ali Armani has used in completed projects, and what he is currently learning.", "/skills"),
  component: () => <div className="pt-4"><SkillsSection index="01" /></div>,
});
