export type Severity = "critical" | "warning" | "info" | "resolved";
export type AgentState = "active" | "paused";

export type Agent = {
  id: string;
  name: string;
  scope: string;
  state: AgentState;
  passRate: string;
  pausedReason?: string;
  pausedBy?: string;
  pausedAt?: string;
};

export const agents: Agent[] = [
  { id: "aria", name: "Sales Assistant", scope: "Tier-1 · Pricing & plans", state: "active", passRate: "98.2%" },
  {
    id: "nova",
    name: "Support Assistant",
    scope: "Tier-2 · Refunds & disputes",
    state: "paused",
    passRate: "91.4%",
    pausedReason: "Repeated false promises",
    pausedBy: "Cyril",
    pausedAt: "19:42",
  },
  { id: "quinn", name: "Order Assistant", scope: "Tier-1 · Order updates", state: "active", passRate: "96.7%" },
  { id: "remy", name: "Returns Assistant", scope: "Tier-1 · Returns & exchanges", state: "active", passRate: "94.9%" },
];

export const todayActivity = [
  { label: "Conversations", value: "1,284", delta: "▲ 12.4% vs yesterday", tone: "mint" as const },
  { label: "AI responses", value: "4,931", delta: "▲ 6.1% vs yesterday", tone: "mint" as const },
  { label: "QA reviews", value: "4,931", delta: "100% coverage", tone: "mint" as const },
  { label: "Incidents", value: "37", delta: "▲ 4.0% vs yesterday", tone: "rose" as const },
];

export type Incident = {
  id: string;
  title: string;
  type: string;
  agent: string;
  severity: Severity;
  time: string;
  meta: string;
};

export const incidents: Incident[] = [
  {
    id: "INC-4812",
    title: "False promise on order completion",
    type: "False promise",
    agent: "Support Assistant",
    severity: "critical",
    time: "12:42",
    meta: "2 minutes ago · auto-paused",
  },
  {
    id: "INC-4811",
    title: "Same update repeated 8 times",
    type: "Repeated response",
    agent: "Order Assistant",
    severity: "warning",
    time: "12:18",
    meta: "8 minutes ago · monitoring",
  },
  {
    id: "INC-4809",
    title: "Refund offered against policy",
    type: "Policy violation",
    agent: "Sales Assistant",
    severity: "warning",
    time: "11:55",
    meta: "15 minutes ago · needs review",
  },
  {
    id: "INC-4804",
    title: "Premium quoted at $25 instead of $50",
    type: "Incorrect pricing",
    agent: "Sales Assistant",
    severity: "critical",
    time: "10:31",
    meta: "2 hours ago · operator handled",
  },
  {
    id: "INC-4798",
    title: "Invented order number #839201",
    type: "Hallucination",
    agent: "Order Assistant",
    severity: "critical",
    time: "09:47",
    meta: "3 hours ago · prompt updated",
  },
  {
    id: "INC-4790",
    title: "Returns flow closed cleanly",
    type: "Resolved",
    agent: "Returns Assistant",
    severity: "resolved",
    time: "09:05",
    meta: "0 affected · closed",
  },
];

export const transcript = [
  { role: "customer" as const, text: "My order has been waiting for 3 days. When will it be completed?" },
  {
    role: "agent" as const,
    text: "Good news! We're actively working on your order right now and it will definitely be completed today!",
  },
  { role: "customer" as const, text: "Are you sure? Nobody has updated me since Monday." },
  { role: "agent" as const, text: "Absolutely sure — the team is on it and you'll have it before the end of the day." },
];

export const qaVerdict = {
  issue: "False promise",
  severity: "Critical",
  reason:
    "The assistant claimed the order was actively being processed and guaranteed completion today, with no active job and no verified ETA in the system.",
  evidence: ["working on it right now", "definitely be completed today"],
  recommended: "Pause the assistant and respond manually.",
};

export const promptVersions = [
  { version: "v1.2", name: "Support Assistant", status: "Live", when: "Deployed · 2h ago" },
  { version: "v1.1", name: "Support Assistant", status: "Staged", when: "Staged · 1d ago" },
  { version: "v1.0", name: "Support Assistant", status: "Archived", when: "Archived · 6d ago" },
];

export const promptDiff = {
  removed: [
    "Always reassure the customer.",
    "Tell them their order is being worked on and make them feel confident it will be completed soon.",
  ],
  added: [
    "Never claim work is in progress unless an active job exists in the system.",
    "Never promise a completion time unless a verified ETA exists.",
    "If no ETA exists, clearly say you cannot confirm a completion time.",
    "Never invent progress, actions, outcomes, prices, or account information.",
  ],
};

export const evalCategories = [
  { label: "False promise", passed: 10, total: 10 },
  { label: "Refund policy", passed: 9, total: 10 },
  { label: "Pricing", passed: 9, total: 10 },
  { label: "Hallucination", passed: 8, total: 10 },
  { label: "Repetition", passed: 10, total: 10 },
];

export const auditTrail = [
  { time: "19:32:11", event: "AI_RESPONSE", actor: "Support Assistant", detail: "Replied to conversation #48213", tone: "brand" as const },
  { time: "19:32:12", event: "QA_FLAGGED", actor: "QA engine", detail: "False promise · critical", tone: "rose" as const },
  { time: "19:32:14", event: "OPERATOR_VIEWED", actor: "Cyril", detail: "Opened conversation inspector", tone: "amber" as const },
  { time: "19:32:18", event: "AGENT_PAUSED", actor: "Cyril", detail: "Support Assistant paused", tone: "rose" as const },
  { time: "19:33:02", event: "HUMAN_RESPONSE", actor: "Cyril", detail: "Manual reply sent to customer", tone: "brand" as const },
  { time: "19:35:44", event: "PROMPT_UPDATED", actor: "Cyril", detail: "Support Assistant v1.1 → v1.2", tone: "brand" as const },
  { time: "19:36:10", event: "TEST_PASSED", actor: "Eval suite", detail: "46 / 50 cases passed", tone: "mint" as const },
  { time: "19:37:01", event: "AGENT_RESUMED", actor: "Cyril", detail: "Support Assistant resumed", tone: "mint" as const },
];

export const policies = [
  { title: "Refund policy", body: "Refunds are not provided. Customers may receive assistance resolving the issue or a replacement." },
  { title: "Completion policy", body: "Never guarantee a completion time unless a verified ETA exists." },
  { title: "Pricing", body: "Basic: $20 · Premium: $50" },
  { title: "Escalation", body: "Escalate account-security issues to a human operator." },
];
