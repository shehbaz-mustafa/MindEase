/**
 * Assessment System Types
 * Defines the structure for psychological self-assessment questionnaires
 */

export type LikertValue = 1 | 2 | 3 | 4 | 5;

export const LIKERT_LABELS: Record<LikertValue, string> = {
  1: "Almost Never",
  2: "Rarely",
  3: "Sometimes",
  4: "Often",
  5: "Almost Always",
};

export interface Question {
  id: string;
  dimensionId: string;
  prompt: string;
  /** If true, higher score indicates MORE of the positive characteristic */
  isPositive: boolean;
}

export interface Dimension {
  id: string;
  name: string;
  description: string;
}

export interface Assessment {
  id: string;
  name: string;
  description: string;
  dimensions: Dimension[];
  questions: Question[];
}

export type DimensionScores = Record<string, number>; // dimensionId -> score (0-100)

export interface DimensionResult {
  dimensionId: string;
  dimensionName: string;
  score: number; // 0-100
  percentage: number; // 0-100
  level: "Very Low" | "Low" | "Moderate" | "High" | "Very High";
  interpretation: string;
}

export interface AssessmentResult {
  assessmentId: string;
  assessmentName: string;
  overallScore: number; // 0-100
  dimensionResults: DimensionResult[];
  summary: string;
  recommendations: string[];
}

export type Responses = Record<string, LikertValue>; // questionId -> response value

/** Score level ranges */
export const SCORE_LEVELS = {
  VeryLow: { min: 0, max: 20, label: "Very Low" as const },
  Low: { min: 21, max: 40, label: "Low" as const },
  Moderate: { min: 41, max: 60, label: "Moderate" as const },
  High: { min: 61, max: 80, label: "High" as const },
  VeryHigh: { min: 81, max: 100, label: "Very High" as const },
} as const;

export function getScoreLevel(score: number): DimensionResult["level"] {
  if (score <= 20) return "Very Low";
  if (score <= 40) return "Low";
  if (score <= 60) return "Moderate";
  if (score <= 80) return "High";
  return "Very High";
}
