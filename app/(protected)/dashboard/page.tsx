import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/Badge";
import { CATEGORY_LABELS, type Category } from "@/lib/assessment/scoring";
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
      .select("id, score, category, breakdown, completed_at")
      .eq("user_id", user?.id)
      .order("completed_at", { ascending: false })
      .limit(1),
  ]);

  const latest = assessments?.[0];
  const firstName = profile?.full_name?.split(" ")[0];

  const breakdownEntries = latest
    ? (Object.entries(latest.breakdown as Record<string, number>) as [Category, number][])
    : [];
  const recommendations = latest
    ? getRecommendations(breakdownEntries.map(([category, score]) => ({ category, score })))
    : [];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-3xl font-semibold text-ink">
          {greeting()}
          {firstName ? `, ${firstName}` : ""}.
        </h1>
        <p className="mt-2 max-w-xl text-slate-600">
          Take a moment for yourself today. Here&apos;s a snapshot of your well-being journey and
          some gentle recommendations.
        </p>
      </div>

      {!latest ? (
        <div className="flex flex-col items-start gap-4 rounded-3xl border border-dashed border-primary/30 bg-primary-light/40 p-8">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl">
            🌱
          </span>
          <div>
            <h2 className="font-display text-xl font-semibold text-ink">
              Take your first check-in
            </h2>
            <p className="mt-1 max-w-md text-sm text-slate-600">
              A quick, private well-being check-in helps MindEase understand how you&apos;re doing
              and offer recommendations that actually fit you.
            </p>
          </div>
          <Link
            href="/assessment"
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-primary-dark"
          >
            Start check-in →
          </Link>
        </div>
      ) : (
        <div className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <Badge tone={CATEGORY_TONE[latest.category] ?? "sage"}>
                Latest check-in ·{" "}
                {new Date(latest.completed_at).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })}
              </Badge>
              <h2 className="mt-3 font-display text-2xl font-semibold text-ink">
                Overall well-being: {latest.score}/100
              </h2>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/results/${latest.id}`}
                className="rounded-full border border-primary/30 px-5 py-2.5 text-sm font-medium text-primary hover:bg-primary-light"
              >
                View full results
              </Link>
              <Link
                href="/assessment"
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-dark"
              >
                New check-in
              </Link>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
            {breakdownEntries.map(([category, score]) => (
              <div key={category} className="rounded-2xl bg-cream px-3 py-3 text-center">
                <p className="font-display text-lg font-semibold text-ink">{score}</p>
                <p className="text-xs text-muted">{CATEGORY_LABELS[category]}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {recommendations.length > 0 && (
        <section>
          <h2 className="font-display text-xl font-semibold text-ink">Recommended for you</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
          <h2 className="font-display text-xl font-semibold text-ink">Explore resources</h2>
          <Link href="/resources" className="text-sm font-medium text-primary hover:underline">
            View all
          </Link>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RESOURCES.slice(0, 3).map((resource) => (
            <div
              key={resource.slug}
              className="flex flex-col gap-2 rounded-2xl border border-border bg-white p-5 shadow-sm"
            >
              <span className="text-xs font-medium uppercase tracking-wide text-sage-dark">
                {resource.type}
              </span>
              <h3 className="font-display text-sm font-semibold text-ink">{resource.title}</h3>
              <p className="text-sm text-slate-600">{resource.description}</p>
              <span className="mt-auto text-xs text-muted">{resource.duration}</span>
            </div>
          ))}
        </div>
      </section>

      <Link
        href="/support"
        className="flex items-center justify-between rounded-2xl border border-border bg-white px-6 py-4 shadow-sm hover:border-primary/40"
      >
        <div>
          <p className="font-display text-sm font-semibold text-ink">Need to talk to someone?</p>
          <p className="text-sm text-muted">Find crisis resources and professional support.</p>
        </div>
        <span className="text-primary">→</span>
      </Link>
    </div>
  );
}
