import { getResumes, tailorResume, upsertResume } from "./controller.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://www.resucraftai.com",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS, DELETE, PUT",
};

export async function handleRequest(
  req: Request,
  userId: string,
): Promise<Response> {
  const url = new URL(req.url);
  const pathname = url.pathname;
  const method = req.method;

  // Handle CORS preflight
  if (method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // POST /resume
  if (pathname.endsWith("/resume") && method === "POST") {
    const body = await req.json();
    const data = await upsertResume(userId, body);
    return jsonResponse(data);
  }

  // GET /resume
  if (pathname.endsWith("/resume") && method === "GET") {
    const data = await getResumes(userId);
    return jsonResponse(data);
  }

  // GET /tailor
  if (pathname.endsWith("/tailor") && method === "POST") {
    const body = await req.json();
    const data = await tailorResume(userId, body);
    return jsonResponse(data);
  }

  return new Response("Not Found", { status: 404 });
}

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
