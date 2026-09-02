/**
 * Assessment Questionnaires Data
 * Contains 5 comprehensive psychological self-assessment questionnaires
 * Each with carefully designed questions, dimensions, and scoring
 */

import { Assessment } from "./types";

// =============================================================================
// 1. EMOTION REGULATION ASSESSMENT
// =============================================================================

export const emotionRegulationAssessment: Assessment = {
  id: "emotion-regulation",
  name: "Emotion Regulation Assessment",
  description:
    "Assess your ability to understand, accept, and effectively manage your emotions.",
  dimensions: [
    {
      id: "er-clarity",
      name: "Lack of Emotional Clarity",
      description: "Difficulty understanding and identifying your emotions",
    },
    {
      id: "er-goal-directed",
      name: "Difficulties Engaging in Goal-Directed Behavior",
      description: "Challenges staying focused on meaningful goals when emotionally dysregulated",
    },
    {
      id: "er-impulse",
      name: "Impulse Control Difficulties",
      description: "Difficulty controlling impulsive reactions and behaviors",
    },
    {
      id: "er-strategies",
      name: "Limited Access to Emotion Regulation Strategies",
      description: "Lack of healthy coping techniques and emotional management tools",
    },
    {
      id: "er-acceptance",
      name: "Non-Acceptance of Emotional Responses",
      description: "Resistance to or judgment of your own emotional experiences",
    },
    {
      id: "er-awareness",
      name: "Emotional Awareness",
      description: "Ability to notice and recognize your emotional states",
    },
  ],
  questions: [
    // Lack of Emotional Clarity
    {
      id: "er-q1",
      dimensionId: "er-clarity",
      prompt: "I can clearly identify what emotion I'm feeling at any moment.",
      isPositive: true,
    },
    {
      id: "er-q2",
      dimensionId: "er-clarity",
      prompt: "I find it difficult to understand why I feel the way I do.",
      isPositive: false,
    },
    {
      id: "er-q3",
      dimensionId: "er-clarity",
      prompt: "When I'm upset, I know what triggered my emotions.",
      isPositive: true,
    },
    {
      id: "er-q4",
      dimensionId: "er-clarity",
      prompt: "My emotions often feel confusing or mixed up.",
      isPositive: false,
    },

    // Difficulties Engaging in Goal-Directed Behavior
    {
      id: "er-q5",
      dimensionId: "er-goal-directed",
      prompt: "Strong emotions make it hard for me to focus on what I need to do.",
      isPositive: false,
    },
    {
      id: "er-q6",
      dimensionId: "er-goal-directed",
      prompt: "Even when I'm feeling bad, I can work toward my goals.",
      isPositive: true,
    },
    {
      id: "er-q7",
      dimensionId: "er-goal-directed",
      prompt: "When stressed, I abandon tasks that are important to me.",
      isPositive: false,
    },
    {
      id: "er-q8",
      dimensionId: "er-goal-directed",
      prompt: "I can maintain my responsibilities even during emotional difficult times.",
      isPositive: true,
    },

    // Impulse Control Difficulties
    {
      id: "er-q9",
      dimensionId: "er-impulse",
      prompt: "I say or do things I regret when I'm angry or upset.",
      isPositive: false,
    },
    {
      id: "er-q10",
      dimensionId: "er-impulse",
      prompt: "I can pause and think before reacting emotionally.",
      isPositive: true,
    },
    {
      id: "er-q11",
      dimensionId: "er-impulse",
      prompt: "When frustrated, I struggle to stop myself from overreacting.",
      isPositive: false,
    },
    {
      id: "er-q12",
      dimensionId: "er-impulse",
      prompt: "I have good control over my emotional reactions.",
      isPositive: true,
    },

    // Limited Access to Emotion Regulation Strategies
    {
      id: "er-q13",
      dimensionId: "er-strategies",
      prompt: "I have effective ways to calm myself down when upset.",
      isPositive: true,
    },
    {
      id: "er-q14",
      dimensionId: "er-strategies",
      prompt: "I don't know what to do when I'm feeling overwhelmed.",
      isPositive: false,
    },
    {
      id: "er-q15",
      dimensionId: "er-strategies",
      prompt: "I can use different techniques to manage my emotions depending on what I need.",
      isPositive: true,
    },
    {
      id: "er-q16",
      dimensionId: "er-strategies",
      prompt: "When emotions become intense, I feel helpless and lost.",
      isPositive: false,
    },

    // Non-Acceptance of Emotional Responses
    {
      id: "er-q17",
      dimensionId: "er-acceptance",
      prompt: "I accept my emotions, even if I don't like having them.",
      isPositive: true,
    },
    {
      id: "er-q18",
      dimensionId: "er-acceptance",
      prompt: "I judge myself harshly for feeling certain emotions.",
      isPositive: false,
    },
    {
      id: "er-q19",
      dimensionId: "er-acceptance",
      prompt: "I get frustrated with myself for being emotional.",
      isPositive: false,
    },
    {
      id: "er-q20",
      dimensionId: "er-acceptance",
      prompt: "I can acknowledge my feelings without trying to change them immediately.",
      isPositive: true,
    },

    // Emotional Awareness
    {
      id: "er-q21",
      dimensionId: "er-awareness",
      prompt: "I notice my emotions as they arise.",
      isPositive: true,
    },
    {
      id: "er-q22",
      dimensionId: "er-awareness",
      prompt: "I sometimes miss subtle changes in how I'm feeling.",
      isPositive: false,
    },
    {
      id: "er-q23",
      dimensionId: "er-awareness",
      prompt: "I'm aware of how my emotions affect my thoughts and behavior.",
      isPositive: true,
    },
    {
      id: "er-q24",
      dimensionId: "er-awareness",
      prompt: "I realize I'm upset only after I've already reacted.",
      isPositive: false,
    },
  ],
};

// =============================================================================
// 2. STRESS & COPING ASSESSMENT
// =============================================================================

export const stressAndCopingAssessment: Assessment = {
  id: "stress-coping",
  name: "Stress & Coping Assessment",
  description:
    "Evaluate how you experience stress, your coping strategies, and your support systems.",
  dimensions: [
    {
      id: "sc-perceived",
      name: "Perceived Stress",
      description: "How stressed you generally feel about life situations",
    },
    {
      id: "sc-managing",
      name: "Difficulty Managing Stress",
      description: "Challenges in handling stress when it occurs",
    },
    {
      id: "sc-avoidance",
      name: "Avoidance Coping",
      description: "Tendency to avoid problems rather than face them directly",
    },
    {
      id: "sc-problem-solving",
      name: "Problem-Solving Coping",
      description: "Ability to address stressors through active problem-solving",
    },
    {
      id: "sc-emotional",
      name: "Emotional Coping",
      description: "Use of emotional support and expression as coping mechanisms",
    },
    {
      id: "sc-social-support",
      name: "Social Support & Help-Seeking",
      description: "Comfort in reaching out for help and having supportive relationships",
    },
  ],
  questions: [
    // Perceived Stress
    {
      id: "sc-q1",
      dimensionId: "sc-perceived",
      prompt: "I feel stressed most of the time.",
      isPositive: false,
    },
    {
      id: "sc-q2",
      dimensionId: "sc-perceived",
      prompt: "My daily responsibilities feel overwhelming.",
      isPositive: false,
    },
    {
      id: "sc-q3",
      dimensionId: "sc-perceived",
      prompt: "I manage to stay calm even when facing multiple demands.",
      isPositive: true,
    },
    {
      id: "sc-q4",
      dimensionId: "sc-perceived",
      prompt: "I feel anxious about things that might happen.",
      isPositive: false,
    },

    // Difficulty Managing Stress
    {
      id: "sc-q5",
      dimensionId: "sc-managing",
      prompt: "When stressed, I know how to bring myself back to calm.",
      isPositive: true,
    },
    {
      id: "sc-q6",
      dimensionId: "sc-managing",
      prompt: "Stress makes it hard for me to think clearly.",
      isPositive: false,
    },
    {
      id: "sc-q7",
      dimensionId: "sc-managing",
      prompt: "I can handle stressful situations without falling apart.",
      isPositive: true,
    },
    {
      id: "sc-q8",
      dimensionId: "sc-managing",
      prompt: "When stressed, I feel overwhelmed and don't know where to start.",
      isPositive: false,
    },

    // Avoidance Coping
    {
      id: "sc-q9",
      dimensionId: "sc-avoidance",
      prompt: "When facing a problem, I tend to ignore it and hope it goes away.",
      isPositive: false,
    },
    {
      id: "sc-q10",
      dimensionId: "sc-avoidance",
      prompt: "I distract myself with activities to avoid thinking about problems.",
      isPositive: false,
    },
    {
      id: "sc-q11",
      dimensionId: "sc-avoidance",
      prompt: "I prefer to face my problems directly rather than avoid them.",
      isPositive: true,
    },
    {
      id: "sc-q12",
      dimensionId: "sc-avoidance",
      prompt: "When stressed, I use substance use or unhealthy habits as an escape.",
      isPositive: false,
    },

    // Problem-Solving Coping
    {
      id: "sc-q13",
      dimensionId: "sc-problem-solving",
      prompt: "I actively work to solve problems rather than just worry about them.",
      isPositive: true,
    },
    {
      id: "sc-q14",
      dimensionId: "sc-problem-solving",
      prompt: "When stressed, I break problems down into manageable steps.",
      isPositive: true,
    },
    {
      id: "sc-q15",
      dimensionId: "sc-problem-solving",
      prompt: "I feel capable of finding solutions to my problems.",
      isPositive: true,
    },
    {
      id: "sc-q16",
      dimensionId: "sc-problem-solving",
      prompt: "I get stuck and don't know how to solve my problems.",
      isPositive: false,
    },

    // Emotional Coping
    {
      id: "sc-q17",
      dimensionId: "sc-emotional",
      prompt: "Talking about my feelings helps me cope with stress.",
      isPositive: true,
    },
    {
      id: "sc-q18",
      dimensionId: "sc-emotional",
      prompt: "I use creative outlets like art, music, or journaling to process emotions.",
      isPositive: true,
    },
    {
      id: "sc-q19",
      dimensionId: "sc-emotional",
      prompt: "I bottle up my emotions rather than expressing them.",
      isPositive: false,
    },
    {
      id: "sc-q20",
      dimensionId: "sc-emotional",
      prompt: "Sharing my struggles with others helps me feel better.",
      isPositive: true,
    },

    // Social Support & Help-Seeking
    {
      id: "sc-q21",
      dimensionId: "sc-social-support",
      prompt: "I have people I can turn to when I need support.",
      isPositive: true,
    },
    {
      id: "sc-q22",
      dimensionId: "sc-social-support",
      prompt: "I'm comfortable asking for help when I'm struggling.",
      isPositive: true,
    },
    {
      id: "sc-q23",
      dimensionId: "sc-social-support",
      prompt: "I feel isolated and don't have much social support.",
      isPositive: false,
    },
    {
      id: "sc-q24",
      dimensionId: "sc-social-support",
      prompt: "I would rather struggle alone than burden others with my problems.",
      isPositive: false,
    },
  ],
};

// =============================================================================
// 3. EMOTIONAL AWARENESS ASSESSMENT
// =============================================================================

export const emotionalAwarenessAssessment: Assessment = {
  id: "emotional-awareness",
  name: "Emotional Awareness Assessment",
  description: "Assess your ability to recognize, understand, and express emotions.",
  dimensions: [
    {
      id: "ea-identifying",
      name: "Identifying Emotions",
      description: "Ability to name and recognize emotions as they occur",
    },
    {
      id: "ea-triggers",
      name: "Understanding Emotional Triggers",
      description: "Awareness of what situations or events cause emotional responses",
    },
    {
      id: "ea-mood-changes",
      name: "Recognizing Changes in Mood",
      description: "Noticing shifts in emotional states throughout the day",
    },
    {
      id: "ea-physical-signs",
      name: "Understanding Physical Signs of Emotions",
      description: "Recognizing bodily sensations that accompany emotions",
    },
    {
      id: "ea-differentiating",
      name: "Differentiating Between Emotions",
      description: "Ability to distinguish between similar or complex emotions",
    },
    {
      id: "ea-expressing",
      name: "Expressing Emotions",
      description: "Comfort and ability to communicate emotions to others",
    },
  ],
  questions: [
    // Identifying Emotions
    {
      id: "ea-q1",
      dimensionId: "ea-identifying",
      prompt: "I can name the specific emotion I'm feeling right now.",
      isPositive: true,
    },
    {
      id: "ea-q2",
      dimensionId: "ea-identifying",
      prompt: "I often feel something but can't put a label on it.",
      isPositive: false,
    },
    {
      id: "ea-q3",
      dimensionId: "ea-identifying",
      prompt: "I have a good vocabulary for describing different emotions.",
      isPositive: true,
    },
    {
      id: "ea-q4",
      dimensionId: "ea-identifying",
      prompt: "I experience emotions vaguely without clear understanding.",
      isPositive: false,
    },

    // Understanding Emotional Triggers
    {
      id: "ea-q5",
      dimensionId: "ea-triggers",
      prompt: "I know what situations typically make me anxious or sad.",
      isPositive: true,
    },
    {
      id: "ea-q6",
      dimensionId: "ea-triggers",
      prompt: "My emotional reactions sometimes catch me by surprise.",
      isPositive: false,
    },
    {
      id: "ea-q7",
      dimensionId: "ea-triggers",
      prompt: "I understand the connection between events and my emotional responses.",
      isPositive: true,
    },
    {
      id: "ea-q8",
      dimensionId: "ea-triggers",
      prompt: "I don't understand why certain things upset me.",
      isPositive: false,
    },

    // Recognizing Changes in Mood
    {
      id: "ea-q9",
      dimensionId: "ea-mood-changes",
      prompt: "I notice when my mood shifts from one moment to the next.",
      isPositive: true,
    },
    {
      id: "ea-q10",
      dimensionId: "ea-mood-changes",
      prompt: "My mood feels relatively stable throughout the day.",
      isPositive: true,
    },
    {
      id: "ea-q11",
      dimensionId: "ea-mood-changes",
      prompt: "I'm often unaware of my mood until someone points it out.",
      isPositive: false,
    },
    {
      id: "ea-q12",
      dimensionId: "ea-mood-changes",
      prompt: "I can sense patterns in how my emotions change throughout the week.",
      isPositive: true,
    },

    // Understanding Physical Signs of Emotions
    {
      id: "ea-q13",
      dimensionId: "ea-physical-signs",
      prompt: "I notice physical sensations in my body when I feel different emotions.",
      isPositive: true,
    },
    {
      id: "ea-q14",
      dimensionId: "ea-physical-signs",
      prompt: "I can connect my body's signals (tension, heart rate, etc.) to emotions.",
      isPositive: true,
    },
    {
      id: "ea-q15",
      dimensionId: "ea-physical-signs",
      prompt: "I'm not very tuned into what my body is telling me emotionally.",
      isPositive: false,
    },
    {
      id: "ea-q16",
      dimensionId: "ea-physical-signs",
      prompt: "I feel anxious in my chest or stomach when worried.",
      isPositive: true,
    },

    // Differentiating Between Emotions
    {
      id: "ea-q17",
      dimensionId: "ea-differentiating",
      prompt: "I can tell the difference between being upset and being overwhelmed.",
      isPositive: true,
    },
    {
      id: "ea-q18",
      dimensionId: "ea-differentiating",
      prompt: "My emotions feel jumbled together rather than distinct.",
      isPositive: false,
    },
    {
      id: "ea-q19",
      dimensionId: "ea-differentiating",
      prompt: "I understand the difference between disappointment, sadness, and grief.",
      isPositive: true,
    },
    {
      id: "ea-q20",
      dimensionId: "ea-differentiating",
      prompt: "I struggle to identify whether I'm angry, hurt, or frustrated.",
      isPositive: false,
    },

    // Expressing Emotions
    {
      id: "ea-q21",
      dimensionId: "ea-expressing",
      prompt: "I can express my emotions clearly to others.",
      isPositive: true,
    },
    {
      id: "ea-q22",
      dimensionId: "ea-expressing",
      prompt: "I keep my emotions to myself even when it would help to share.",
      isPositive: false,
    },
    {
      id: "ea-q23",
      dimensionId: "ea-expressing",
      prompt: "I feel comfortable saying how I feel without embarrassment.",
      isPositive: true,
    },
    {
      id: "ea-q24",
      dimensionId: "ea-expressing",
      prompt: "I struggle to put my emotions into words when talking to others.",
      isPositive: false,
    },
  ],
};

// =============================================================================
// 4. RESILIENCE & RECOVERY ASSESSMENT
// =============================================================================

export const resilienceAndRecoveryAssessment: Assessment = {
  id: "resilience-recovery",
  name: "Resilience & Recovery Assessment",
  description:
    "Evaluate your ability to bounce back from challenges and maintain emotional strength.",
  dimensions: [
    {
      id: "rr-recovery",
      name: "Recovery After Setbacks",
      description: "Ability to bounce back emotionally after difficulties",
    },
    {
      id: "rr-adaptability",
      name: "Adaptability",
      description: "Flexibility in adjusting to new or challenging situations",
    },
    {
      id: "rr-persistence",
      name: "Persistence",
      description: "Determination to continue despite obstacles",
    },
    {
      id: "rr-emotional-recovery",
      name: "Emotional Recovery",
      description: "Speed and ease of returning to emotional equilibrium",
    },
    {
      id: "rr-outlook",
      name: "Positive Outlook",
      description: "Tendency to see possibilities and maintain hope",
    },
    {
      id: "rr-help-seeking",
      name: "Ability to Seek Support",
      description: "Willingness to reach out for help during difficult times",
    },
  ],
  questions: [
    // Recovery After Setbacks
    {
      id: "rr-q1",
      dimensionId: "rr-recovery",
      prompt: "When I experience a setback, I can eventually move forward.",
      isPositive: true,
    },
    {
      id: "rr-q2",
      dimensionId: "rr-recovery",
      prompt: "Bad experiences tend to linger with me for a long time.",
      isPositive: false,
    },
    {
      id: "rr-q3",
      dimensionId: "rr-recovery",
      prompt: "I learn and grow from difficult experiences.",
      isPositive: true,
    },
    {
      id: "rr-q4",
      dimensionId: "rr-recovery",
      prompt: "I dwell on failures and find it hard to move past them.",
      isPositive: false,
    },

    // Adaptability
    {
      id: "rr-q5",
      dimensionId: "rr-adaptability",
      prompt: "I adjust well when plans change unexpectedly.",
      isPositive: true,
    },
    {
      id: "rr-q6",
      dimensionId: "rr-adaptability",
      prompt: "I struggle when situations don't go as planned.",
      isPositive: false,
    },
    {
      id: "rr-q7",
      dimensionId: "rr-adaptability",
      prompt: "I can find alternative solutions when my first approach doesn't work.",
      isPositive: true,
    },
    {
      id: "rr-q8",
      dimensionId: "rr-adaptability",
      prompt: "I feel stuck when faced with unexpected challenges.",
      isPositive: false,
    },

    // Persistence
    {
      id: "rr-q9",
      dimensionId: "rr-persistence",
      prompt: "I don't give up easily, even when things are difficult.",
      isPositive: true,
    },
    {
      id: "rr-q10",
      dimensionId: "rr-persistence",
      prompt: "When I face obstacles, I tend to give up.",
      isPositive: false,
    },
    {
      id: "rr-q11",
      dimensionId: "rr-persistence",
      prompt: "I keep working toward my goals despite setbacks.",
      isPositive: true,
    },
    {
      id: "rr-q12",
      dimensionId: "rr-persistence",
      prompt: "I easily become discouraged and abandon my efforts.",
      isPositive: false,
    },

    // Emotional Recovery
    {
      id: "rr-q13",
      dimensionId: "rr-emotional-recovery",
      prompt: "After feeling upset, I can regain emotional balance.",
      isPositive: true,
    },
    {
      id: "rr-q14",
      dimensionId: "rr-emotional-recovery",
      prompt: "Strong emotions take a long time to wear off for me.",
      isPositive: false,
    },
    {
      id: "rr-q15",
      dimensionId: "rr-emotional-recovery",
      prompt: "I return to feeling okay more quickly than most people.",
      isPositive: true,
    },
    {
      id: "rr-q16",
      dimensionId: "rr-emotional-recovery",
      prompt: "Emotional experiences overwhelm me and take days to recover from.",
      isPositive: false,
    },

    // Positive Outlook
    {
      id: "rr-q17",
      dimensionId: "rr-outlook",
      prompt: "I generally feel hopeful about my future.",
      isPositive: true,
    },
    {
      id: "rr-q18",
      dimensionId: "rr-outlook",
      prompt: "I often see the good side of difficult situations.",
      isPositive: true,
    },
    {
      id: "rr-q19",
      dimensionId: "rr-outlook",
      prompt: "I tend to expect things to go wrong.",
      isPositive: false,
    },
    {
      id: "rr-q20",
      dimensionId: "rr-outlook",
      prompt: "I believe I have the ability to handle whatever comes my way.",
      isPositive: true,
    },

    // Ability to Seek Support
    {
      id: "rr-q21",
      dimensionId: "rr-help-seeking",
      prompt: "I know when to ask for help and I do so without hesitation.",
      isPositive: true,
    },
    {
      id: "rr-q22",
      dimensionId: "rr-help-seeking",
      prompt: "I believe that reaching out for support makes me look weak.",
      isPositive: false,
    },
    {
      id: "rr-q23",
      dimensionId: "rr-help-seeking",
      prompt: "When struggling, I can access resources or people who can help.",
      isPositive: true,
    },
    {
      id: "rr-q24",
      dimensionId: "rr-help-seeking",
      prompt: "I prefer to handle problems alone rather than involve others.",
      isPositive: false,
    },
  ],
};

// =============================================================================
// 5. SELF-COMPASSION ASSESSMENT
// =============================================================================

export const selfCompassionAssessment: Assessment = {
  id: "self-compassion",
  name: "Self-Compassion Assessment",
  description:
    "Evaluate how you treat yourself during difficult times and moments of failure.",
  dimensions: [
    {
      id: "sc-kindness",
      name: "Self-Kindness",
      description: "Ability to be supportive and kind to yourself",
    },
    {
      id: "sc-criticism",
      name: "Self-Criticism",
      description: "Tendency to judge yourself harshly and be self-critical",
    },
    {
      id: "sc-mistakes",
      name: "Acceptance of Mistakes",
      description: "Ability to accept errors as part of human experience",
    },
    {
      id: "sc-worth",
      name: "Feeling of Personal Worth",
      description: "Sense of inherent value independent of achievement",
    },
    {
      id: "sc-failure",
      name: "Responding to Failure",
      description: "How you handle and process personal failures",
    },
    {
      id: "sc-understanding",
      name: "Treating Yourself With Understanding",
      description: "Approaching yourself with empathy during challenging times",
    },
  ],
  questions: [
    // Self-Kindness
    {
      id: "sc-q1",
      dimensionId: "sc-kindness",
      prompt: "I'm kind and understanding toward myself when I'm going through a tough time.",
      isPositive: true,
    },
    {
      id: "sc-q2",
      dimensionId: "sc-kindness",
      prompt: "I try to be supportive of myself when facing challenges.",
      isPositive: true,
    },
    {
      id: "sc-q3",
      dimensionId: "sc-kindness",
      prompt: "When I'm struggling, I treat myself with the same compassion I'd give a friend.",
      isPositive: true,
    },
    {
      id: "sc-q4",
      dimensionId: "sc-kindness",
      prompt: "I'm cold and unsympathetic toward myself when I fail.",
      isPositive: false,
    },

    // Self-Criticism
    {
      id: "sc-q5",
      dimensionId: "sc-criticism",
      prompt: "I'm critical and judgmental of my own flaws.",
      isPositive: false,
    },
    {
      id: "sc-q6",
      dimensionId: "sc-criticism",
      prompt: "I tend to harsh on myself and I expect more from myself than others.",
      isPositive: false,
    },
    {
      id: "sc-q7",
      dimensionId: "sc-criticism",
      prompt: "I can acknowledge my weaknesses without being mean to myself.",
      isPositive: true,
    },
    {
      id: "sc-q8",
      dimensionId: "sc-criticism",
      prompt: "I blame myself for problems and feel inadequate.",
      isPositive: false,
    },

    // Acceptance of Mistakes
    {
      id: "sc-q9",
      dimensionId: "sc-mistakes",
      prompt: "I accept that making mistakes is a normal part of being human.",
      isPositive: true,
    },
    {
      id: "sc-q10",
      dimensionId: "sc-mistakes",
      prompt: "When I make a mistake, I feel ashamed and embarrassed.",
      isPositive: false,
    },
    {
      id: "sc-q11",
      dimensionId: "sc-mistakes",
      prompt: "I can learn from my errors without feeling like a failure.",
      isPositive: true,
    },
    {
      id: "sc-q12",
      dimensionId: "sc-mistakes",
      prompt: "I punish myself mentally for small mistakes I make.",
      isPositive: false,
    },

    // Feeling of Personal Worth
    {
      id: "sc-q13",
      dimensionId: "sc-worth",
      prompt: "I feel like I have value as a person, regardless of my accomplishments.",
      isPositive: true,
    },
    {
      id: "sc-q14",
      dimensionId: "sc-worth",
      prompt: "My self-worth depends on how well I perform.",
      isPositive: false,
    },
    {
      id: "sc-q15",
      dimensionId: "sc-worth",
      prompt: "I believe I'm a good person even when I don't live up to my ideals.",
      isPositive: true,
    },
    {
      id: "sc-q16",
      dimensionId: "sc-worth",
      prompt: "I feel inadequate and not good enough.",
      isPositive: false,
    },

    // Responding to Failure
    {
      id: "sc-q17",
      dimensionId: "sc-failure",
      prompt: "When I fail, I see it as an opportunity to learn.",
      isPositive: true,
    },
    {
      id: "sc-q18",
      dimensionId: "sc-failure",
      prompt: "Failure makes me feel worthless and hopeless.",
      isPositive: false,
    },
    {
      id: "sc-q19",
      dimensionId: "sc-failure",
      prompt: "I can handle disappointment without spiraling.",
      isPositive: true,
    },
    {
      id: "sc-q20",
      dimensionId: "sc-failure",
      prompt: "I feel isolated and alone when I struggle or fail.",
      isPositive: false,
    },

    // Treating Yourself With Understanding
    {
      id: "sc-q21",
      dimensionId: "sc-understanding",
      prompt: "I try to understand why I behaved a certain way instead of judging myself.",
      isPositive: true,
    },
    {
      id: "sc-q22",
      dimensionId: "sc-understanding",
      prompt: "I approach my difficulties with curiosity rather than anger.",
      isPositive: true,
    },
    {
      id: "sc-q23",
      dimensionId: "sc-understanding",
      prompt: "I beat myself up over my emotional reactions and behaviors.",
      isPositive: false,
    },
    {
      id: "sc-q24",
      dimensionId: "sc-understanding",
      prompt: "When something goes wrong, I try to be patient and gentle with myself.",
      isPositive: true,
    },
  ],
};

// =============================================================================
// ASSESSMENT REGISTRY
// =============================================================================

export const ASSESSMENTS: Assessment[] = [
  emotionRegulationAssessment,
  stressAndCopingAssessment,
  emotionalAwarenessAssessment,
  resilienceAndRecoveryAssessment,
  selfCompassionAssessment,
];

export function getAssessmentById(id: string): Assessment | undefined {
  return ASSESSMENTS.find((a) => a.id === id);
}
