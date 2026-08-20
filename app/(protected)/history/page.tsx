import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/Badge";
import { categoryStatusLabel } from "@/lib/assessment/scoring";

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
    .select("id, score, category, completed_at")
    .eq("user_id", user?.id)
    .order("completed_at", { ascending: false });

  const list = assessments ?? [];
  const chronological = [...list].reverse();

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-3xl font-semibold text-ink">Your history</h1>
      <p className="mt-2 text-slate-600">
        Track how your well-being indicator has changed over time.
      </p>

      {list.length === 0 ? (
        <div className="mt-8 flex flex-col items-start gap-4 rounded-3xl border border-dashed border-primary/30 bg-primary-light/40 p-8">
          <p className="text-sm text-slate-700">
            You haven&apos;t completed a check-in yet. Once you do, your progress will show up
            here.
          </p>
          <Link
            href="/assessment"
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-primary-dark"
          >
            Start check-in →
          </Link>
        </div>
      ) : (
        <>
          {chronological.length > 1 && (
            <div className="mt-8 rounded-3xl border border-border bg-white p-6 shadow-sm">
              <p className="font-display text-sm font-semibold text-ink">
                Overall well-being over time
              </p>
              <div className="mt-6 flex h-32 items-end gap-2">
                {chronological.map((a) => (
                  <div key={a.id} className="flex flex-1 flex-col items-center gap-2">
                    <div
                      className="w-full rounded-t-lg bg-sage-dark/80"
                      style={{ height: `${Math.max(6, a.score)}%` }}
                      title={`${a.score}/100`}
                    />
                    <span className="text-[10px] text-muted">
                      {new Date(a.completed_at).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-col divide-y divide-border rounded-3xl border border-border bg-white shadow-sm">
            {list.map((a) => (
              <Link
                key={a.id}
                href={`/results/${a.id}`}
                className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-cream"
              >
                <div>
                  <p className="font-display text-sm font-semibold text-ink">
                    {new Date(a.completed_at).toLocaleDateString(undefined, {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-xs text-muted">{categoryStatusLabel(a.score)} overall</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge tone={CATEGORY_TONE[a.category] ?? "sage"}>
                    {CATEGORY_TEXT[a.category] ?? a.category}
                  </Badge>
                  <span className="font-display text-lg font-semibold text-ink">{a.score}</span>
                  <span className="text-primary">→</span>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
