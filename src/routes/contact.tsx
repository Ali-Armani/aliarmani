import { createFileRoute } from "@tanstack/react-router";
import { ContactSection } from "@/components/site/Sections";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    seo(
      "Contact — Ali Armani",
      "Get in touch with Ali Armani by email, LinkedIn, GitHub or Telegram for freelance and remote opportunities.",
      "/contact",
    ),
  component: () => (
    <div className="pt-4">
      <ContactSection />
    </div>
  ),
});
