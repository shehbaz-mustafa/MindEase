-- Migration to support multiple assessment types
-- Run this after 002_assessments.sql

-- Add new columns for the multi-assessment system
ALTER TABLE public.assessments 
ADD COLUMN IF NOT EXISTS assessment_type text,
ADD COLUMN IF NOT EXISTS assessment_name text,
ADD COLUMN IF NOT EXISTS overall_score integer,
ADD COLUMN IF NOT EXISTS dimension_scores jsonb DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS created_at timestamptz NOT NULL DEFAULT now();

-- Keep backwards compatibility:
-- - score column still exists (legacy)
-- - category column still exists (legacy)
-- - breakdown column still exists (legacy)
-- - For new assessments, use assessment_type, assessment_name, overall_score, dimension_scores

-- Update index to include created_at
CREATE INDEX IF NOT EXISTS assessments_user_id_created_at_idx
  ON public.assessments (user_id, created_at DESC);

-- Add comment explaining the table structure
COMMENT ON TABLE public.assessments IS 'Stores assessment results. Supports both legacy single-dimension check-ins and new multi-assessment questionnaire results.';
