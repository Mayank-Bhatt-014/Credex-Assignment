import { runAudit } from "./auditEngine.js";

describe("runAudit", () => {
  test("flags GitHub Copilot as remove when Cursor is active for coding use case", () => {
    const result = runAudit({
      useCase: "coding",
      tools: [
        {
          name: "Cursor",
          active: true,
          plan: "Pro",
          seats: 3,
          monthlySpend: 60,
        },
        {
          name: "GitHub Copilot",
          active: true,
          plan: "Business",
          seats: 3,
          monthlySpend: 57,
        },
      ],
    });

    const copilotRecommendation = result.recommendations.find(
      (recommendation) => recommendation.tool === "GitHub Copilot"
    );

    expect(copilotRecommendation.status).toBe("remove");
    expect(result.totalMonthlySavings).toBe(57);
  });

  test("recommends downgrade when seats <= 2 on Business plan", () => {
    const result = runAudit({
      useCase: "mixed",
      tools: [
        {
          name: "Cursor",
          active: true,
          plan: "Business",
          seats: 2,
          monthlySpend: 80,
        },
      ],
    });

    const cursorRecommendation = result.recommendations.find(
      (recommendation) => recommendation.tool === "Cursor"
    );

    expect(cursorRecommendation.status).toBe("downgrade");
    expect(cursorRecommendation.recommendedPlan).toBe("Pro");
  });

  test("flags overpaying when spend exceeds official price", () => {
    const result = runAudit({
      useCase: "mixed",
      tools: [
        {
          name: "ChatGPT",
          active: true,
          plan: "Plus",
          seats: 1,
          monthlySpend: 35,
        },
      ],
    });

    const chatGptRecommendation = result.recommendations.find(
      (recommendation) => recommendation.tool === "ChatGPT"
    );

    expect(chatGptRecommendation.status).toBe("overpaying");
    expect(chatGptRecommendation.potentialSaving).toBe(15);
  });

  test("returns optimal when spend matches official price", () => {
    const result = runAudit({
      useCase: "coding",
      tools: [
        {
          name: "Cursor",
          active: true,
          plan: "Pro",
          seats: 1,
          monthlySpend: 20,
        },
      ],
    });

    const cursorRecommendation = result.recommendations.find(
      (recommendation) => recommendation.tool === "Cursor"
    );

    expect(cursorRecommendation.status).toBe("optimal");
    expect(result.totalMonthlySavings).toBe(0);
  });

  test("skips inactive tools completely", () => {
    const result = runAudit({
      useCase: "mixed",
      tools: [
        {
          name: "ChatGPT",
          active: true,
          plan: "Plus",
          seats: 1,
          monthlySpend: 0,
        },
      ],
    });

    expect(result.recommendations).toEqual([]);
    expect(result.totalMonthlySavings).toBe(0);
  });
});
