import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "../styles.css?url";
import { I18nProvider, useI18n } from "@/i18n/i18n";
import { SiteFooter, SiteHeader } from "@/components/site/Layout";

function NotFoundComponent() {
  const { t } = useI18n();
  return (
    <div className="container-page py-32">
      <p className="label-mono text-primary">404</p>
      <h1 className="text-hero mt-4">{t.notFound}</h1>
      <Link
        to="/"
        className="mt-8 inline-block bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
      >
        Home →
      </Link>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="container-page py-32">
      <h1 className="text-section">Something broke on this page</h1>
      <p className="mt-2 text-muted-foreground">
        An unexpected error occurred. Reload the page or go back to the start.
      </p>
      <div className="mt-6 flex gap-2">
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Reload
        </button>
        <a href="/" className="border px-4 py-2 text-sm font-medium">
          Back to start
        </a>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    head: () => ({
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "author", content: "Ali Armani" },
        { name: "theme-color", content: "#f7f4ee" },
        { property: "og:site_name", content: "Ali Armani — Web Developer" },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossOrigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600&family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Vazirmatn:wght@400;600&display=swap",
        },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Ali Armani",
            jobTitle: "Web Developer",
            email: "mailto:armani.ali@proton.me",
            sameAs: [
              "https://github.com/Ali-Armani",
              "https://linkedin.com/in/aliarmani",
              "https://t.me/ali_armani_dev",
            ],
          }),
        },
      ],
    }),
    shellComponent: RootShell,
    component: RootComponent,
    notFoundComponent: NotFoundComponent,
    errorComponent: ErrorComponent,
  },
);

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <SiteHeader />
        <main id="main">
          <Outlet />
        </main>
        <SiteFooter />
      </I18nProvider>
    </QueryClientProvider>
  );
}
