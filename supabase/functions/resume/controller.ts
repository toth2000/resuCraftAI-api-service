import { TailorRequest } from "./interface/requests.ts";
import { Resume } from "./interface/resume.ts";
import { AIService } from "./lib/aiService.ts";
import { supabase } from "./supabaseClient.ts";

const aiService = new AIService();

export async function getResumes(userId: string) {
  const { data, error } = await supabase
    .from("resumes")
    .select("*")
    .eq("user_id", userId)
    .limit(1);

  if (error) throw new Error(error.message);

  return <Resume> <unknown> data.length ? data[0] : {};
}

export async function upsertResume(userId: string, body: any) {
  const { content } = body;

  const { data: existingResumes, error: fetchError } = await supabase
    .from("resumes")
    .select("id")
    .eq("user_id", userId)
    .limit(1);

  if (fetchError) {
    throw new Error(`Failed to fetch existing resume: ${fetchError.message}`);
  }

  const existingId = existingResumes?.length ? existingResumes[0].id : null;

  const { data, error } = await supabase
    .from("resumes")
    .upsert({
      ...(existingId && { id: existingId }),
      user_id: userId,
      content,
      updated_at: new Date().toISOString(),
    })
    .select();

  if (error) throw new Error(error.message);
  return <Resume> <unknown> data.length ? data[0] : {};
}

export async function tailorResume(userId: string, body: TailorRequest) {
  const { job_description, company, position } = body;

  if (!job_description) throw new Error("Job Description is required");
  if (!company) throw new Error("Company is required");
  if (!position) throw new Error("Position is required");

  const { data, error } = await supabase
    .from("resumes")
    .select("content")
    .eq("user_id", userId)
    .limit(1);

  if (error) throw error;

  if (!data || !data.length) {
    throw new Error("No resume found for user");
  }

  const resume = <Resume> <unknown> data[0];

  const tailoredResume = await aiService.tailorResume({
    resume_content: resume.content,
    job_description,
    company,
    position,
  });

  await supabase
    .from("resume_optimizations")
    .insert({
      user_id: userId,
      job_data: {
        job_description,
        company,
        position,
      },
      optimized_resume: tailoredResume,
    });

  return tailoredResume;
}
