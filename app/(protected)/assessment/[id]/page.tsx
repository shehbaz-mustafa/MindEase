"use client";

import { use, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAssessmentById, LIKERT_LABELS, type Responses, type LikertValue } from "@/lib/assessments";
import { RadioCard } from "@/components/ui/RadioCard";
import { ProgressSteps } from "@/components/ui/ProgressSteps";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { submitAssessmentAction } from "../actions";

interface AssessmentPageProps {
  params: Promise<{ id: string }>;
}

export default function DynamicAssessmentPage({ params }: AssessmentPageProps) {
  const { id: assessmentId } = use(params);
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState<Responses>({});
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>();

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

  const question = assessment.questions[step];
  const isLast = step === assessment.questions.length - 1;
  const selectedValue = responses[question.id];

  function selectAnswer(value: LikertValue) {
    setResponses((r) => ({ ...r, [question.id]: value }));
  }

  function goNext() {
    if (!assessment) return;

    const currentResponses =
      selectedValue !== undefined
        ? { ...responses, [question.id]: selectedValue }
        : responses;
    
    if (isLast) {
      setError(undefined);
      startTransition(async () => {
        const result = await submitAssessmentAction(assessmentId, assessment, currentResponses);
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
    if (!assessment) return;

    const next = { ...responses };
    delete next[question.id];
    setResponses(next);

    if (isLast) {
      setError(undefined);
      startTransition(async () => {
        const result = await submitAssessmentAction(assessmentId, assessment, next);
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

  function goBack() {
    if (step > 0) {
      setStep((s) => s - 1);
    }
  }

  // Get current dimension
  const currentDimension = assessment.dimensions.find((d) => d.id === question.dimensionId);

  return (
    <div className="mx-auto max-w-2xl px-4 py-2 sm:px-6 sm:py-6">
      <div className="flex items-center justify-between">
        <Link
          href="/assessments"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-muted hover:text-ink transition-colors"
        >
          ← Back to Assessments
        </Link>
        {step > 0 && (
          <button
            type="button"
            onClick={goBack}
            className="text-xs sm:text-sm text-muted hover:text-ink transition-colors"
            disabled={isPending}
          >
            ← Previous Question
          </button>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">{assessment.name}</h1>
          {currentDimension && (
            <p className="mt-0.5 text-xs sm:text-sm text-muted">{currentDimension.name}</p>
          )}
        </div>
        <span className="text-xs sm:text-sm font-medium text-muted">
          Question {step + 1} of {assessment.questions.length}
        </span>
      </div>

      <div className="mt-4">
        <ProgressSteps current={step} total={assessment.questions.length} />
      </div>

      <div key={step} className="mt-6 rounded-3xl border border-border bg-white p-5 shadow-sm sm:mt-8 sm:p-8 transition-all animate-in fade-in-50 duration-200">
        {error && (
          <div className="mb-4">
            <Alert variant="error">{error}</Alert>
          </div>
        )}

        <h2 className="text-center font-display text-lg font-semibold text-ink sm:text-2xl sm:leading-snug">
          {question.prompt}
        </h2>
        <p className="mx-auto mt-2 max-w-md text-center text-xs sm:text-sm text-muted">
          There are no right or wrong answers. Choose the option that best reflects your
          experience.
        </p>

        <div className="mt-6 space-y-2.5 sm:mt-8 sm:space-y-3">
          {([1, 2, 3, 4, 5] as const).map((value) => (
            <RadioCard
              key={value}
              label={LIKERT_LABELS[value]}
              selected={selectedValue === value}
              onSelect={() => selectAnswer(value)}
            />
          ))}
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 border-t border-border pt-6 sm:mt-8 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={skip}
            className="w-full sm:w-auto text-center text-xs sm:text-sm font-medium text-muted hover:text-ink py-2"
            disabled={isPending}
          >
            Skip question
          </button>
          <Button
            onClick={goNext}
            isLoading={isPending}
            disabled={selectedValue === undefined && !isPending}
            className="w-full sm:w-auto justify-center"
          >
            {isLast ? "Complete Assessment" : "Continue"} →
          </Button>
        </div>
      </div>
    </div>
  );
}
