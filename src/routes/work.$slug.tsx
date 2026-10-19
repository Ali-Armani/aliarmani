import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useI18n } from "@/i18n/i18n";
import { getProject, projects } from "@/content/projects";
import { ExternalLink } from "@/components/site/Layout";
import { Tags } from "@/components/site/ProjectIndex";
import { shots } from "@/content/media";
import { BrowserFrame, PhoneFrame } from "@/components/site/Frames";
import { profile } from "@/content/profile";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { slug: project.slug };
  },
  head: ({ params }) => {
    const p = getProject(params.slug);
    return seo(
      p ? `${p.name} — Case study · Ali Armani` : "Project — Ali Armani",
      p?.summary.en ?? "Project case study",
      `/work/${params.slug}`,
      "article",
    );
  },
  component: CaseStudy,
});

function CaseStudy() {
  const { slug } = Route.useLoaderData();
  const { t, l } = useI18n();
  const p = getProject(slug)!;
  const idx = projects.findIndex((x) => x.slug === slug);
  const next = projects[(idx + 1) % projects.length]!;
  const labels: Record<string, string> = {
    context: t.cs.context,
    architecture: t.cs.architecture,
    decisions: t.cs.decisions,
    security: t.cs.security,
    payment: t.cs.payment,
    lessons: t.cs.lessons,
    features: t.cs.features,
    demonstrates: t.cs.demonstrates,
    process: t.cs.process,
  };

  return (
    <article className="container-page pt-12">
      <Link
        to="/work"
        className="label-mono text-muted-foreground hover:text-foreground"
      >
        ← {t.cs.back}
      </Link>
      <header className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="label-mono text-primary">
            {String(idx + 1).padStart(2, "0")} / {l(p.category)}
          </p>
          <h1 className="text-hero mt-4">{p.name}</h1>
          {p.realClient && (
            <p className="label-mono mt-4 inline-block bg-foreground px-2 py-1 text-background">
              {t.work.realClient}
            </p>
          )}
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            {l(p.summary)}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <ExternalLink
              href={p.live}
              className="bg-primary px-5 py-3 font-medium text-primary-foreground hover:bg-foreground"
            >
              {t.work.live} ↗
            </ExternalLink>
            <ExternalLink
              href={"https://github.com/Ali-Armani"}
              className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              {t.cs.sourceNote}
            </ExternalLink>
          </div>
        </div>
        <div className="lg:col-span-5">
          {p.slug === "4kids" ? (
            <BrowserFrame
              src={shots[p.slug]!.src}
              url={p.live}
              alt={`${p.name} screenshot`}
              className="tilt-left"
            />
          ) : (
            <PhoneFrame
              src={shots[p.slug]!.src}
              alt={`${p.name} screenshot`}
              className="tilt-right mx-auto w-60"
            />
          )}
          <div className="mt-8">
            <Tags items={p.tags} />
          </div>
        </div>
      </header>

      <section className="mt-20 grid gap-6 rule-top pt-5 md:grid-cols-12">
        <h2 className="label-mono md:col-span-3">{t.cs.overview}</h2>
        <p className="text-xl leading-relaxed md:col-span-8">{l(p.overview)}</p>
      </section>

      {p.slug === "4kids" && <DataFlow label={t.cs.architecture} />}

      {p.stackGroups && (
        <section className="mt-16 grid gap-6 rule-top pt-5 md:grid-cols-12">
          <h2 className="label-mono md:col-span-3">{t.cs.stack}</h2>
          <div className="grid gap-6 sm:grid-cols-3 md:col-span-9">
            {p.stackGroups.map((g) => (
              <div key={g.label.en}>
                <h3 className="label-mono mb-3 text-muted-foreground">
                  {l(g.label)}
                </h3>
                <ul className="space-y-1.5">
                  {g.items.map((i) => (
                    <li key={i} className="border-b pb-1.5">
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {p.sections.map((s) => (
        <section
          key={s.key}
          className="mt-16 grid gap-6 rule-top pt-5 md:grid-cols-12"
        >
          <h2 className="label-mono flex items-center gap-2 md:col-span-3">
            {labels[s.key]}
            {s.key === "payment" && (
              <span className="border border-primary px-1.5 py-0.5 text-primary">
                {t.cs.inProgress}
              </span>
            )}
          </h2>
          <ol className="md:col-span-9">
            {s.items.map((it, i) => (
              <li key={i} className="grid grid-cols-[2.5rem_1fr] border-b py-4">
                <span className="label-mono pt-1 text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{l(it)}</span>
              </li>
            ))}
          </ol>
        </section>
      ))}

      {p.slug === "vocab-bridge" && (
        <section className="mt-16 grid gap-6 rule-top pt-5 md:grid-cols-12">
          <h2 className="label-mono md:col-span-3">RTL / LTR</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:col-span-9">
            <p dir="rtl" lang="fa" className="border p-5 text-lg">
              کلمه‌ی <bdi lang="en">Bridge</bdi> یعنی پل — درس <bdi>12</bdi>
            </p>
            <p dir="ltr" lang="en" className="border p-5 text-lg">
              The word <bdi lang="fa">پل</bdi> means bridge — lesson 12
            </p>
          </div>
        </section>
      )}

      <Link
        to="/work/$slug"
        params={{ slug: next.slug }}
        className="group mt-24 block rule-top pt-6"
      >
        <span className="label-mono text-muted-foreground">{t.cs.next}</span>
        <span className="mt-2 block font-display text-4xl font-semibold group-hover:text-primary md:text-6xl">
          {next.name} →
        </span>
      </Link>
    </article>
  );
}

function DataFlow({ label }: { label: string }) {
  const nodes = [
    ["PostgreSQL", "constraints · RLS"],
    ["Typed data layer", "row → domain model"],
    ["React Context", "catalogue loaded once"],
    ["UI", "?page=n validated"],
  ];
  return (
    <section className="mt-16 rule-top pt-5" aria-label={label}>
      <ol className="grid gap-px border bg-border md:grid-cols-4">
        {nodes.map(([a, b], i) => (
          <li key={a} className="relative bg-card p-5">
            <span className="label-mono text-primary">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="mt-6 font-display text-xl font-semibold">{a}</p>
            <p className="label-mono mt-1 text-muted-foreground">{b}</p>
            {i < nodes.length - 1 && (
              <span
                aria-hidden
                className="absolute -right-2 top-1/2 z-10 hidden bg-primary px-1 text-primary-foreground md:block"
              >
                →
              </span>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
