// Netlify Serverless Function — KI-Kompass Visuals
// Proxies Replicate API: black-forest-labs/flux-canny-pro
// Edge-guided image generation preserves structure + transforms via prompt

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;
const REPLICATE_MODEL = "black-forest-labs/flux-canny-pro";
const REPLICATE_API = "https://api.replicate.com/v1";

// CORS headers for local dev
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

exports.handler = async (event) => {
  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers };
  }

  // Only POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  // Check API token
  if (!REPLICATE_API_TOKEN) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "REPLICATE_API_TOKEN nicht konfiguriert. Bitte in Netlify-Umgebungsvariablen setzen.",
      }),
    };
  }

  try {
    const { image, prompt } = JSON.parse(event.body);

    if (!image || !prompt) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Bild (image) und Prompt werden benötigt" }),
      };
    }

    // Strip data:image prefix if present — get raw base64
    const imageBase64 = image.includes("base64,")
      ? image.split("base64,")[1]
      : image;

    // Create data URI for Replicate
    const imageDataUri = `data:image/jpeg;base64,${imageBase64}`;

    // Call Replicate — create prediction
    const predictionRes = await fetch(`${REPLICATE_API}/predictions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
        Prefer: "wait",
      },
      body: JSON.stringify({
        version: "black-forest-labs/flux-canny-pro",
        input: {
          control_image: imageDataUri,
          prompt: prompt,
          num_outputs: 1,
          guidance: 30,
          steps: 30,
          output_format: "jpg",
          output_quality: 95,
          megapixels: "1",
        },
      }),
    });

    if (!predictionRes.ok) {
      const err = await predictionRes.text();
      console.error("Replicate error:", err);
      return {
        statusCode: predictionRes.status,
        headers,
        body: JSON.stringify({
          error: `Replicate API Fehler (${predictionRes.status}): ${err.substring(0, 200)}`,
        }),
      };
    }

    const prediction = await predictionRes.json();

    // If the prediction is still running, wait for it
    let result = prediction;
    if (result.status !== "succeeded" && result.status !== "failed") {
      // Poll for result — wait up to 60 seconds
      for (let i = 0; i < 30; i++) {
        await new Promise((r) => setTimeout(r, 2000));
        const pollRes = await fetch(
          `${REPLICATE_API}/predictions/${result.id}`,
          {
            headers: { Authorization: `Bearer ${REPLICATE_API_TOKEN}` },
          }
        );
        result = await pollRes.json();
        if (result.status === "succeeded" || result.status === "failed") break;
      }
    }

    if (result.status === "failed") {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: result.error || "KI-Generierung fehlgeschlagen",
        }),
      };
    }

    if (!result.output || (Array.isArray(result.output) && result.output.length === 0)) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "Kein Output von der KI erhalten" }),
      };
    }

    // FLUX canny pro returns array of URLs
    const outputUrl = Array.isArray(result.output)
      ? result.output[0]
      : result.output;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ output: outputUrl }),
    };
  } catch (error) {
    console.error("Function error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: `Server-Fehler: ${error.message}`,
      }),
    };
  }
};
