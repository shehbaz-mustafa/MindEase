import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/Badge";

const CATEGORY_TONE: Record<string, "sage" | "primary" | "danger"> = {
  thriving: "sage",
  steady: "primary",
  needs_support: "danger",
};

const CATEGORY_TEXT: Record<string, string> = {
  thriving: "Thriving",
  steady: "Steady",
  needs_support: "Needs support",
};

export default async function HistoryPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: assessments } = await supabase
    .from("assessments")
    .select("id, score, category, completed_at, overall_score, assessment_name, created_at")
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false });

  const rawList = assessments ?? [];
  const list = rawList.map((a) => ({
    id: a.id,
    score: a.overall_score ?? a.score ?? 0,
    category: a.category || "steady",
    date: a.created_at || a.completed_at || new Date().toISOString(),
    name: a.assessment_name || "Assessment",
  }));

  const chronological = [...list].reverse();

  return (
    <div className="mx-auto max-w-3xl px-4 py-2 sm:px-6 sm:py-6">
      <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">Your history</h1>
      <p className="mt-1.5 text-xs sm:text-sm text-slate-600">
        Track how your well-being indicator has changed over time.
      </p>

      {list.length === 0 ? (
        <div className="mt-6 flex flex-col items-start gap-4 rounded-3xl border border-dashed border-primary/30 bg-primary-light/40 p-6 sm:mt-8 sm:p-8">
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            You haven&apos;t completed a check-in yet. Once you do, your progress will show up
            here.
          </p>
          <Link
            href="/assessments"
            className="w-full rounded-lg bg-primary px-6 py-2.5 text-center text-sm font-medium text-white shadow-xs transition-colors hover:bg-primary-dark sm:w-auto"
          >
            Start assessment →
          </Link>
        </div>
      ) : (
        <>
          {chronological.length > 1 && (
            <div className="mt-6 rounded-3xl border border-border bg-white p-5 shadow-sm sm:mt-8 sm:p-6">
              <p className="font-display text-sm font-semibold text-ink">
                Overall well-being over time
              </p>
              <div className="mt-4 flex h-32 sm:h-36 items-end gap-1.5 overflow-x-auto pb-2">
                {chronological.map((a) => (
                  <div key={a.id} className="flex min-w-[32px] flex-1 flex-col items-center gap-1.5">
                    <div
                      className="w-full rounded-t-lg bg-sage-dark/80 transition-all hover:bg-sage-dark"
                      style={{ height: `${Math.max(8, a.score)}%` }}
                      title={`${a.name}: ${a.score}/100`}
                    />
                    <span className="text-[9px] sm:text-[10px] text-muted whitespace-nowrap">
                      {new Date(a.date).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-col divide-y divide-border rounded-3xl border border-border bg-white shadow-sm overflow-hidden">
            {list.map((a) => (
              <Link
                key={a.id}
                href={`/results/${a.id}`}
                className="flex items-center justify-between gap-3 px-5 py-4 hover:bg-cream transition-colors sm:px-6"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-display text-sm font-semibold text-ink truncate">
                    {a.name}
                  </p>
                  <p className="text-xs text-muted mt-0.5">
                    {new Date(a.date).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-2.5 sm:gap-4">
                  {a.category && (
                    <div className="hidden sm:block">
                      <Badge tone={CATEGORY_TONE[a.category] ?? "sage"}>
                        {CATEGORY_TEXT[a.category] ?? a.category}
                      </Badge>
                    </div>
                  )}
                  <span className="font-display text-base font-bold text-ink sm:text-lg">{a.score}%</span>
                  <span className="text-primary text-sm sm:text-base">→</span>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
