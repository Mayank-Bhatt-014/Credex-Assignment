const ANTHROPIC_MESSAGES_URL = "https://api.anthropic.com/v1/messages";
const ANTHROPIC_MODEL = "claude-haiku-4-5-20251001";

function getFallbackSummary(auditResult) {
  return `Based on your audit, you could save $${
    auditResult?.totalMonthlySavings || 0
  }/month by optimising your AI tool subscriptions. Review the recommendations above to get started.`;
}

export async function generateSummary(auditResult) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return getFallbackSummary(auditResult);
  }

  try {
    const prompt = `You are a helpful financial advisor. Write a 100-word personalized summary for a startup based on this AI tool audit result. Be specific about the tools and savings amounts. Be friendly and actionable.

Audit data: ${JSON.stringify(auditResult)}`;

    const response = await fetch(ANTHROPIC_MESSAGES_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: ANTHROPIC_MODEL,
        max_tokens: 200,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error("Anthropic summary request failed");
    }

    const data = await response.json();
    const summary = data?.content?.[0]?.text;

    return summary || getFallbackSummary(auditResult);
  } catch {
    return getFallbackSummary(auditResult);
  }
}
