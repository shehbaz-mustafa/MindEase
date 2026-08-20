import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DonutStat } from "@/components/ui/DonutStat";
import { Badge } from "@/components/ui/Badge";
import { CATEGORY_LABELS, categoryStatusLabel, describeOverallScore, type Category } from "@/lib/assessment/scoring";
import { getRecommendations } from "@/lib/assessment/recommendations";

const CATEGORY_TONE: Record<string, "sage" | "primary" | "danger"> = {
  thriving: "sage",
  steady: "primary",
  needs_support: "danger",
};

const CATEGORY_RING_COLOR: Record<string, "primary" | "sage" | "muted"> = {
  thriving: "sage",
  steady: "primary",
  needs_support: "muted",
};

export default async function ResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: assessment } = await supabase
    .from("assessments")
    .select("id, score, category, breakdown, completed_at")
    .eq("id", id)
    .eq("user_id", user?.id)
    .single();

  if (!assessment) {
    notFound();
  }

  const { headline, summary } = describeOverallScore(assessment.score);
  const breakdownEntries = Object.entries(assessment.breakdown as Record<string, number>) as [
    Category,
    number
  ][];
  const recommendations = getRecommendations(
    breakdownEntries.map(([category, score]) => ({ category, score }))
  );
  const needsSupport = assessment.category === "needs_support";

  return (
    <div className="mx-auto max-w-3xl">
      <Badge tone={CATEGORY_TONE[assessment.category] ?? "sage"}>
        {new Date(assessment.completed_at).toLocaleDateString(undefined, {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </Badge>

      <h1 className="mt-3 font-display text-3xl font-semibold text-ink">
        Your Well-being Snapshot
      </h1>
      <p className="mt-2 max-w-xl text-slate-600">
        Here are the results from your latest check-in. Taking time to check in with yourself is
        a wonderful step.
      </p>

      <div className="mt-8 rounded-3xl border border-border bg-gradient-to-br from-sage-light to-white p-6 sm:p-8">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌿</span>
          <h2 className="font-display text-xl font-semibold text-ink">{headline}</h2>
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-700">{summary}</p>
      </div>

      <h2 className="mt-10 font-display text-xl font-semibold text-ink">Detailed insights</h2>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {breakdownEntries.map(([category, score]) => (
          <DonutStat
            key={category}
            label={CATEGORY_LABELS[category]}
            sublabel={categoryStatusLabel(score)}
            percent={score}
            color={CATEGORY_RING_COLOR[assessment.category]}
          />
        ))}
      </div>

      {recommendations.length > 0 && (
        <>
          <h2 className="mt-10 font-display text-xl font-semibold text-ink">
            Suggested next steps
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {recommendations.map((rec) => (
              <Link
                key={rec.title}
                href={rec.href}
                className="flex flex-col gap-2 rounded-2xl border border-border bg-white p-5 shadow-sm hover:border-primary/40"
              >
                <h3 className="font-display text-sm font-semibold text-ink">{rec.title}</h3>
                <p className="text-sm text-slate-600">{rec.description}</p>
              </Link>
            ))}
          </div>
        </>
      )}

      {needsSupport && (
        <div className="mt-10 rounded-2xl border border-danger-accent/30 bg-danger-bg p-6">
          <h3 className="font-display text-sm font-semibold text-danger-text">
            Consider speaking with a professional
          </h3>
          <p className="mt-2 text-sm text-danger-text">
            What you&apos;re carrying sounds like a lot right now. MindEase isn&apos;t a
            replacement for professional support — a counsellor can offer guidance suited to
            your situation.
          </p>
          <Link
            href="/support"
            className="mt-3 inline-block text-sm font-semibold text-danger-text underline"
          >
            Find support →
          </Link>
        </div>
      )}

      <div className="mt-10 flex flex-wrap gap-3 border-t border-border pt-8">
        <Link
          href="/dashboard"
          className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-primary-dark"
        >
          View dashboard →
        </Link>
        <Link
          href="/history"
          className="rounded-full border border-primary/30 px-6 py-2.5 text-sm font-medium text-primary hover:bg-primary-light"
        >
          View history
        </Link>
      </div>
    </div>
  );
}
