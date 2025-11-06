import { supabase } from "./supabaseClient.ts";
import { handleRequest } from "./route.ts";

Deno.serve(async (req) => {
  try {
    // Extract token
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Missing auth token" }), {
        status: 401,
      });
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
      });
    }

    // Delegate to routes
    return await handleRequest(req, user.id);
  } catch (err: any) {
    console.error("Error:", err);
    return new Response(JSON.stringify({ error: err?.message }), {
      status: 500,
    });
  }
});
