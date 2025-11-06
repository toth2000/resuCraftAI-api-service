import { OptimizedResumeContent } from "../interface/resume.ts";

interface AIRequest {
  resume_content: object;
  job_description: string;
}

interface AIResponse {
  optimized_sections: OptimizedResumeContent[];
  keywords_used: null | number;
}

export class AIService {
  private apiUrl: string;
  private apiKey: string;
  private modelName: string;
  private maxToken: string;

  constructor() {
    this.apiUrl = Deno.env.get("AI_SERVICE_URL")!;
    this.apiKey = Deno.env.get("AI_SERVICE_KEY")!;
    this.modelName = Deno.env.get("AI_SERVICE_MODEL_NAME")!;
    this.maxToken = Deno.env.get("AI_SERVICE_MAX_TOKEN")!;

    if (!this.apiUrl || !this.apiKey || !this.modelName || !this.maxToken) {
      throw new Error(
        "AI_SERVICE_URL or AI_SERVICE_KEY or AI_SERVICE_MODEL_NAME or AI_SERVICE_MAX_TOKEN not defined in environment",
      );
    }
  }

  /**
   * Call AI service to tailor a resume
   * @param payload - object containing resume and job description
   * @returns Array of optimized sections
   */
  async tailorResume(payload: AIRequest): Promise<OptimizedResumeContent[]> {
    try {
      const response = await fetch(`${this.apiUrl}/v1/tailor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "API_KEY": this.apiKey,
        },
        body: JSON.stringify({
          resume_content: payload.resume_content,
          job_description: payload.job_description,
          model_name: this.modelName,
          max_tokens: this.maxToken,
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`AI service error: ${text}`);
      }

      const data: AIResponse = await response.json();
      return data.optimized_sections;
    } catch (err) {
      console.error("AI service failed:", err);
      throw err;
    }
  }
}
