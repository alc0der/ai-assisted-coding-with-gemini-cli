import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

const HTML = await Deno.readFile("./index.html");
const surveyData = JSON.parse(
  await Deno.readTextFile("./ai-tools-usage-survey.json"),
);
const GOOGLE_APPS_SCRIPT_URL = Deno.env.get("GOOGLE_APPS_SCRIPT_URL");

serve(async (req) => {
  const url = new URL(req.url);

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  // Serve HTML at root path
  if (url.pathname === "/" && req.method === "GET") {
    return new Response(HTML, {
      headers: {
        "content-type": "text/html",
      },
    });
  }

  // Serve survey data at /survey endpoint
  if (url.pathname === "/survey" && req.method === "GET") {
    return new Response(JSON.stringify(surveyData), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  // Handle survey submission at /submit endpoint
  if (url.pathname === "/submit" && req.method === "POST") {
    try {
      const surveyResults = await req.json();

      // Forward to Google Apps Script
      const googleResponse = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(surveyResults),
      });

      if (!googleResponse.ok) {
        throw new Error(`Google Apps Script returned ${googleResponse.status}`);
      }

      const result = await googleResponse.json();

      return new Response(JSON.stringify({ success: true, result }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (error) {
      console.error("Error submitting survey:", error);
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        },
      );
    }
  }

  // Return 404 for other routes
  return new Response("Not Found", { status: 404 });
});
