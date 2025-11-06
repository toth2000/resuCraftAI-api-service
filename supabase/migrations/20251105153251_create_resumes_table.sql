create table public.resumes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  content jsonb not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Allow users to read/write only their own resumes
create policy "Users can manage their own resumes"
on public.resumes
for all
using (auth.uid() = user_id);
