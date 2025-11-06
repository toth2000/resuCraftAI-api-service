-- Add index on user_id to improve lookup performance
CREATE INDEX IF NOT EXISTS idx_resumes_user_id ON public.resumes (user_id);