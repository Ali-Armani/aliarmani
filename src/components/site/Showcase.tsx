import { Link } from "@tanstack/react-router";
import { projects } from "@/content/projects";
import { shots } from "@/content/media";
import { useI18n } from "@/i18n/i18n";
import { ExternalLink } from "./Layout";
import { BrowserFrame, PhoneFrame } from "./Frames";
import { Tags } from "./ProjectIndex";
import { Reveal } from "./Reveal";

export function FlagshipShowcase() {
  const { t, l } = useI18n();
  const p = projects[0]!;
  const s = shots[p.slug]!;
  return (
    <section aria-labelledby="flagship" className="section-ink mt-24 overflow-hidden py-20 md:py-28">
      <div className="container-page">
        <div className="grid gap-6 md:grid-cols-12">
          <p className="label-mono text-primary-soft md:col-span-3">01 / {t.more.flagKicker}</p>
          <h2 id="flagship" className="text-mega md:col-span-9">4Kids<span className="text-primary-soft">.</span>store</h2>
        </div>

        <Reveal className="relative mt-14 md:pr-24">
          <BrowserFrame src={s.src} url={p.live} alt={`4Kids Store — ${t.more.shot}`} className="tilt-left" />
          {s.mobile && (
            <PhoneFrame src={s.mobile} alt={`4Kids Store mobile — ${t.more.shot}`} className="absolute -bottom-10 right-0 hidden w-44 md:block lg:w-52" />
          )}
          <p className="label-mono mt-4 opacity-60">{t.more.desktop} / {t.more.mobile}</p>
        </Reveal>

        <div className="mt-20 grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <h3 className="label-mono text-primary-soft">{t.more.problem}</h3>
            <p className="mt-3 text-2xl leading-snug">{t.more.problemBody}</p>
            <h3 className="label-mono mt-10 text-primary-soft">{t.more.approach}</h3>
            <p className="mt-3 text-2xl leading-snug">{t.more.approachBody}</p>
          </Reveal>
          <Reveal className="md:col-span-6 md:col-start-7" delay={100}>
            <div className="grid gap-px border border-current/15 bg-current/15 sm:grid-cols-2">
              <div className="section-ink p-6">
                <h3 className="label-mono flex items-center gap-2"><span aria-hidden>●</span> {t.more.done}</h3>
                <ul className="mt-4 space-y-2 opacity-90">{t.more.doneItems.map((d) => <li key={d}>✓ {d}</li>)}</ul>
              </div>
              <div className="section-ink p-6">
                <h3 className="label-mono flex items-center gap-2 text-primary-soft"><span aria-hidden>◐</span> {t.more.wip}</h3>
                <ul className="mt-4 space-y-2 opacity-90">{t.more.wipItems.map((d) => <li key={d}>→ {d}</li>)}</ul>
              </div>
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-sm opacity-80">
              {p.stackGroups!.flatMap((g) => g.items).map((i) => <li key={i}>{i}</li>)}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <ExternalLink href={p.live} className="btn-signal">{t.work.live} ↗</ExternalLink>
              <Link to="/work/$slug" params={{ slug: p.slug }} className="btn-ghost-light">{t.work.case} →</Link>
            </div>
            <p className="sr-only">{l(p.summary)}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function ProjectRows() {
  const { t, l } = useI18n();
  return (
    <section aria-labelledby="more-work" className="container-page mt-28">
      <h2 id="more-work" className="sr-only">{t.work.kicker}</h2>
      <ol className="space-y-28">
        {projects.slice(1).map((p, i) => {
          const flip = i % 2 === 1;
          return (
            <li key={p.slug}>
              <Reveal className="grid items-center gap-10 md:grid-cols-12">
                <div className={`relative md:col-span-5 ${flip ? "md:order-2 md:col-start-8" : ""}`}>
                  <span aria-hidden className="ghost-num">{String(i + 2).padStart(2, "0")}</span>
                  <PhoneFrame src={shots[p.slug]!.src} alt={`${p.name} — ${t.more.shot}`} className={`relative mx-auto w-56 md:w-64 ${flip ? "tilt-right" : "tilt-left"}`} />
                </div>
                <div className={`md:col-span-6 ${flip ? "md:order-1" : "md:col-start-7"}`}>
                  <p className="label-mono text-primary">{String(i + 2).padStart(2, "0")} / {l(p.category)}</p>
                  <h3 className="text-section mt-3">
                    <Link to="/work/$slug" params={{ slug: p.slug }} className="hover:text-primary">{p.name}</Link>
                  </h3>
                  <p className="mt-4 max-w-md text-lg text-muted-foreground">{l(p.summary)}</p>
                  <ul className="mt-5 max-w-md space-y-1.5 border-l-2 border-primary pl-4 text-sm">
                    {(p.sections.find((s) => s.key === "features")?.items ?? []).slice(0, 3).map((f, n) => <li key={n}>{l(f)}</li>)}
                  </ul>
                  <div className="mt-6"><Tags items={p.tags} /></div>
                  <div className="mt-6 flex flex-wrap gap-5 text-sm font-medium">
                    <Link to="/work/$slug" params={{ slug: p.slug }} className="underline decoration-primary decoration-2 underline-offset-4 hover:text-primary">{t.work.case} →</Link>
                    <ExternalLink href={p.live} className="text-muted-foreground hover:text-foreground">{t.work.live} ↗</ExternalLink>
                  </div>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export function Timeline() {
  const { t } = useI18n();
  return (
    <section aria-labelledby="timeline" className="container-page mt-28">
      <div className="grid gap-6 rule-top pt-5 md:grid-cols-12">
        <p className="label-mono text-muted-foreground md:col-span-3"><span className="text-primary">→</span> {t.more.timeline}</p>
        <h2 id="timeline" className="text-section md:col-span-9">{t.more.timelineTitle}</h2>
      </div>
      <ol className="mt-12 grid gap-px bg-border md:grid-cols-5">
        {t.more.steps.map((s, i) => (
          <li key={s.k} className={`bg-background p-5 ${i === t.more.steps.length - 1 ? "md:bg-primary md:text-primary-foreground" : ""}`}>
            <span className="label-mono opacity-70">{String(i + 1).padStart(2, "0")} · {s.k}</span>
            <h3 className="mt-8 font-display text-xl font-semibold leading-tight">{s.t}</h3>
            <p className="mt-2 text-sm opacity-75">{s.d}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
