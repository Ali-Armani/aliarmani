import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n/i18n";
import { FlagshipShowcase, ProjectRows, Timeline } from "@/components/site/Showcase";
import { AboutBlock, ContactSection, SkillsSection } from "@/components/site/Sections";
import { projects } from "@/content/projects";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => seo("Ali Armani — Web Developer", "Frontend developer building responsive, user-focused web experiences with React, TypeScript and PostgreSQL. Open to freelance and remote work.", "/"),
  component: Home,
});

function Home() {
  const { t } = useI18n();
  return (
    <>
      <section className="container-page relative pt-10 md:pt-14">
        <div className="label-mono flex flex-wrap items-center justify-between gap-3 border-b pb-3 text-muted-foreground">
          <span>{t.more.focus}</span>
          <span className="flex items-center gap-2 text-foreground">
            <span aria-hidden className="h-2 w-2 rounded-full bg-signal" /> {t.hero.availability}
          </span>
        </div>

        <h1 className="animate-rise mt-6">
          <span className="sr-only">Ali Armani — {t.hero.role}. </span>
          <span aria-hidden className="text-name block">Ali</span>
          <span aria-hidden className="text-name block md:pl-[16%]">Armani<span className="text-primary">_</span></span>
        </h1>

        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <p className="animate-rise font-display text-2xl font-medium leading-tight md:col-span-6 md:text-3xl" style={{ animationDelay: "120ms" }}>
            {t.hero.headline}
          </p>
          <div className="animate-rise md:col-span-5 md:col-start-8" style={{ animationDelay: "220ms" }}>
            <p className="text-lg text-muted-foreground">{t.hero.sub}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/work" className="btn-signal">{t.hero.primary} →</Link>
              <Link to="/resume" className="btn-outline">{t.more.resume}</Link>
            </div>
          </div>
        </div>

        <nav aria-label={t.more.index} className="mt-16 border-t border-foreground">
          <ol className="grid grid-cols-2 md:grid-cols-5">
            {projects.map((p, i) => (
              <li key={p.slug} className="border-b md:border-b-0 md:border-r last:border-r-0">
                <Link to="/work/$slug" params={{ slug: p.slug }} className="group flex h-full flex-col gap-3 p-3 transition-colors hover:bg-foreground hover:text-background">
                  <span className="label-mono text-primary group-hover:text-primary-soft">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-medium">{p.name}</span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </section>

      <FlagshipShowcase />
      <ProjectRows />
      <AboutBlock />
      <Timeline />
      <SkillsSection index="04" />
      <ContactSection />
    </>
  );
}
