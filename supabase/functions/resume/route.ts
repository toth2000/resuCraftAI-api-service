import { extractResume, getResumes, tailorResume, upsertResume } from "./controller.ts";
import { corsHeaders } from "./constant/cors.ts";

export async function handleRequest(
  req: Request,
  userId: string,
): Promise<Response> {
  const url = new URL(req.url);
  const pathname = url.pathname;
  const method = req.method;

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

  // POST /tailor
  if (pathname.endsWith("/tailor") && method === "POST") {
    const body = await req.json();
    const data = await tailorResume(userId, body);
    return jsonResponse(data);
  }

  // POST /extract
  if (pathname.endsWith("/extract") && method === "POST") {
    const body = await req.json();
    const data = await extractResume(userId, body);
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
