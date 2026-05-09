export const TOOL_NAMES = {
  CURSOR: "Cursor",
  GITHUB_COPILOT: "GitHub Copilot",
  CLAUDE: "Claude",
  CHATGPT: "ChatGPT",
  ANTHROPIC_API: "Anthropic API",
  OPENAI_API: "OpenAI API",
  GEMINI: "Gemini",
  WINDSURF: "Windsurf",
};

export const CUSTOM_PRICE = "custom";

export const PRICING_DATA = {
  [TOOL_NAMES.CURSOR]: {
    plans: {
      Hobby: { monthlyPrice: 0, billingUnit: "account" },
      Pro: { monthlyPrice: 20, billingUnit: "user" },
      Business: { monthlyPrice: 40, billingUnit: "user" },
      Enterprise: { monthlyPrice: CUSTOM_PRICE, billingUnit: "custom" },
    },
  },
  [TOOL_NAMES.GITHUB_COPILOT]: {
    plans: {
      Individual: { monthlyPrice: 10, billingUnit: "user" },
      Business: { monthlyPrice: 19, billingUnit: "user" },
      Enterprise: { monthlyPrice: 39, billingUnit: "user" },
    },
  },
  [TOOL_NAMES.CLAUDE]: {
    plans: {
      Free: { monthlyPrice: 0, billingUnit: "account" },
      Pro: { monthlyPrice: 20, billingUnit: "user" },
      Max: { monthlyPrice: 100, billingUnit: "user" },
      Team: { monthlyPrice: 25, billingUnit: "user" },
      Enterprise: { monthlyPrice: CUSTOM_PRICE, billingUnit: "custom" },
      API: { monthlyPrice: CUSTOM_PRICE, billingUnit: "usage" },
    },
  },
  [TOOL_NAMES.CHATGPT]: {
    plans: {
      Free: { monthlyPrice: 0, billingUnit: "account" },
      Plus: { monthlyPrice: 20, billingUnit: "user" },
      Team: { monthlyPrice: 25, billingUnit: "user" },
      Enterprise: { monthlyPrice: CUSTOM_PRICE, billingUnit: "custom" },
      API: { monthlyPrice: CUSTOM_PRICE, billingUnit: "usage" },
    },
  },
  [TOOL_NAMES.ANTHROPIC_API]: {
    plans: {
      "Pay as you go": { monthlyPrice: CUSTOM_PRICE, billingUnit: "usage" },
    },
  },
  [TOOL_NAMES.OPENAI_API]: {
    plans: {
      "Pay as you go": { monthlyPrice: CUSTOM_PRICE, billingUnit: "usage" },
    },
  },
  [TOOL_NAMES.GEMINI]: {
    plans: {
      Free: { monthlyPrice: 0, billingUnit: "account" },
      "One AI Pro": { monthlyPrice: 19.99, billingUnit: "user" },
      "One AI Ultra": { monthlyPrice: 249.99, billingUnit: "user" },
      API: { monthlyPrice: CUSTOM_PRICE, billingUnit: "usage" },
    },
  },
  [TOOL_NAMES.WINDSURF]: {
    plans: {
      Free: { monthlyPrice: 0, billingUnit: "account" },
      Pro: { monthlyPrice: 15, billingUnit: "user" },
      Teams: { monthlyPrice: 35, billingUnit: "user" },
    },
  },
};

export const DEFAULT_TOOLS = Object.entries(PRICING_DATA).map(([name, config]) => ({
  name,
  active: false,
  plan: Object.keys(config.plans)[0],
  seats: 1,
  monthlySpend: 0,
}));

export const USE_CASES = [
  { label: "Coding", value: "coding" },
  { label: "Writing", value: "writing" },
  { label: "Data Analysis", value: "data_analysis" },
  { label: "Research", value: "research" },
  { label: "Mixed", value: "mixed" },
];

export function getPlanOptions(toolName) {
  return Object.keys(PRICING_DATA[toolName]?.plans || {});
}

export function getPlanPrice(toolName, planName) {
  return PRICING_DATA[toolName]?.plans?.[planName]?.monthlyPrice ?? null;
}

export function isCustomPriced(toolName, planName) {
  return getPlanPrice(toolName, planName) === CUSTOM_PRICE;
}
