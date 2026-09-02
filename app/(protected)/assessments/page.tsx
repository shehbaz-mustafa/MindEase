"use client";

import { useState } from "react";
import Link from "next/link";
import { ASSESSMENTS } from "@/lib/assessments";
import { Button } from "@/components/ui/Button";

export default function AssessmentsPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink"
      >
        ← Back to Dashboard
      </Link>

      <div className="mt-8">
        <h1 className="font-display text-4xl font-semibold text-ink">
          Psychological Assessments
        </h1>
        <p className="mt-2 text-lg text-muted">
          Choose a questionnaire to explore your emotional well-being and self-awareness
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ASSESSMENTS.map((assessment) => (
          <button
            key={assessment.id}
            onClick={() => setSelectedId(assessment.id)}
            className={`rounded-2xl border-2 p-6 text-left transition-all ${
              selectedId === assessment.id
                ? "border-blue-500 bg-blue-50"
                : "border-border bg-white hover:border-border/60"
            }`}
          >
            <h3 className="font-display text-lg font-semibold text-ink">{assessment.name}</h3>
            <p className="mt-2 text-sm text-muted">{assessment.description}</p>
            <div className="mt-4 text-xs font-medium text-muted">
              {assessment.dimensions.length} dimensions • {assessment.questions.length} questions
            </div>
          </button>
        ))}
      </div>

      {selectedId && (
        <div className="mt-8 flex justify-end gap-3">
          <Button
            variant="secondary"
            onClick={() => setSelectedId(null)}
          >
            Cancel
          </Button>
          <Link href={`/assessment/${selectedId}`}>
            <Button>
              Start Assessment →
            </Button>
          </Link>
        </div>
      )}

      {!selectedId && (
        <div className="mt-8 rounded-2xl bg-blue-50 p-6 text-center">
          <p className="text-sm text-muted">
            Select an assessment above to get started
          </p>
        </div>
      )}
    </div>
  );
}
