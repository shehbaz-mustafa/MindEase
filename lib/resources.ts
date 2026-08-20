export type ResourceTag = "stress" | "sleep" | "anxiety" | "academic" | "mood" | "social";

export interface Resource {
  slug: string;
  title: string;
  description: string;
  type: "Article" | "Video" | "Exercise" | "Guide";
  duration: string;
  tags: ResourceTag[];
}

export const RESOURCES: Resource[] = [
  {
    slug: "understanding-academic-stress",
    title: "Understanding Academic Stress",
    description:
      "Learn the biological and psychological roots of academic stress, and why it shows up the way it does.",
    type: "Article",
    duration: "5 min read",
    tags: ["stress", "academic"],
  },
  {
    slug: "guided-breathing-for-focus",
    title: "Guided Breathing for Focus",
    description: "A quick exercise to center yourself before studying or an exam.",
    type: "Video",
    duration: "3 mins",
    tags: ["stress", "anxiety", "academic"],
  },
  {
    slug: "progressive-muscle-relaxation",
    title: "Progressive Muscle Relaxation",
    description: "Release physical tension to promote better sleep and a calmer body.",
    type: "Exercise",
    duration: "10 mins",
    tags: ["sleep", "anxiety"],
  },
  {
    slug: "sleep-hygiene-checklist",
    title: "The Sleep Hygiene Checklist",
    description: "Optimize your environment and routine for more restorative rest.",
    type: "Guide",
    duration: "4 min read",
    tags: ["sleep"],
  },
  {
    slug: "5-minute-box-breathing",
    title: "5-Minute Box Breathing",
    description: "A quick reset you can do anywhere — in the library, before class, or in bed.",
    type: "Exercise",
    duration: "5 mins",
    tags: ["stress", "anxiety"],
  },
  {
    slug: "managing-academic-stress",
    title: "Managing Academic Stress",
    description: "Strategies for breaking down deadlines and staying ahead without burning out.",
    type: "Article",
    duration: "6 min read",
    tags: ["academic", "stress"],
  },
  {
    slug: "reflecting-on-gratitude",
    title: "Reflecting on Gratitude",
    description: "A short journaling prompt to help you notice the good, even on hard days.",
    type: "Guide",
    duration: "5 mins",
    tags: ["mood"],
  },
  {
    slug: "staying-connected",
    title: "Staying Connected on Campus",
    description: "Small, low-pressure ways to build and maintain friendships during busy semesters.",
    type: "Article",
    duration: "4 min read",
    tags: ["social"],
  },
];

export const RESOURCE_TAGS: { value: ResourceTag; label: string }[] = [
  { value: "stress", label: "Stress" },
  { value: "sleep", label: "Sleep" },
  { value: "anxiety", label: "Anxiety" },
  { value: "academic", label: "Academic" },
  { value: "mood", label: "Mood" },
  { value: "social", label: "Social" },
];
