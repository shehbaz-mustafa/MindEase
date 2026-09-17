/**
 * Assessment Scoring Utilities
 * Calculates dimension scores, percentages, and levels with interpretations
 */

import {
  Assessment,
  AssessmentResult,
  DimensionResult,
  Responses,
  getScoreLevel,
} from "./types";

/**
 * Calculate raw score for a dimension
 * Returns a value between 0-5 based on average response
 */
function calculateDimensionRawScore(
  dimension: { id: string },
  questions: Array<{ id: string; dimensionId: string; isPositive: boolean }>,
  responses: Responses
): number {
  // Get all questions for this dimension
  const dimensionQuestions = questions.filter((q) => q.dimensionId === dimension.id);

  if (dimensionQuestions.length === 0) return 0;

  let totalScore = 0;
  let answeredCount = 0;

  for (const question of dimensionQuestions) {
    const response = responses[question.id];
    if (response === undefined) continue;

    answeredCount++;

    // For positive questions: higher response = higher score
    // For negative questions: lower response = higher score
    const adjustedScore = question.isPositive ? response : 6 - response; // Convert to 1-5, reverse if needed

    totalScore += adjustedScore;
  }

  if (answeredCount === 0) return 0;

  // Average score (1-5)
  return totalScore / answeredCount;
}

/**
 * Convert raw score (1-5) to percentage (0-100)
 */
function rawScoreToPercentage(rawScore: number): number {
  // rawScore is on 1-5 scale, convert to 0-100
  const normalized = (rawScore - 1) / 4; // Convert 1-5 to 0-1
  return Math.round(normalized * 100);
}

/**
 * Get interpretation text for a dimension score
 */
function getInterpretation(
  dimensionName: string,
  level: DimensionResult["level"]
): string {
  // Determine if this is a "problem" dimension (like "Lack of Clarity") or a "positive" one (like "Self-Kindness")
  const negativeDimensions = [
    "Lack of Emotional Clarity",
    "Difficulties Engaging in Goal-Directed Behavior",
    "Impulse Control Difficulties",
    "Limited Access to Emotion Regulation Strategies",
    "Non-Acceptance of Emotional Responses",
    "Difficulty Managing Stress",
    "Avoidance Coping",
    "Self-Criticism",
  ];

  const isDimensionNegative = negativeDimensions.some((dim) => dimensionName.includes(dim));

  // Build interpretation based on score level and dimension type
  if (isDimensionNegative) {
    // For "problem" dimensions, lower is better
    switch (level) {
      case "Very Low":
        return `Your responses suggest that ${dimensionName.toLowerCase()} is not a significant concern for you. This is a positive sign of emotional well-being.`;
      case "Low":
        return `You experience ${dimensionName.toLowerCase()} occasionally. This may be an area worth reflecting on, but overall it's manageable.`;
      case "Moderate":
        return `Your responses suggest moderate ${dimensionName.toLowerCase()}. You might benefit from developing additional strategies in this area.`;
      case "High":
        return `${dimensionName} appears to be a noticeable challenge for you. This may be worth exploring further and seeking support.`;
      case "Very High":
        return `Your responses indicate significant ${dimensionName.toLowerCase()}. This is an important area to address, and professional support may be helpful.`;
    }
  } else {
    // For positive dimensions, higher is better
    switch (level) {
      case "Very Low":
        return `This may be an area worth reflecting on. Developing more ${dimensionName.toLowerCase()} could support your well-being.`;
      case "Low":
        return `You have some ${dimensionName.toLowerCase()}, but there's room for growth in this area.`;
      case "Moderate":
        return `You demonstrate a balanced level of ${dimensionName.toLowerCase()}. Continue building on this strength.`;
      case "High":
        return `Your responses suggest strong ${dimensionName.toLowerCase()}. You're doing well in this area.`;
      case "Very High":
        return `You demonstrate exceptional ${dimensionName.toLowerCase()}. This is a significant strength that serves you well.`;
    }
  }
}

/**
 * Score a complete assessment
 */
export function scoreAssessment(
  assessment: Assessment,
  responses: Responses
): AssessmentResult {
  // Calculate dimension scores
  const dimensionResults: DimensionResult[] = [];
  let totalPercentage = 0;

  for (const dimension of assessment.dimensions) {
    const rawScore = calculateDimensionRawScore(dimension, assessment.questions, responses);
    const percentage = rawScoreToPercentage(rawScore);
    const level = getScoreLevel(percentage);

    const interpretation = getInterpretation(dimension.name, level);

    dimensionResults.push({
      dimensionId: dimension.id,
      dimensionName: dimension.name,
      score: percentage,
      percentage: percentage,
      level,
      interpretation,
    });

    totalPercentage += percentage;
  }

  // Calculate overall score
  const overallScore = Math.round(totalPercentage / dimensionResults.length);

  // Generate summary
  const summary = generateSummary(assessment.name, overallScore, dimensionResults);

  // Generate recommendations
  const recommendations = generateRecommendations(assessment.id, dimensionResults);

  return {
    assessmentId: assessment.id,
    assessmentName: assessment.name,
    overallScore,
    dimensionResults,
    summary,
    recommendations,
  };
}

/**
 * Generate a personalized summary based on overall score
 */
function generateSummary(
  assessmentName: string,
  overallScore: number,
  dimensionResults: DimensionResult[]
): string {
  const lowestDimension = dimensionResults.reduce((min, current) =>
    current.score < min.score ? current : min
  );

  const highestDimension = dimensionResults.reduce((max, current) =>
    current.score > max.score ? current : max
  );

  let summary = `Your overall ${assessmentName.toLowerCase()} score is ${overallScore}%. `;

  if (overallScore <= 40) {
    summary += `This suggests you may be experiencing significant challenges in this area. `;
  } else if (overallScore <= 60) {
    summary += `This indicates moderate levels across these areas. `;
  } else {
    summary += `This reflects strong skills and awareness in this area. `;
  }

  summary += `Your strongest area appears to be ${highestDimension.dimensionName.toLowerCase()} (${highestDimension.score}%), `;
  summary += `while ${lowestDimension.dimensionName.toLowerCase()} (${lowestDimension.score}%) may warrant additional attention.`;

  return summary;
}

/**
 * Generate personalized recommendations based on assessment results
 */
function generateRecommendations(assessmentId: string, dimensionResults: DimensionResult[]): string[] {
  const recommendations: string[] = [];

  // Get dimensions with low scores (areas for improvement)
  const lowScoreDimensions = dimensionResults
    .filter((d) => d.score <= 40)
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);

  // Generic recommendations based on assessment type
  const assessmentRecommendations: Record<string, string[]> = {
    "emotion-regulation": [
      "Practice mindfulness or meditation to increase emotional awareness and clarity.",
      "Learn specific emotion regulation techniques like breathing exercises or progressive muscle relaxation.",
      "Keep an emotion journal to track patterns in your emotional responses and triggers.",
      "Consider developing a personal toolkit of healthy coping strategies for different emotional situations.",
      "Explore acceptance-based approaches to work with difficult emotions rather than fight them.",
    ],
    "stress-coping": [
      "Develop a structured problem-solving approach to address stressors directly.",
      "Build your social support network and practice reaching out when you need help.",
      "Try stress-reduction techniques like exercise, yoga, or time in nature.",
      "Identify and reduce avoidance behaviors that may worsen stress in the long run.",
      "Create a daily routine that includes stress management practices.",
    ],
    "emotional-awareness": [
      "Expand your emotional vocabulary by learning about different emotions and their nuances.",
      "Practice body scanning to better recognize physical sensations linked to emotions.",
      "Reflect on your emotional triggers by journaling about situations that affect your mood.",
      "Share your feelings with trusted people to practice expressing emotions.",
      "Consider mindfulness practices to increase moment-to-moment awareness of your emotional state.",
    ],
    "resilience-recovery": [
      "Practice self-compassion when facing setbacks and challenges.",
      "Break larger goals into smaller steps to maintain persistence.",
      "Cultivate a growth mindset by viewing challenges as opportunities to learn.",
      "Build a support network you can turn to during difficult times.",
      "Regularly reflect on past challenges you've overcome to strengthen your confidence.",
    ],
    "self-compassion": [
      "Practice speaking to yourself as you would to a good friend who's struggling.",
      "Challenge self-critical thoughts by asking if they're truly fair and accurate.",
      "Recognize that all people struggle and make mistakes. You are not alone.",
      "Try loving-kindness meditation to cultivate compassion for yourself and others.",
      "Notice when you're being self-critical and consciously shift to a more understanding approach.",
    ],
  };

  // Add assessment-specific recommendations
  const specificRecs = assessmentRecommendations[assessmentId] || [];
  recommendations.push(...specificRecs.slice(0, 3));

  // Add dimension-specific recommendations
  for (const dim of lowScoreDimensions) {
    if (dim.dimensionName.includes("Lack of Emotional Clarity")) {
      recommendations.push("Work on naming your emotions with greater specificity through mindfulness practice.");
    }
    if (dim.dimensionName.includes("Impulse Control")) {
      recommendations.push("Practice the STOP technique: Stop, Take a breath, Observe, Proceed mindfully.");
    }
    if (dim.dimensionName.includes("Avoidance")) {
      recommendations.push("Gradually face situations you've been avoiding, starting with smaller challenges.");
    }
    if (dim.dimensionName.includes("Self-Criticism")) {
      recommendations.push("Practice self-compassion by noticing self-critical thoughts and responding with kindness.");
    }
  }

  // Add closing recommendation
  recommendations.push(
    "Consider speaking with a counselor or therapist for personalized guidance tailored to your specific needs."
  );

  // Remove duplicates and return top 5
  return Array.from(new Set(recommendations)).slice(0, 5);
}

/**
 * Format assessment result for display
 */
export function formatAssessmentResult(result: AssessmentResult): {
  title: string;
  score: string;
  summary: string;
  dimensions: Array<{
    name: string;
    score: number;
    level: string;
    interpretation: string;
  }>;
  recommendations: string[];
} {
  return {
    title: result.assessmentName,
    score: `${result.overallScore}%`,
    summary: result.summary,
    dimensions: result.dimensionResults.map((d) => ({
      name: d.dimensionName,
      score: d.percentage,
      level: d.level,
      interpretation: d.interpretation,
    })),
    recommendations: result.recommendations,
  };
}
