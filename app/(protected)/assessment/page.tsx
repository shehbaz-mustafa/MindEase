"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { QUESTIONS, ANSWER_OPTIONS, type Responses } from "@/lib/assessment/scoring";
import { RadioCard } from "@/components/ui/RadioCard";
import { ProgressSteps } from "@/components/ui/ProgressSteps";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { submitAssessmentAction } from "./actions";

export default function AssessmentPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState<Responses>({});
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>();

  const question = QUESTIONS[step];
  const isLast = step === QUESTIONS.length - 1;
  const selectedValue = responses[question.id];

  function selectAnswer(value: number) {
    setResponses((r) => ({ ...r, [question.id]: value }));
  }

  function goNext() {
    if (isLast) {
      startTransition(async () => {
        const result = await submitAssessmentAction(responses);
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

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
        ← Exit check-in
      </Link>

      <div className="mt-4 flex items-center justify-between">
        <h1 className="font-display text-3xl font-semibold text-ink">Checking In</h1>
        <span className="text-sm text-muted">
          Step {step + 1} of {QUESTIONS.length}
        </span>
      </div>

      <div className="mt-4">
        <ProgressSteps current={step} total={QUESTIONS.length} />
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
          There are no right or wrong answers. Just answer honestly based on your recent
          experiences.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {ANSWER_OPTIONS.map((option) => (
            <RadioCard
              key={option.value}
              label={option.label}
              selected={selectedValue === option.value}
              onSelect={() => selectAnswer(option.value)}
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
          <Button onClick={goNext} isLoading={isPending} disabled={selectedValue === undefined && !isPending}>
            {isLast ? "Finish" : "Continue"} →
          </Button>
        </div>
      </div>
    </div>
  );
}
