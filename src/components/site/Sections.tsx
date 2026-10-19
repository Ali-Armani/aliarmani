import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/i18n";
import {
  aboutParagraphs,
  certificates,
  languages,
  profile,
  skillsLearning,
  skillsUsed,
  softSkills,
} from "@/content/profile";
import { projects } from "@/content/projects";
import { ExternalLink, SectionHead } from "./Layout";

export function SkillsSection({ index = "03" }: { index?: string }) {
  const { t } = useI18n();
  const name = (slug: string) =>
    projects.find((p) => p.slug === slug)?.name ?? slug;
  return (
    <section aria-labelledby="skills" className="container-page mt-28">
      <SectionHead
        index={index}
        kicker={t.skills.kicker}
        title={t.skills.title}
        intro={t.skills.note}
      />
      <div className="mt-10 grid gap-10 md:grid-cols-12">
        <div className="md:col-span-8">
          <h3 id="skills" className="label-mono mb-4">
            {t.skills.used}
          </h3>
          <dl className="grid border-l border-t sm:grid-cols-2">
            {skillsUsed.map((s) => (
              <div key={s.name} className="border-b border-r p-4">
                <dt className="font-medium">{s.name}</dt>
                <dd className="label-mono mt-1 text-muted-foreground">
                  {s.where.length
                    ? `${t.skills.usedIn}: ${s.where.map(name).join(", ")}`
                    : "Design · UI planning"}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="md:col-span-4">
          <h3 className="label-mono mb-4">{t.skills.learning}</h3>
          <ul className="space-y-2">
            {skillsLearning.map((s) => (
              <li
                key={s}
                className="flex items-center gap-3 border border-dashed border-primary/60 px-4 py-3"
              >
                <span
                  aria-hidden
                  className="h-2 w-2 rounded-full border border-primary"
                />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function AboutBlock({ full = false }: { full?: boolean }) {
  const { t, l } = useI18n();
  const paras = full ? aboutParagraphs : aboutParagraphs.slice(0, 2);
  return (
    <section className="container-page mt-28">
      <SectionHead index="02" kicker={t.about.kicker} title={t.about.title} />
      <div className="mt-10 grid gap-6 md:grid-cols-12">
        <div className="space-y-5 text-lg leading-relaxed md:col-span-7 md:col-start-4">
          {paras.map((p, i) => (
            <p
              key={i}
              className={i === 0 ? "text-foreground" : "text-muted-foreground"}
            >
              {l(p)}
            </p>
          ))}
          {!full && (
            <Link
              to="/about"
              className="inline-block text-base font-medium underline decoration-primary decoration-2 underline-offset-4"
            >
              {t.nav.about} →
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export function SoftSkillsSection() {
  const { t, l } = useI18n();
  return (
    <section className="container-page mt-28">
      <SectionHead
        index="03"
        kicker={t.about.soft}
        title={t.about.soft}
        intro={t.about.softIntro}
      />
      <ol className="mt-10 grid gap-x-10 md:grid-cols-2">
        {softSkills.map((s, i) => (
          <li key={i} className="grid grid-cols-[3rem_1fr] border-b py-6">
            <span className="label-mono text-primary">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="font-display text-xl font-semibold">
                {l(s.title)}
              </h3>
              <p className="mt-1 text-muted-foreground">{l(s.proof)}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function LanguagesSection() {
  const { t, l } = useI18n();
  const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
  return (
    <section className="container-page mt-28">
      <SectionHead
        index="04"
        kicker={t.about.languages}
        title={t.about.languages}
        intro={t.about.langNote}
      />
      <ul className="mt-10 space-y-8 md:pl-[25%]">
        {languages.map((lg) => (
          <li key={lg.level}>
            <div className="flex items-baseline justify-between">
              <span className="font-display text-2xl font-semibold">
                {l(lg.name)}
              </span>
              <span className="label-mono">CEFR {lg.level}</span>
            </div>
            <ol
              className="mt-3 grid grid-cols-6 gap-1"
              aria-label={`CEFR ${lg.level}`}
            >
              {levels.map((lv, i) => (
                <li
                  key={lv}
                  className={`label-mono border py-1 text-center ${i < lg.step ? "border-foreground bg-foreground text-background" : "text-muted-foreground"}`}
                >
                  {lv}
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function CertificatesSection() {
  const { t } = useI18n();
  return (
    <section className="container-page mt-28">
      <SectionHead
        index="05"
        kicker={t.about.certs}
        title={t.about.certs}
        intro={t.about.certsIntro}
      />
      <ul className="mt-10 grid gap-px border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((c) => (
          <li key={c.title} className="bg-background">
            <ExternalLink
              href={c.url}
              className="group flex h-full flex-col justify-between gap-10 p-6 transition-colors hover:bg-card"
            >
              <span className="label-mono text-muted-foreground">
                Maktabkhooneh
              </span>
              <span className="flex items-end justify-between">
                <span className="font-display text-2xl font-semibold">
                  {c.title}
                </span>
                <span className="text-sm text-primary group-hover:underline">
                  {t.about.verify} ↗
                </span>
              </span>
            </ExternalLink>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ContactSection() {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);
  return (
    <section aria-labelledby="contact-title" className="container-page mt-28">
      <div className="bg-foreground p-8 text-background md:p-14">
        <p className="label-mono text-background/60">{t.contact.kicker}</p>
        <h2 id="contact-title" className="text-hero mt-4 max-w-3xl">
          {t.contact.title}
        </h2>
        <p className="mt-6 max-w-xl text-lg text-background/75">
          {t.contact.body}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="bg-primary px-5 py-3 font-medium text-primary-foreground transition-colors hover:bg-background hover:text-foreground"
          >
            {t.contact.primary}
          </a>
          <button
            type="button"
            onClick={() =>
              navigator.clipboard
                ?.writeText(profile.email)
                .then(() => setCopied(true))
            }
            className="border border-background/40 px-5 py-3 font-medium hover:border-background"
          >
            <span aria-live="polite">
              {copied ? t.contact.copied : t.contact.copy}
            </span>
          </button>
        </div>
        <ul className="mt-12 grid gap-px border-t border-background/20 sm:grid-cols-2 lg:grid-cols-4">
          {profile.links.map((lnk) => (
            <li key={lnk.label} className="pt-5">
              <ExternalLink href={lnk.href} className="group block">
                <span className="label-mono text-background/60">
                  {lnk.label}
                </span>
                <span className="mt-1 block break-all group-hover:underline">
                  {lnk.handle}
                </span>
              </ExternalLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
