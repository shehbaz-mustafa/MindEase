export type Category = "stress" | "mood" | "anxiety" | "sleep" | "academic" | "social";

export interface Question {
  id: string;
  category: Category;
  prompt: string;
  /** If true, a higher answer value means BETTER well-being (reverse-scored). */
  positive?: boolean;
}

export interface AnswerOption {
  label: string;
  value: number; // 0-4
}

export const ANSWER_OPTIONS: AnswerOption[] = [
  { label: "Rarely or never", value: 0 },
  { label: "Sometimes", value: 1 },
  { label: "Often", value: 2 },
  { label: "Almost constantly", value: 3 },
];

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    category: "academic",
    prompt: "Over the past week, how often have you felt overwhelmed by your workload?",
  },
  {
    id: "q2",
    category: "stress",
    prompt: "How often have you felt tense, on edge, or unable to relax?",
  },
  {
    id: "q3",
    category: "mood",
    prompt: "How often have you felt down, low, or disinterested in things you usually enjoy?",
  },
  {
    id: "q4",
    category: "anxiety",
    prompt: "How often have worries or racing thoughts made it hard to focus?",
  },
  {
    id: "q5",
    category: "sleep",
    prompt: "How often has your sleep felt disrupted, too short, or unrefreshing?",
  },
  {
    id: "q6",
    category: "social",
    prompt: "How often have you felt isolated or disconnected from friends or classmates?",
  },
  {
    id: "q7",
    category: "mood",
    prompt: "How often have you felt hopeful about how things are going for you right now?",
    positive: true,
  },
  {
    id: "q8",
    category: "academic",
    prompt: "How often have academic deadlines felt manageable rather than overwhelming?",
    positive: true,
  },
];

export type Responses = Record<string, number>;

export interface CategoryScore {
  category: Category;
  /** 0-100, higher = better well-being in this area. */
  score: number;
}

export interface AssessmentResult {
  overallScore: number; // 0-100, higher = better
  categoryScores: CategoryScore[];
  categoryLabel: "thriving" | "steady" | "needs_support";
  headline: string;
  summary: string;
}

const CATEGORY_LABELS: Record<Category, string> = {
  stress: "Stress",
  mood: "Mood",
  anxiety: "Anxiety",
  sleep: "Sleep",
  academic: "Academic pressure",
  social: "Social well-being",
};

export { CATEGORY_LABELS };

const MAX_ANSWER = 3; // matches ANSWER_OPTIONS max value

function toWellbeingScore(question: Question, rawValue: number): number {
  // Convert 0-3 raw answer into a 0-100 "well-being" score where 100 = best.
  const normalized = rawValue / MAX_ANSWER; // 0-1, higher = more frequent
  const wellbeing = question.positive ? normalized : 1 - normalized;
  return Math.round(wellbeing * 100);
}

export function describeOverallScore(overallScore: number): {
  categoryLabel: AssessmentResult["categoryLabel"];
  headline: string;
  summary: string;
} {
  if (overallScore >= 70) {
    return {
      categoryLabel: "thriving",
      headline: "You're doing well",
      summary:
        "Your responses suggest a generally positive state right now. Keep leaning on the habits and support that are working for you, and check in with yourself regularly.",
    };
  }
  if (overallScore >= 45) {
    return {
      categoryLabel: "steady",
      headline: "You're doing okay",
      summary:
        "Your overall balance looks stable, though a few areas could use some attention. Remember, this snapshot is just a guide — be kind to yourself and lean into your coping strategies when things feel heavy.",
    };
  }
  return {
    categoryLabel: "needs_support",
    headline: "It might help to reach out",
    summary:
      "Your responses suggest you've been carrying a lot lately. This isn't a diagnosis — but it may be a good time to talk to someone. Consider connecting with a counsellor or trusted person for support.",
  };
}

export function scoreAssessment(responses: Responses): AssessmentResult {
  const byCategory = new Map<Category, number[]>();

  for (const q of QUESTIONS) {
    const raw = responses[q.id];
    if (raw === undefined) continue;
    const wellbeing = toWellbeingScore(q, raw);
    const list = byCategory.get(q.category) ?? [];
    list.push(wellbeing);
    byCategory.set(q.category, list);
  }

  const categoryScores: CategoryScore[] = Array.from(byCategory.entries()).map(
    ([category, scores]) => ({
      category,
      score: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
    })
  );

  const overallScore = categoryScores.length
    ? Math.round(
        categoryScores.reduce((a, c) => a + c.score, 0) / categoryScores.length
      )
    : 0;

  const { categoryLabel, headline, summary } = describeOverallScore(overallScore);

  return { overallScore, categoryScores, categoryLabel, headline, summary };
}

export function categoryStatusLabel(score: number): string {
  if (score >= 70) return "Positive";
  if (score >= 45) return "Moderate";
  return "Needs attention";
}
