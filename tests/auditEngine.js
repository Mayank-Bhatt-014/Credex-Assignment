import {
  CUSTOM_PRICE,
  TOOL_NAMES,
  getPlanPrice,
  isCustomPriced,
} from "./pricingData.js";

const PAID_PLAN_FALLBACKS = {
  [TOOL_NAMES.CURSOR]: "Pro",
  [TOOL_NAMES.GITHUB_COPILOT]: "Individual",
  [TOOL_NAMES.CLAUDE]: "Pro",
  [TOOL_NAMES.CHATGPT]: "Plus",
  [TOOL_NAMES.GEMINI]: "One AI Pro",
  [TOOL_NAMES.WINDSURF]: "Pro",
};

const TEAM_PLAN_FALLBACKS = {
  [TOOL_NAMES.CURSOR]: "Business",
  [TOOL_NAMES.GITHUB_COPILOT]: "Business",
  [TOOL_NAMES.CLAUDE]: "Team",
  [TOOL_NAMES.CHATGPT]: "Team",
  [TOOL_NAMES.WINDSURF]: "Teams",
};

const BUSINESS_SCALE_PLANS = ["Business", "Enterprise"];
const TEAM_SCALE_PLANS = ["Team", "Teams"];
const SOLO_PLANS = ["Individual", "Hobby", "Free"];
const CODING_TOOLS = [
  TOOL_NAMES.CURSOR,
  TOOL_NAMES.GITHUB_COPILOT,
  TOOL_NAMES.WINDSURF,
];
const LLM_TOOLS = [TOOL_NAMES.CHATGPT, TOOL_NAMES.CLAUDE];

function toNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatCurrency(value) {
  const amount = toNumber(value);
  return amount % 1 === 0 ? `$${amount}` : `$${amount.toFixed(2)}`;
}

function normalizeTool(tool) {
  return {
    name: tool?.name || "",
    active: Boolean(tool?.active),
    plan: tool?.plan || "",
    seats: Math.max(0, toNumber(tool?.seats)),
    monthlySpend: Math.max(0, toNumber(tool?.monthlySpend)),
  };
}

function isPaidPlan(tool) {
  const price = getPlanPrice(tool.name, tool.plan);
  return price === CUSTOM_PRICE || toNumber(price) > 0;
}

function getExpectedSpend(tool) {
  const planPrice = getPlanPrice(tool.name, tool.plan);
  if (planPrice === CUSTOM_PRICE || planPrice === null) {
    return null;
  }

  return Math.max(0, toNumber(planPrice) * tool.seats);
}

function getCheapestActiveTool(tools) {
  return [...tools].sort((first, second) => first.monthlySpend - second.monthlySpend)[0];
}

function makeRecommendation(tool, values) {
  return {
    tool: tool.name,
    currentPlan: tool.plan,
    currentSpend: tool.monthlySpend,
    recommendedPlan: values.recommendedPlan ?? null,
    potentialSaving: Math.max(0, toNumber(values.potentialSaving)),
    status: values.status,
    reason: values.reason,
  };
}

function getActiveAuditableTools(formData) {
  return (formData?.tools || [])
    .map(normalizeTool)
    .filter((tool) => {
      if (!tool.active || !tool.name || !tool.plan || tool.seats === 0) {
        return false;
      }

      if (tool.monthlySpend === 0 && isPaidPlan(tool)) {
        return false;
      }

      return true;
    });
}

// Rule 1 checks whether a plan is mismatched to the user's seat count.
function checkPlanSize(tool) {
  if (isCustomPriced(tool.name, tool.plan)) {
    return null;
  }

  const isOversizedBusinessPlan =
    tool.seats < 5 && BUSINESS_SCALE_PLANS.includes(tool.plan);
  const isOversizedTeamPlan =
    tool.seats <= 2 && TEAM_SCALE_PLANS.includes(tool.plan);

  if (isOversizedBusinessPlan || isOversizedTeamPlan) {
    const recommendedPlan = PAID_PLAN_FALLBACKS[tool.name];
    const recommendedPrice = getPlanPrice(tool.name, recommendedPlan);

    if (recommendedPlan && recommendedPrice !== CUSTOM_PRICE) {
      const recommendedSpend = toNumber(recommendedPrice) * tool.seats;
      const potentialSaving = tool.monthlySpend - recommendedSpend;

      return makeRecommendation(tool, {
        recommendedPlan,
        potentialSaving,
        status: "downgrade",
        reason: `${recommendedPlan} plan at ${formatCurrency(recommendedPrice)}/seat covers smaller teams. ${tool.plan} plan is designed for larger teams.`,
      });
    }
  }

  if (tool.seats >= 5 && SOLO_PLANS.includes(tool.plan)) {
    const recommendedPlan = TEAM_PLAN_FALLBACKS[tool.name];

    if (recommendedPlan) {
      return makeRecommendation(tool, {
        recommendedPlan,
        potentialSaving: 0,
        status: "upgrade",
        reason: `${recommendedPlan} plan is better sized for ${tool.seats} users and gives a larger team more appropriate controls.`,
      });
    }
  }

  return null;
}

// Rule 2 checks whether the user is paying more than the official plan price.
function checkOverpaying(tool) {
  const expectedSpend = getExpectedSpend(tool);

  if (expectedSpend === null) {
    return null;
  }

  if (tool.monthlySpend > expectedSpend + 5) {
    const overspend = tool.monthlySpend - expectedSpend;

    return makeRecommendation(tool, {
      recommendedPlan: null,
      potentialSaving: overspend,
      status: "overpaying",
      reason: `You are paying ${formatCurrency(overspend)} more than the official price for this plan.`,
    });
  }

  return null;
}

// Rule 3 checks overlap across coding assistants and recommends keeping one.
function checkCodingOverlap(tools, useCase) {
  const activeCodingTools = tools.filter((tool) => CODING_TOOLS.includes(tool.name));

  if (activeCodingTools.length < 2) {
    return new Map();
  }

  let preferredToolName = TOOL_NAMES.GITHUB_COPILOT;

  if (useCase === "coding") {
    preferredToolName = TOOL_NAMES.CURSOR;
  }

  const preferredTool = activeCodingTools.find((tool) => tool.name === preferredToolName);
  const keepToolName = (preferredTool || getCheapestActiveTool(activeCodingTools)).name;

  const results = new Map();

  activeCodingTools.forEach((tool) => {
    if (tool.name === keepToolName) {
      return;
    }

    const reason =
      keepToolName === TOOL_NAMES.CURSOR
        ? "Redundant with Cursor for coding workflows. Both tools serve identical purposes - keep Cursor as it is the stronger choice for your use case."
        : `Redundant with ${keepToolName} for your ${useCase || "mixed"} workflow. Keep ${keepToolName} and remove overlapping coding assistants.`;

    results.set(
      tool.name,
      makeRecommendation(tool, {
        recommendedPlan: null,
        potentialSaving: tool.monthlySpend,
        status: "remove",
        reason,
      })
    );
  });

  return results;
}

// Rule 4 checks overlap between ChatGPT and Claude for chat and LLM workflows.
function checkLLMOverlap(tools, useCase) {
  const activeLLMTools = tools.filter((tool) => LLM_TOOLS.includes(tool.name));

  if (activeLLMTools.length < 2 || useCase === "mixed") {
    return new Map();
  }

  const keepToolName =
    useCase === "writing" || useCase === "research"
      ? TOOL_NAMES.CLAUDE
      : TOOL_NAMES.CHATGPT;

  const results = new Map();

  activeLLMTools.forEach((tool) => {
    if (tool.name === keepToolName) {
      return;
    }

    results.set(
      tool.name,
      makeRecommendation(tool, {
        recommendedPlan: null,
        potentialSaving: tool.monthlySpend,
        status: "remove",
        reason: `Potential overlap with ${keepToolName}. For your ${useCase} use case, keep ${keepToolName} and remove the duplicate chat subscription.`,
      })
    );
  });

  return results;
}

// Rule 5 returns an optimal recommendation when no other issue was found.
function checkOptimal(tool) {
  return makeRecommendation(tool, {
    recommendedPlan: null,
    potentialSaving: 0,
    status: "optimal",
    reason: `${tool.plan} plan is correctly sized for ${tool.seats} users and fits your use case.`,
  });
}

function chooseHighestImpactRecommendation(recommendations) {
  return recommendations
    .filter(Boolean)
    .sort((first, second) => second.potentialSaving - first.potentialSaving)[0];
}

export function runAudit(formData) {
  const useCase = formData?.useCase || "mixed";
  const activeTools = getActiveAuditableTools(formData);
  const codingOverlapResults = checkCodingOverlap(activeTools, useCase);
  const llmOverlapResults = checkLLMOverlap(activeTools, useCase);

  const recommendations = activeTools.map((tool) => {
    const selectedRecommendation = chooseHighestImpactRecommendation([
      codingOverlapResults.get(tool.name),
      llmOverlapResults.get(tool.name),
      checkPlanSize(tool),
      checkOverpaying(tool),
    ]);

    return selectedRecommendation || checkOptimal(tool);
  });

  const totalMonthlySavings = recommendations.reduce(
    (total, recommendation) => total + Math.max(0, toNumber(recommendation.potentialSaving)),
    0
  );

  return {
    totalMonthlySavings,
    totalAnnualSavings: totalMonthlySavings * 12,
    isOptimal: recommendations.every((recommendation) => recommendation.status === "optimal"),
    recommendations,
  };
}
