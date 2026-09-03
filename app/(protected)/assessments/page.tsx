"use client";

import { useState } from "react";
import Link from "next/link";
import { ASSESSMENTS } from "@/lib/assessments";
import { Button } from "@/components/ui/Button";

export default function AssessmentsPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedAssessment = ASSESSMENTS.find((a) => a.id === selectedId);

  return (
    <div className="mx-auto max-w-4xl px-4 py-2 sm:px-6 sm:py-6 pb-24 sm:pb-8">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-muted hover:text-ink transition-colors"
      >
        ← Back to Dashboard
      </Link>

      <div className="mt-4 sm:mt-8">
        <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-4xl">
          Psychological Assessments
        </h1>
        <p className="mt-2 text-sm text-muted sm:text-lg">
          Choose a questionnaire to explore your emotional well-being and self-awareness
        </p>
      </div>

      <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:mt-8">
        {ASSESSMENTS.map((assessment) => {
          const isSelected = selectedId === assessment.id;
          return (
            <button
              key={assessment.id}
              onClick={() => setSelectedId(assessment.id)}
              className={`group flex flex-col justify-between rounded-2xl border-2 p-5 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                isSelected
                  ? "border-primary bg-primary-light/60 shadow-md ring-2 ring-primary/20 scale-[1.02]"
                  : "border-border bg-white hover:border-primary/40 hover:shadow-xs"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-base font-semibold text-ink sm:text-lg">{assessment.name}</h3>
                  <span
                    className={`h-4 w-4 rounded-full border-2 transition-colors ${
                      isSelected ? "border-primary bg-primary" : "border-slate-300 group-hover:border-primary/50"
                    }`}
                  />
                </div>
                <p className="mt-2 text-xs sm:text-sm text-muted leading-relaxed">{assessment.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-border/60 text-xs font-medium text-muted">
                {assessment.dimensions.length} dimensions • {assessment.questions.length} questions
              </div>
            </button>
          );
        })}
      </div>

      {/* Action Bar (Sticky on Mobile, Standard on Desktop) */}
      {selectedAssessment ? (
        <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-white/95 p-4 shadow-xl backdrop-blur-md sm:relative sm:z-auto sm:mt-8 sm:border-none sm:bg-transparent sm:p-0 sm:shadow-none sm:backdrop-blur-none">
          <div className="mx-auto flex max-w-4xl items-center justify-between gap-3">
            <div className="hidden sm:block">
              <span className="text-sm text-muted">Selected: </span>
              <span className="font-semibold text-ink">{selectedAssessment.name}</span>
            </div>
            <div className="flex w-full sm:w-auto justify-end gap-3">
              <Button
                variant="secondary"
                onClick={() => setSelectedId(null)}
                className="flex-1 sm:flex-initial justify-center"
              >
                Cancel
              </Button>
              <Link href={`/assessment/${selectedId}`} className="flex-1 sm:flex-initial">
                <Button className="w-full justify-center shadow-md">
                  Start Assessment →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-6 rounded-2xl bg-blue-50/60 p-5 text-center sm:mt-8 sm:p-6">
          <p className="text-xs sm:text-sm text-muted">
            Select an assessment above to get started
          </p>
        </div>
      )}
    </div>
  );
}
