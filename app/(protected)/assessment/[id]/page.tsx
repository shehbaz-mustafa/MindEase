"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ASSESSMENTS, getAssessmentById, LIKERT_LABELS, type Responses, type LikertValue } from "@/lib/assessments";
import { RadioCard } from "@/components/ui/RadioCard";
import { ProgressSteps } from "@/components/ui/ProgressSteps";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { submitAssessmentAction } from "../actions";

interface AssessmentPageProps {
  params: Promise<{ id: string }>;
}

export default function DynamicAssessmentPage({ params }: AssessmentPageProps) {
  const { id: assessmentId } = React.use(params);
  const router = useRouter();

  const assessment = getAssessmentById(assessmentId);

  if (!assessment) {
    return (
      <div className="mx-auto max-w-2xl">
        <Alert variant="error">Assessment not found</Alert>
        <Link href="/assessments" className="mt-4 inline-block">
          <Button variant="secondary">Back to Assessments</Button>
        </Link>
      </div>
    );
  }

  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState<Responses>({});
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>();

  const question = assessment.questions[step];
  const isLast = step === assessment.questions.length - 1;
  const selectedValue = responses[question.id];

  function selectAnswer(value: LikertValue) {
    setResponses((r) => ({ ...r, [question.id]: value }));
  }

  function goNext() {
    if (!assessment) return;
    
    if (isLast) {
      startTransition(async () => {
        const result = await submitAssessmentAction(assessmentId, assessment, responses);
        if (result.error || !result.id) {
          setError(result.error ?? "Something went wrong. Please try again.");
          return;
        }
        router.push(`/results/${result.id}`);
      });
    } else {
      setStep((s) => s + 1);
    }
  }

  function skip() {
    setResponses((r) => {
      const next = { ...r };
      delete next[question.id];
      return next;
    });
    if (isLast) {
      goNext();
    } else {
      setStep((s) => s + 1);
    }
  }

  // Get current dimension
  const currentDimension = assessment.dimensions.find((d) => d.id === question.dimensionId);

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/assessments"
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink"
      >
        ← Back to Assessments
      </Link>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink">{assessment.name}</h1>
          {currentDimension && (
            <p className="mt-1 text-sm text-muted">{currentDimension.name}</p>
          )}
        </div>
        <span className="text-sm text-muted">
          {step + 1} / {assessment.questions.length}
        </span>
      </div>

      <div className="mt-4">
        <ProgressSteps current={step} total={assessment.questions.length} />
      </div>

      <div className="mt-8 rounded-3xl border border-border bg-white p-8 shadow-sm">
        {error && (
          <div className="mb-4">
            <Alert variant="error">{error}</Alert>
          </div>
        )}

        <h2 className="text-center font-display text-xl font-semibold text-ink sm:text-2xl">
          {question.prompt}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-center text-sm text-muted">
          There are no right or wrong answers. Choose the option that best reflects your
          experience.
        </p>

        <div className="mt-8 space-y-2">
          {([1, 2, 3, 4, 5] as const).map((value) => (
            <RadioCard
              key={value}
              label={LIKERT_LABELS[value]}
              selected={selectedValue === value}
              onSelect={() => selectAnswer(value)}
            />
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
          <button
            type="button"
            onClick={skip}
            className="text-sm font-medium text-muted hover:text-ink"
            disabled={isPending}
          >
            Skip question
          </button>
          <Button
            onClick={goNext}
            isLoading={isPending}
            disabled={selectedValue === undefined && !isPending}
          >
            {isLast ? "Complete Assessment" : "Continue"} →
          </Button>
        </div>
      </div>
    </div>
  );
}

// Note: Add 'use' import at top
import React from "react";
