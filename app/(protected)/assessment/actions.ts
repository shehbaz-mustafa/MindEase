"use server";

import { createClient } from "@/lib/supabase/server";
import { scoreAssessment, type Responses, type Assessment } from "@/lib/assessments";

export interface SubmitResult {
  id?: string;
  error?: string;
}

export async function submitAssessmentAction(
  assessmentId: string,
  assessment: Assessment,
  responses: Responses
): Promise<SubmitResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Your session has expired. Please log in again." };
  }

  const result = scoreAssessment(assessment, responses);

  // Save assessment result
  const { data, error } = await supabase
    .from("assessments")
    .insert({
      user_id: user.id,
      assessment_type: assessmentId,
      assessment_name: assessment.name,
      overall_score: result.overallScore,
      dimension_scores: Object.fromEntries(
        result.dimensionResults.map((d) => [d.dimensionId, d.score])
      ),
      responses,
    })
    .select("id")
    .single();

  if (error || !data) {
    console.error("Assessment save error:", error);
    return { error: "We couldn't save your assessment. Please try again." };
  }

  return { id: data.id };
}
