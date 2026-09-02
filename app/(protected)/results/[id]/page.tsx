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
  const assessmentDefinition = getAssessmentById(assessment.assessment_type);

  if (!assessmentDefinition) {
    notFound();
  }

  // Recalculate results to get full report
  const result = scoreAssessment(assessmentDefinition, assessment.responses as Responses);

  // Format date
  const date = new Date(assessment.created_at).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink"
      >
        ← Back to Dashboard
      </Link>

      {/* Header */}
      <div className="mt-8">
        <h1 className="font-display text-4xl font-semibold text-ink">Your Results</h1>
        <p className="mt-2 text-muted">{assessment.assessment_name}</p>
        <p className="text-sm text-muted">{date}</p>
      </div>

      {/* Overall Score */}
      <div className="mt-8 rounded-3xl border border-border bg-white p-8 shadow-sm">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-32">
              <DonutStat 
                label="Overall Score"
                sublabel="Assessment"
                percent={result.overallScore}
                displayValue={`${result.overallScore}%`}
              />
            </div>
          </div>
          <p className="mt-4 max-w-2xl text-lg text-muted">{result.summary}</p>
        </div>
      </div>

      {/* Dimension Scores */}
      <div className="mt-8">
        <h2 className="mb-4 font-display text-2xl font-semibold text-ink">Dimension Breakdown</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {result.dimensionResults.map((dimension) => (
            <div
              key={dimension.dimensionId}
              className="rounded-2xl border border-border bg-white p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-ink">{dimension.dimensionName}</h3>
                  <Badge tone={dimension.level === "Very Low" ? "primary" : dimension.level === "Very High" ? "sage" : "primary"}>
                    {dimension.level}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="font-display text-3xl font-semibold text-ink">
                    {dimension.score}%
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted">{dimension.interpretation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="mt-8 rounded-3xl border border-border bg-blue-50 p-8">
        <h2 className="mb-4 font-display text-2xl font-semibold text-ink">
          Recommendations for You
        </h2>
        <div className="space-y-3">
          {result.recommendations.map((rec, idx) => (
            <div key={idx} className="flex gap-3">
              <div className="mt-1 flex-shrink-0 rounded-full bg-blue-300 w-1.5 h-1.5" />
              <p className="text-muted">{rec}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/assessments" className="flex-1">
          <Button variant="secondary" className="w-full">
            Take Another Assessment
          </Button>
        </Link>
        <Link href="/dashboard" className="flex-1">
          <Button className="w-full">View Dashboard</Button>
        </Link>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 rounded-2xl bg-gray-50 p-6 text-sm text-muted">
        <p className="font-semibold text-ink">Important Note</p>
        <p className="mt-2">
          These assessments are designed for self-awareness and personal reflection. They are not
          clinical diagnostic tools and should not be used to diagnose mental health conditions.
          If you're experiencing significant distress or struggling with your mental health, please
          reach out to a qualified mental health professional or counselor.
        </p>
      </div>
    </div>
  );
}
