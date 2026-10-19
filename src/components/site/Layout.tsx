import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { useI18n } from "@/i18n/i18n";
import { profile } from "@/content/profile";

export function ExternalLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const { t } = useI18n();
  const isMail = href.startsWith("mailto:");
  return (
    <a
      href={href}
      className={className}
      {...(isMail ? {} : { target: "_blank", rel: "noopener noreferrer" })}
    >
      {children}
      {!isMail && <span className="sr-only"> ({t.work.newTab})</span>}
    </a>
  );
}

export function SectionHead({
  index,
  kicker,
  title,
  intro,
}: {
  index: string;
  kicker: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="grid gap-6 rule-top pt-5 md:grid-cols-12">
      <p className="label-mono text-muted-foreground md:col-span-3">
        <span className="text-primary">{index}</span> / {kicker}
      </p>
      <div className="md:col-span-9">
        <h2 className="text-section max-w-3xl">{title}</h2>
        {intro && (
          <p className="mt-4 max-w-xl text-muted-foreground">{intro}</p>
        )}
      </div>
    </header>
  );
}

export function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n();
  return (
    <div
      role="group"
      aria-label={t.nav.lang}
      className="label-mono flex border border-foreground/80"
    >
      {(["en", "de"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          lang={l}
          className={`px-2 py-1.5 transition-colors ${lang === l ? "bg-foreground text-background" : "hover:bg-secondary"}`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export function SiteHeader() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const items = [
    { to: "/work", label: t.nav.work },
    { to: "/about", label: t.nav.about },
    { to: "/skills", label: t.nav.skills },
    { to: "/resume", label: t.nav.resume },
  ] as const;
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          to="/"
          className="flex items-baseline gap-2"
          onClick={() => setOpen(false)}
        >
          <span className="font-display text-lg font-semibold tracking-tight">
            Ali Armani
          </span>
          <span className="label-mono hidden text-muted-foreground sm:inline">
            {t.hero.role}
          </span>
        </Link>
        <nav
          aria-label={t.nav.main}
          className="hidden items-center gap-7 md:flex"
        >
          {items.map((i) => (
            <Link
              key={i.to}
              to={i.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{
                className:
                  "text-sm text-foreground underline decoration-primary decoration-2 underline-offset-8",
              }}
            >
              {i.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link
            to="/contact"
            className="btn-signal hidden !py-2 text-sm md:inline-block"
          >
            {t.nav.cta}
          </Link>
          <button
            type="button"
            className="label-mono border border-foreground/80 px-2 py-1.5 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="sr-only">{open ? t.nav.close : t.nav.menu}</span>
            <span aria-hidden>{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          aria-label={t.nav.main}
          className="container-page border-t pb-6 md:hidden"
        >
          {[...items, { to: "/contact" as const, label: t.nav.contact }].map(
            (i, n) => (
              <Link
                key={i.to}
                to={i.to}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 border-b py-4 font-display text-2xl"
              >
                <span className="label-mono text-primary">0{n + 1}</span>
                {i.label}
              </Link>
            ),
          )}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="mt-32 border-t">
      <div className="container-page flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} · {t.footer.built}
        </p>
        <ul className="flex flex-wrap gap-5 text-sm">
          {profile.links.map((l) => (
            <li key={l.label}>
              <ExternalLink href={l.href} className="hover:text-primary">
                {l.label}
              </ExternalLink>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
