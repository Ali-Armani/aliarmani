import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/i18n/i18n";
import { ProjectIndex } from "@/components/site/ProjectIndex";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/work/")({
  head: () =>
    seo(
      "Work — Ali Armani",
      "Selected projects by Ali Armani: the 4Kids full-stack e-commerce platform, Weather Forecast, Vocab Bridge, TaskFlow and more.",
      "/work",
    ),
  component: Work,
});

function Work() {
  const { t } = useI18n();
  return (
    <div className="container-page pt-16">
      <p className="label-mono text-primary">01 / {t.work.kicker}</p>
      <h1 className="text-hero mt-4">{t.work.title}</h1>
      <p className="mt-4 max-w-xl text-lg text-muted-foreground">
        {t.work.intro}
      </p>
      <div className="rule-top mt-12" />
      <ProjectIndex />
    </div>
  );
}
