import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getAssessmentById, scoreAssessment, type Responses } from "@/lib/assessments";
import { DonutStat } from "@/components/ui/DonutStat";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface AssessmentRecord {
  id: string;
  assessment_type: string;
  assessment_name: string;
  overall_score: number;
  dimension_scores: Record<string, number>;
  responses: Record<string, number>;
  created_at: string;
}

export default async function ResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: record } = await supabase
    .from("assessments")
    .select("*")
    .eq("id", id)
    .eq("user_id", user?.id)
    .single();

  if (!record) {
    notFound();
  }

  const assessment = record as AssessmentRecord;
  const assessmentType = assessment.assessment_type || "emotion-regulation";
  const assessmentDefinition = getAssessmentById(assessmentType) ?? getAssessmentById("emotion-regulation");

  if (!assessmentDefinition) {
    notFound();
  }

  // Recalculate results to get full report (use empty object if responses missing)
  const result = scoreAssessment(
    assessmentDefinition,
    (assessment.responses ?? {}) as Responses
  );

  const rawDate = assessment.created_at || (record as { completed_at?: string }).completed_at || new Date().toISOString();

  // Format date
  const date = new Date(rawDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const title = assessment.assessment_name || assessmentDefinition.name || "Assessment Results";

  return (
    <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 sm:py-8">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink transition-colors"
      >
        ← Back to Dashboard
      </Link>

      {/* Header */}
      <div className="mt-6 sm:mt-8">
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Your Results</h1>
        <p className="mt-2 text-base text-muted">{title}</p>
        <p className="text-xs sm:text-sm text-muted">{date}</p>
      </div>

      {/* Overall Score */}
      <div className="mt-6 rounded-3xl border border-border bg-white p-6 shadow-sm sm:mt-8 sm:p-8">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex justify-center sm:mb-6">
            <div className="w-28 sm:w-32">
              <DonutStat 
                label="Overall Score"
                sublabel="Assessment"
                percent={result.overallScore}
                displayValue={`${result.overallScore}%`}
              />
            </div>
          </div>
          <p className="mt-3 max-w-2xl text-base text-muted sm:text-lg">{result.summary}</p>
        </div>
      </div>

      {/* Dimension Scores */}
      <div className="mt-6 sm:mt-8">
        <h2 className="mb-4 font-display text-xl font-semibold text-ink sm:text-2xl">Dimension Breakdown</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {result.dimensionResults.map((dimension) => (
            <div
              key={dimension.dimensionId}
              className="rounded-2xl border border-border bg-white p-5 sm:p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-ink">{dimension.dimensionName}</h3>
                  <div className="mt-1">
                    <Badge tone={dimension.level === "Very Low" ? "primary" : dimension.level === "Very High" ? "sage" : "primary"}>
                      {dimension.level}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                    {dimension.score}%
                  </div>
                </div>
              </div>
              <p className="mt-3 text-xs sm:text-sm text-muted">{dimension.interpretation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="mt-6 rounded-3xl border border-border bg-blue-50/60 p-6 sm:mt-8 sm:p-8">
        <h2 className="mb-4 font-display text-xl font-semibold text-ink sm:text-2xl">
          Recommendations for You
        </h2>
        <div className="space-y-3">
          {result.recommendations.map((rec, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="mt-1.5 flex-shrink-0 rounded-full bg-primary w-2 h-2" />
              <p className="text-sm text-ink sm:text-base">{rec}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
        <Link href="/assessments" className="flex-1">
          <Button variant="secondary" className="w-full justify-center">
            Take Another Assessment
          </Button>
        </Link>
        <Link href="/dashboard" className="flex-1">
          <Button className="w-full justify-center">View Dashboard</Button>
        </Link>
      </div>

      {/* Disclaimer */}
      <div className="mt-6 rounded-2xl bg-gray-50/80 p-5 text-xs text-muted sm:mt-8 sm:p-6 sm:text-sm">
        <p className="font-semibold text-ink">Important Note</p>
        <p className="mt-1.5 leading-relaxed">
          These assessments are designed for self-awareness and personal reflection. They are not
          clinical diagnostic tools and should not be used to diagnose mental health conditions.
          If you&apos;re experiencing significant distress or struggling with your mental health, please
          reach out to a qualified mental health professional or counselor.
        </p>
      </div>
    </div>
  );
}
