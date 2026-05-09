const GEMINI_GENERATE_CONTENT_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

function getFallbackSummary(auditResult) {
  return `Based on your audit, you could save $${
    auditResult?.totalMonthlySavings || 0
  }/month by optimising your AI tool subscriptions. Review the recommendations above to get started.`;
}

export async function generateSummary(auditResult) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return getFallbackSummary(auditResult);
  }

  try {
    const prompt = `You are a helpful financial advisor. Write a 100-word personalized summary for a startup based on this AI tool audit result. Be specific about the tools and savings amounts. Be friendly and actionable.

Audit data: ${JSON.stringify(auditResult)}`;

    const response = await fetch(`${GEMINI_GENERATE_CONTENT_URL}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error("Gemini summary request failed");
    }

    const data = await response.json();
    const summary = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    return summary || getFallbackSummary(auditResult);
  } catch {
    return getFallbackSummary(auditResult);
  }
}
