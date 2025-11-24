-- Trigger to update updatedAt field on every updates
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create table resume_optimizations
create table if not exists public.resume_optimizations (
  id uuid primary key default gen_random_uuid(),

  -- User who triggered this optimization
  user_id uuid not null references auth.users(id) on delete cascade,

  -- Raw job description or parsed JD
  job_data jsonb not null,

  -- AI optimized resume output
  optimized_resume jsonb not null,

  -- Timestamps
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Auto-update updated_at
create trigger update_resume_optimizations_updated_at
before update on public.resume_optimizations
for each row
execute function public.set_updated_at();

