import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/i18n";
import {
  aboutParagraphs,
  certificates,
  languages,
  profile,
  skillsUsed,
} from "@/content/profile";
import { projects } from "@/content/projects";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/resume")({
  head: () =>
    seo(
      "Resume — Ali Armani",
      "Résumé summary for Ali Armani: projects, technologies, certifications and languages, with a PDF download.",
      "/resume",
    ),
  component: Resume,
});

function Resume() {
  const { t, l } = useI18n();
  const [pdf, setPdf] = useState<"checking" | "ok" | "missing">("checking");
  useEffect(() => {
    fetch(profile.resumeUrl, { method: "HEAD" })
      .then((r) =>
        setPdf(
          r.ok && (r.headers.get("content-type") ?? "").includes("pdf")
            ? "ok"
            : "missing",
        ),
      )
      .catch(() => setPdf("missing"));
  }, []);

  const Row = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <section className="grid gap-4 border-b py-8 md:grid-cols-12">
      <h2 className="label-mono md:col-span-3">{title}</h2>
      <div className="md:col-span-9">{children}</div>
    </section>
  );

  return (
    <div className="container-page pt-16">
      <p className="label-mono text-primary">{t.resume.kicker}</p>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-6 border-b border-foreground pb-8">
        <h1 className="text-hero">{t.resume.title}</h1>
        {pdf === "ok" ? (
          <a
            href={profile.resumeUrl}
            download
            className="bg-primary px-5 py-3 font-medium text-primary-foreground hover:bg-foreground"
          >
            {t.resume.download} ↓
          </a>
        ) : pdf === "missing" ? (
          <p
            role="status"
            className="max-w-sm border border-dashed p-4 text-sm text-muted-foreground"
          >
            {t.resume.missing}{" "}
            <a
              className="text-primary underline"
              href={`mailto:${profile.email}`}
            >
              {profile.email}
            </a>
          </p>
        ) : null}
      </div>
      <Row title={t.resume.intro}>
        <p className="max-w-2xl text-lg">{l(aboutParagraphs[0]!)}</p>
      </Row>
      <Row title={t.resume.highlights}>
        <ul className="space-y-3">
          {projects.map((p) => (
            <li key={p.slug}>
              <Link
                to="/work/$slug"
                params={{ slug: p.slug }}
                className="font-medium hover:text-primary"
              >
                {p.name}
              </Link>
              <span className="text-muted-foreground"> — {l(p.summary)}</span>
            </li>
          ))}
        </ul>
      </Row>
      <Row title={t.resume.tech}>
        <p>{skillsUsed.map((s) => s.name).join(" · ")}</p>
      </Row>
      <Row title={t.resume.certs}>
        <p>{certificates.map((c) => c.title).join(" · ")}</p>
      </Row>
      <Row title={t.resume.langs}>
        <p>{languages.map((lg) => `${l(lg.name)} ${lg.level}`).join(" · ")}</p>
      </Row>
    </div>
  );
}
