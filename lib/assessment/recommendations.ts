import type { Category } from "./scoring";

export interface Recommendation {
  title: string;
  description: string;
  href: string;
}

// Shown when a category score is below this threshold (0-100, higher = better).
export const RECOMMENDATION_THRESHOLD = 60;

const RECOMMENDATIONS: Record<Category, Recommendation> = {
  stress: {
    title: "Try a short breathing exercise",
    description: "A few minutes of guided breathing can take the edge off a stressful day.",
    href: "/resources?tag=stress",
  },
  academic: {
    title: "Break your workload into smaller steps",
    description: "Study planning and short breaks can make academic pressure feel more manageable.",
    href: "/resources?tag=academic",
  },
  sleep: {
    title: "Review your sleep routine",
    description: "Small, consistent changes to your sleep schedule can improve rest quality.",
    href: "/resources?tag=sleep",
  },
  mood: {
    title: "Make space for something you enjoy",
    description: "Journaling prompts and gentle self-care activities can help lift a low mood.",
    href: "/resources?tag=mood",
  },
  anxiety: {
    title: "Ground yourself with a relaxation exercise",
    description: "Progressive muscle relaxation and grounding techniques can ease racing thoughts.",
    href: "/resources?tag=anxiety",
  },
  social: {
    title: "Reconnect with someone you trust",
    description: "Even a short conversation with a friend or family member can help you feel less alone.",
    href: "/resources?tag=social",
  },
};

export function getRecommendations(
  categoryScores: { category: string; score: number }[]
): Recommendation[] {
  return categoryScores
    .filter((c) => c.score < RECOMMENDATION_THRESHOLD)
    .sort((a, b) => a.score - b.score)
    .flatMap((c) => {
      const recommendation = RECOMMENDATIONS[c.category as Category];
      return recommendation ? [recommendation] : [];
    });
}
