# Assessment System Documentation

## Overview

MindEase now includes a comprehensive multi-assessment system with 5 psychological self-assessment questionnaires designed for university students. Each assessment measures specific emotional and psychological dimensions using a 5-point Likert scale.

## The 5 Assessments

### 1. Emotion Regulation Assessment
**Assessment ID:** `emotion-regulation`

Evaluates your ability to understand, accept, and effectively manage your emotions.

**6 Dimensions:**
- Lack of Emotional Clarity - Understanding your emotions
- Difficulties Engaging in Goal-Directed Behavior - Staying focused on goals when emotionally dysregulated
- Impulse Control Difficulties - Controlling impulsive reactions
- Limited Access to Emotion Regulation Strategies - Having healthy coping techniques
- Non-Acceptance of Emotional Responses - Accepting your own emotions
- Emotional Awareness - Noticing your emotional states

**Questions:** 24 carefully worded questions with mix of positive and negative phrasing

### 2. Stress & Coping Assessment
**Assessment ID:** `stress-coping`

Evaluate how you experience stress, your coping strategies, and your support systems.

**6 Dimensions:**
- Perceived Stress - How stressed you generally feel
- Difficulty Managing Stress - Challenges in handling stress
- Avoidance Coping - Tendency to avoid problems
- Problem-Solving Coping - Addressing stressors through action
- Emotional Coping - Using emotional support and expression
- Social Support & Help-Seeking - Comfort in reaching out for help

**Questions:** 24 questions covering stress perception and coping mechanisms

### 3. Emotional Awareness Assessment
**Assessment ID:** `emotional-awareness`

Assess your ability to recognize, understand, and express emotions.

**6 Dimensions:**
- Identifying Emotions - Naming and recognizing emotions
- Understanding Emotional Triggers - Awareness of cause and effect
- Recognizing Changes in Mood - Noticing emotional shifts
- Understanding Physical Signs - Recognizing bodily sensations
- Differentiating Between Emotions - Distinguishing similar emotions
- Expressing Emotions - Communicating emotions to others

**Questions:** 24 questions about emotional recognition and expression

### 4. Resilience & Recovery Assessment
**Assessment ID:** `resilience-recovery`

Evaluate your ability to bounce back from challenges and maintain emotional strength.

**6 Dimensions:**
- Recovery After Setbacks - Bouncing back emotionally
- Adaptability - Flexibility in challenging situations
- Persistence - Determination to continue despite obstacles
- Emotional Recovery - Speed of returning to equilibrium
- Positive Outlook - Seeing possibilities and maintaining hope
- Ability to Seek Support - Willingness to reach out for help

**Questions:** 24 questions about resilience and recovery

### 5. Self-Compassion Assessment
**Assessment ID:** `self-compassion`

Evaluate how you treat yourself during difficult times and moments of failure.

**6 Dimensions:**
- Self-Kindness - Being supportive to yourself
- Self-Criticism - Tendency to judge yourself harshly
- Acceptance of Mistakes - Viewing errors as human
- Feeling of Personal Worth - Inherent value independent of achievement
- Responding to Failure - How you handle personal failures
- Treating Yourself With Understanding - Approaching yourself with empathy

**Questions:** 24 questions about self-compassion and self-criticism

## Scoring System

### Likert Scale
All questions use a consistent 5-point scale:
- **1** - Almost Never
- **2** - Rarely
- **3** - Sometimes
- **4** - Often
- **5** - Almost Always

### Score Calculation
1. **Raw Score:** Average of all responses to questions in a dimension (1-5)
2. **Percentage:** Converted to 0-100 scale
3. **Level:** Categorized into ranges:
   - 0-20% = Very Low
   - 21-40% = Low
   - 41-60% = Moderate
   - 61-80% = High
   - 81-100% = Very High

### Interpretation
- For **positive dimensions** (e.g., "Self-Kindness"): Higher scores = more of the characteristic = better
- For **problem dimensions** (e.g., "Self-Criticism"): Lower scores = less of the problem = better
- Each dimension includes personalized interpretation text based on score level

## Technical Implementation

### File Structure
```
lib/assessments/
├── types.ts              # TypeScript types and interfaces
├── questionnaires.ts     # All 5 assessment definitions
├── scoring.ts            # Scoring logic and reporting
└── index.ts              # Export barrel

app/(protected)/
├── assessments/          # Assessment selector page
├── assessment/
│   ├── page.tsx          # Redirect to assessments
│   ├── [id]/
│   │   └── page.tsx      # Dynamic assessment questionnaire
│   └── actions.ts        # Server actions for submission
└── results/
    └── [id]/
        └── page.tsx      # Results display and recommendations
```

### Key Types

```typescript
// Assessment question
interface Question {
  id: string;
  dimensionId: string;
  prompt: string;
  isPositive: boolean;  // true = higher is better
}

// Assessment with dimensions
interface Assessment {
  id: string;
  name: string;
  description: string;
  dimensions: Dimension[];
  questions: Question[];
}

// Scoring result
interface AssessmentResult {
  assessmentId: string;
  assessmentName: string;
  overallScore: number;        // 0-100
  dimensionResults: Array<{
    dimensionId: string;
    dimensionName: string;
    score: number;              // 0-100
    percentage: number;          // 0-100
    level: ScoreLevel;          // "Very Low" | "Low" | "Moderate" | "High" | "Very High"
    interpretation: string;     // Human-readable explanation
  }>;
  summary: string;             // Overall summary
  recommendations: string[];   // 5 personalized recommendations
}
```

### User Flow

1. **Dashboard** → Links to assessment system
2. **Assessment Selector** (`/assessments`) → User chooses which assessment
3. **Questionnaire** (`/assessment/{id}`) → 24 questions, one per page with progress
4. **Results** (`/results/{id}`) → Scores, dimensions, and recommendations

## Database Schema

The `assessments` table has been updated to support multi-assessment:

```sql
CREATE TABLE assessments (
  id uuid PRIMARY KEY,
  user_id uuid NOT NULL,
  -- New multi-assessment columns
  assessment_type text,              -- e.g., "emotion-regulation"
  assessment_name text,              -- Full assessment name
  overall_score integer,             -- 0-100
  dimension_scores jsonb,            -- { dimensionId: score, ... }
  created_at timestamptz,
  -- Legacy columns (maintained for backwards compatibility)
  score integer,
  category text,
  breakdown jsonb,
  responses jsonb,
  completed_at timestamptz,
  ...
)
```

## Customization Guide

### Adding a New Assessment

1. **Create Assessment Definition:**
```typescript
// In lib/assessments/questionnaires.ts

export const newAssessment: Assessment = {
  id: "new-assessment",
  name: "New Assessment Name",
  description: "Brief description",
  dimensions: [
    {
      id: "dim-1",
      name: "Dimension Name",
      description: "What this measures"
    },
    // ... more dimensions (typically 4-6)
  ],
  questions: [
    {
      id: "q1",
      dimensionId: "dim-1",
      prompt: "Question text here?",
      isPositive: true  // or false
    },
    // ... 20-30 questions total
  ]
};
```

2. **Add to Registry:**
```typescript
export const ASSESSMENTS: Assessment[] = [
  // existing assessments...
  newAssessment
];
```

3. **Customize Interpretations & Recommendations:**
Edit `lib/assessments/scoring.ts`:
- Update `getInterpretation()` to handle your dimension names
- Update `generateRecommendations()` with assessment-specific advice

That's it! The UI, routing, and scoring automatically work with the new assessment.

## Important Notes

### Non-Clinical
These assessments are designed for **self-awareness and personal reflection only**. They:
- Are NOT clinical diagnostic tools
- Should NOT be used to diagnose mental health conditions
- Do NOT replace professional mental health support
- Provide general guidance and recommendations

Users see a clear disclaimer on their results page.

### Question Design

All questions follow these principles:
- **Student-friendly:** Simple, clear language
- **Balanced:** Mix of positive and negative phrasing
- **Non-repetitive:** Each question adds unique information
- **Reverse-scoring:** Negative questions are automatically inverted in scoring
- **Meaningful:** Grounded in psychological research concepts

### Scoring Fairness

- Reverse-scored questions automatically adjusted so higher = better in all cases
- Personalized interpretations account for dimension type
- Recommendations prioritize areas needing attention
- Overall score is average of all dimension percentages

## Future Enhancements

Potential additions to the system:
- Assessment history with trend analysis
- Comparison of assessments over time
- Export results as PDF
- Integration with mental health resources
- Custom scoring thresholds by school/district
- Peer comparison (anonymized aggregates)
- Integration with counseling referral systems
