"use server";

import { createClient } from "@/lib/supabase/server";
import { scoreAssessment, type Responses, type Assessment } from "@/lib/assessments";

export interface SubmitResult {
  id?: string;
  error?: string;
}

function scoreToCategory(score: number): "thriving" | "steady" | "needs_support" {
  if (score >= 70) return "thriving";
  if (score >= 45) return "steady";
  return "needs_support";
}

export async function submitAssessmentAction(
  assessmentId: string,
  assessment: Assessment,
  responses: Responses
): Promise<SubmitResult> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: "Your session has expired. Please log in again." };
    }

    const result = scoreAssessment(assessment, responses);
    const dimensionScores = Object.fromEntries(
      result.dimensionResults.map((dimension) => [dimension.dimensionId, dimension.score])
    );

    const fullInsert = {
      user_id: user.id,
      assessment_type: assessmentId,
      assessment_name: assessment.name,
      overall_score: result.overallScore,
      dimension_scores: dimensionScores,
      score: result.overallScore,
      category: scoreToCategory(result.overallScore),
      breakdown: dimensionScores,
      responses,
    };

    const modernInsert = {
      user_id: user.id,
      assessment_type: assessmentId,
      assessment_name: assessment.name,
      overall_score: result.overallScore,
      dimension_scores: dimensionScores,
      responses,
    };

    const legacyInsert = {
      user_id: user.id,
      score: result.overallScore,
      category: scoreToCategory(result.overallScore),
      breakdown: dimensionScores,
      responses,
    };

    // 1. Try full insert (handles tables with legacy NOT NULL constraints + new columns)
    const fullRes = await supabase
      .from("assessments")
      .insert(fullInsert)
      .select("id")
      .single();

    if (!fullRes.error && fullRes.data) {
      return { id: fullRes.data.id };
    }

    // 2. Try modern insert (if full insert failed due to column mismatch or unexpected error)
    const modernRes = await supabase
      .from("assessments")
      .insert(modernInsert)
      .select("id")
      .single();

    if (!modernRes.error && modernRes.data) {
      return { id: modernRes.data.id };
    }

    // 3. Fallback to legacy insert
    const legacyRes = await supabase
      .from("assessments")
      .insert(legacyInsert)
      .select("id")
      .single();

    if (!legacyRes.error && legacyRes.data) {
      return { id: legacyRes.data.id };
    }

    console.error("Assessment save errors:", {
      fullError: fullRes.error,
      modernError: modernRes.error,
      legacyError: legacyRes.error,
    });

    return {
      error:
        legacyRes.error?.message ||
        modernRes.error?.message ||
        fullRes.error?.message ||
        "We couldn't save your assessment. Please try again.",
    };
  } catch (err: unknown) {
    console.error("Assessment submit network exception:", err);
    const message = err instanceof Error ? err.message : "";
    const isNetworkError = err instanceof TypeError || message.includes("fetch");

    return {
      error:
        isNetworkError
          ? "Network connection error: Unable to reach the server. Please check your connection and try again."
          : message || "An unexpected error occurred while saving your assessment.",
    };
  }
}
