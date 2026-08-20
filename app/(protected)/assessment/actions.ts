"use server";

import { createClient } from "@/lib/supabase/server";
import { scoreAssessment, type Responses } from "@/lib/assessment/scoring";

export interface SubmitResult {
  id?: string;
  error?: string;
}

export async function submitAssessmentAction(responses: Responses): Promise<SubmitResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Your session has expired. Please log in again." };
  }

  const result = scoreAssessment(responses);

  const { data, error } = await supabase
    .from("assessments")
    .insert({
      user_id: user.id,
      score: result.overallScore,
      category: result.categoryLabel,
      breakdown: Object.fromEntries(result.categoryScores.map((c) => [c.category, c.score])),
      responses,
    })
    .select("id")
    .single();

  if (error || !data) {
    return { error: "We couldn't save your check-in. Please try again." };
  }

  return { id: data.id };
}
