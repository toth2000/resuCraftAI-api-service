export interface ResumeContent {
  section_title: string;
  original_text: string;
}

export interface OptimizedResumeContent {
  section_title: string;
  optimized_text: string;
}

export interface Resume {
  id: string;
  user_id: string;
  content: ResumeContent[];
  created_at: string;
  updated_at: string;
}
