import { Link } from "@tanstack/react-router";
import { projects } from "@/content/projects";
import { useI18n } from "@/i18n/i18n";
import { ExternalLink } from "./Layout";

export function Tags({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((t) => (
        <li key={t} className="label-mono border px-2 py-1 text-muted-foreground">{t}</li>
      ))}
    </ul>
  );
}

export function ProjectIndex() {
  const { t, l } = useI18n();
  return (
    <ol className="mt-10">
      {projects.map((p, i) => (
        <li key={p.slug} className={`group grid gap-4 border-b py-8 md:grid-cols-12 md:items-baseline ${p.featured ? "md:py-12" : ""}`}>
          <span className="label-mono text-primary md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
          <div className="md:col-span-5">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className={`font-display font-semibold tracking-tight ${p.featured ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl"}`}>
                <Link to="/work/$slug" params={{ slug: p.slug }} className="transition-colors group-hover:text-primary">
                  {p.name}
                </Link>
              </h3>
              {p.featured && <span className="label-mono bg-primary px-2 py-1 text-primary-foreground">{t.work.featured}</span>}
            </div>
            <p className="label-mono mt-2 text-muted-foreground">{l(p.category)}{p.realClient ? ` · ${t.work.realClient}` : ""}</p>
          </div>
          <div className="space-y-4 md:col-span-6">
            <p className="max-w-lg text-muted-foreground">{l(p.summary)}</p>
            <Tags items={p.tags} />
            <div className="flex flex-wrap gap-5 text-sm font-medium">
              <Link to="/work/$slug" params={{ slug: p.slug }} className="underline decoration-primary decoration-2 underline-offset-4 hover:text-primary">
                {t.work.case} →
              </Link>
              <ExternalLink href={p.live} className="text-muted-foreground hover:text-foreground">{t.work.live} ↗</ExternalLink>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
