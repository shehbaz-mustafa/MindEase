import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/Badge";
import { CATEGORY_LABELS } from "@/lib/assessment/scoring";
import { getRecommendations } from "@/lib/assessment/recommendations";
import { RESOURCES } from "@/lib/resources";

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

const CATEGORY_TONE: Record<string, "sage" | "primary" | "danger"> = {
  thriving: "sage",
  steady: "primary",
  needs_support: "danger",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ data: profile }, { data: assessments }] = await Promise.all([
    supabase.from("profiles").select("full_name").eq("id", user?.id).single(),
    supabase
      .from("assessments")
      .select("id, score, category, breakdown, completed_at, overall_score, assessment_name, created_at")
      .eq("user_id", user?.id)
      .order("created_at", { ascending: false })
      .limit(1),
  ]);

  const latest = assessments?.[0];
  const firstName = profile?.full_name?.split(" ")[0];

  const overallScore = latest?.overall_score ?? latest?.score ?? 0;
  const categoryTone = latest?.category ? CATEGORY_TONE[latest.category] ?? "sage" : "sage";
  const rawDate = latest?.created_at || latest?.completed_at || new Date().toISOString();

  const breakdownEntries = latest?.breakdown
    ? Object.entries(latest.breakdown as Record<string, unknown>).filter(
        (entry): entry is [string, number] => typeof entry[1] === "number"
      )
    : [];
  const recommendations = breakdownEntries.length > 0
    ? getRecommendations(breakdownEntries.map(([category, score]) => ({ category, score })))
    : [];

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          {greeting()}
          {firstName ? `, ${firstName}` : ""}.
        </h1>
        <p className="mt-1.5 max-w-xl text-sm sm:text-base text-slate-600">
          Take a moment for yourself today. Here&apos;s a snapshot of your well-being journey and
          some gentle recommendations.
        </p>
      </div>

      {!latest ? (
        <div className="flex flex-col items-start gap-4 rounded-3xl border border-dashed border-primary/30 bg-primary-light/40 p-6 sm:p-8">
          <span aria-hidden="true" className="h-1 w-12 bg-sage-dark" />
          <div>
            <h2 className="font-display text-lg font-semibold text-ink sm:text-xl">
              Take a psychological assessment
            </h2>
            <p className="mt-1 max-w-md text-xs sm:text-sm text-slate-600 leading-relaxed">
              Explore your emotions, stress management, and well-being through our carefully designed assessments. 
              Each takes just a few minutes and provides personalized insights.
            </p>
          </div>
          <Link
            href="/assessments"
            className="w-full rounded-lg bg-primary px-6 py-2.5 text-center text-sm font-medium text-white shadow-xs transition-colors hover:bg-primary-dark sm:w-auto"
          >
            Explore assessments →
          </Link>
        </div>
      ) : (
        <div className="rounded-3xl border border-border bg-white p-5 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Badge tone={categoryTone}>
                Latest check-in ·{" "}
                {new Date(rawDate).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })}
              </Badge>
              <h2 className="mt-2.5 font-display text-xl font-semibold text-ink sm:text-2xl">
                {latest.assessment_name ? latest.assessment_name : "Overall well-being"}: {overallScore}/100
              </h2>
            </div>
            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3">
              <Link
                href={`/results/${latest.id}`}
                className="w-full rounded-lg border border-primary/30 px-5 py-2.5 text-center text-sm font-medium text-primary transition-colors hover:bg-primary-light sm:w-auto"
              >
                View full results
              </Link>
              <Link
                href="/assessments"
                className="w-full rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-primary-dark sm:w-auto"
              >
                New assessment
              </Link>
            </div>
          </div>

          {breakdownEntries.length > 0 && (
            <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-6">
              {breakdownEntries.map(([category, score]) => (
                <div key={category} className="rounded-2xl bg-cream px-3 py-3 text-center">
                  <p className="font-display text-base font-semibold text-ink sm:text-lg">{score}</p>
                  <p className="text-xs text-muted truncate">
                    {CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS] || category}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {recommendations.length > 0 && (
        <section>
          <h2 className="font-display text-lg font-semibold text-ink sm:text-xl">Recommended for you</h2>
          <div className="mt-3 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3 sm:mt-4">
            {recommendations.map((rec) => (
              <Link
                key={rec.title}
                href={rec.href}
                className="flex flex-col gap-2 rounded-2xl border border-border bg-white p-5 shadow-sm transition-colors hover:border-primary/40"
              >
                <h3 className="font-display text-sm font-semibold text-ink">{rec.title}</h3>
                <p className="text-sm text-slate-600">{rec.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-ink sm:text-xl">Explore resources</h2>
          <Link href="/resources" className="text-xs sm:text-sm font-medium text-primary hover:underline">
            View all
          </Link>
        </div>
        <div className="mt-3 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3 sm:mt-4">
          {RESOURCES.slice(0, 3).map((resource) => (
            <div
              key={resource.slug}
              className="flex flex-col gap-2 rounded-2xl border border-border bg-white p-5 shadow-sm"
            >
              <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wide text-sage-dark">
                {resource.type}
              </span>
              <h3 className="font-display text-sm font-semibold text-ink">{resource.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600">{resource.description}</p>
              <span className="mt-auto pt-2 text-xs text-muted">{resource.duration}</span>
            </div>
          ))}
        </div>
      </section>

      <Link
        href="/support"
        className="flex items-center justify-between rounded-2xl border border-border bg-white p-5 shadow-sm hover:border-primary/40 sm:px-6 sm:py-4 transition-colors"
      >
        <div>
          <p className="font-display text-sm font-semibold text-ink">Need to talk to someone?</p>
          <p className="text-xs sm:text-sm text-muted">Find crisis resources and professional support.</p>
        </div>
        <span className="text-primary text-lg">→</span>
      </Link>
    </div>
  );
}
