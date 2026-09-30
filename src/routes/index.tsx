import { createFileRoute, Link } from "@tanstack/react-router";
import { Button, Meter, Panel, PageHeading, SectionTitle, SeverityDot, SeverityPill } from "@/components/ui-bits";
import { agents, evalCategories, incidents, promptVersions, qaVerdict, todayActivity, transcript } from "@/data/mock";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Operator Dashboard — AgentWatch" },
      {
        name: "description",
        content: "Live view of the agent fleet, QA signals, incidents, and the conversation under inspection.",
      },
      { property: "og:title", content: "Operator Dashboard — AgentWatch" },
      {
        property: "og:description",
        content: "Live view of the agent fleet, QA signals, incidents, and the conversation under inspection.",
      },
    ],
  }),
  component: Overview,
});

function Overview() {
  const activeCount = agents.filter((a) => a.state === "active").length;

  return (
    <>
      <PageHeading
        title="Operator Dashboard"
        subtitle="Live view of your agent fleet, quality signals, and the conversation you're inspecting."
        actions={
          <>
            <Button variant="ink">Export report</Button>
            <Button variant="brand">New review</Button>
          </>
        }
      />

      <section className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-[15px] font-semibold">Agent status</h2>
          <span className="text-[12px] text-muted-foreground">
            {activeCount} of {agents.length} active
          </span>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {agents.map((agent) => (
            <div key={agent.id} className="panel p-5">
              <div className="flex items-center justify-between">
                <span className="font-display text-[15px] font-semibold">{agent.name}</span>
                {agent.state === "active" ? (
                  <span className="pill bg-mint/12 text-mint">
                    <span className="pulse-dot size-1.5 rounded-full bg-mint" />
                    Active
                  </span>
                ) : (
                  <span className="pill bg-amber/12 text-amber">
                    <span className="pulse-dot size-1.5 rounded-full bg-amber" />
                    Paused
                  </span>
                )}
              </div>
              <p className="mt-1 text-[12px] text-muted-foreground">{agent.scope}</p>
              <div className="mt-4 flex items-end gap-2">
                <span className="font-display text-3xl font-bold">{agent.passRate}</span>
                <span className="mb-1 text-[11px] text-muted-foreground">QA pass rate</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 font-display text-[15px] font-semibold">Today's activity</h2>
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
          {todayActivity.map((m) => (
            <div key={m.label} className="panel p-5">
              <p className="text-[12px] text-muted-foreground">{m.label}</p>
              <p className="mt-2 font-display text-4xl font-bold">{m.value}</p>
              <p className={`mt-1 text-[12px] font-semibold ${m.tone === "mint" ? "text-mint" : "text-rose"}`}>{m.delta}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Panel className="xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-display text-[16px] font-semibold">Conversation inspector</h2>
              <p className="text-[12px] text-muted-foreground">Ticket #48213 · Support Assistant · 2m ago</p>
            </div>
            <span className="rounded-full bg-secondary px-3 py-1.5 text-[11px] font-semibold text-muted-foreground">
              Transcript
            </span>
          </div>

          <div className="space-y-3">
            {transcript.map((m, i) => (
              <div key={i} className={`flex ${m.role === "customer" ? "justify-start" : "justify-end"}`}>
                <div
                  className={
                    m.role === "customer"
                      ? "max-w-[75%] rounded-2xl rounded-tl-sm bg-secondary px-4 py-2.5"
                      : "max-w-[75%] rounded-2xl rounded-tr-sm bg-brand px-4 py-2.5 text-brand-foreground"
                  }
                >
                  <p className="text-[13px]">{m.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-rose/20 bg-rose/8 p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-display text-[14px] font-semibold">QA verdict · {qaVerdict.issue}</h3>
              <span className="rounded-full bg-rose px-3 py-1 text-[11px] font-bold text-destructive-foreground">
                {qaVerdict.severity}
              </span>
            </div>
            <p className="mb-4 text-[13px] text-muted-foreground">
              <span className="font-semibold text-foreground">Reason:</span> {qaVerdict.reason}
            </p>
            <div className="mb-4">
              <p className="mb-1.5 text-[11px] tracking-wider text-muted-foreground uppercase">Evidence</p>
              <div className="space-y-1.5">
                {qaVerdict.evidence.map((e) => (
                  <blockquote key={e} className="border-l-2 border-rose pl-3 text-[13px] text-muted-foreground italic">
                    "{e}"
                  </blockquote>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="danger">Pause agent</Button>
              <Button variant="ink">Take over</Button>
              <Button>Dismiss</Button>
            </div>
          </div>
        </Panel>

        <div className="space-y-6">
          <section className="panel p-5">
            <SectionTitle title="Recent incidents" meta="last 24h" />
            <div className="space-y-3">
              {incidents.slice(0, 4).map((inc) => (
                <div key={inc.id} className="flex gap-3">
                  <SeverityDot severity={inc.severity} />
                  <div>
                    <p className="text-[13px] font-medium">{inc.title}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {inc.agent} · {inc.meta}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/incidents" className="mt-4 inline-block text-[12px] font-semibold text-brand">
              View all incidents
            </Link>
          </section>

          <section className="panel p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-[15px] font-semibold">Prompt versions</h2>
              <Link to="/prompts" className="text-[12px] font-semibold text-brand">
                Manage
              </Link>
            </div>
            <div className="space-y-2">
              {promptVersions.map((p) => (
                <div
                  key={p.version}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3 ${
                    p.status === "Live" ? "border border-brand/20 bg-brand/8" : "border border-border"
                  }`}
                >
                  <div>
                    <p className="text-[13px] font-semibold">
                      {p.version} · {p.name}
                    </p>
                    <p className="text-[11px] text-muted-foreground">{p.when}</p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                      p.status === "Live"
                        ? "bg-brand text-brand-foreground"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Panel className="xl:col-span-2">
          <SectionTitle title="Evaluation suite" meta="Run #220 · 50 cases" />
          <div className="space-y-4">
            {evalCategories.map((c) => (
              <Meter
                key={c.label}
                label={c.label}
                value={`${c.passed}/${c.total}`}
                percent={(c.passed / c.total) * 100}
                tone={c.passed === c.total ? "bg-mint" : c.passed >= 9 ? "bg-brand" : "bg-amber"}
              />
            ))}
          </div>
          <Link to="/evals" className="mt-5 inline-block text-[12px] font-semibold text-brand">
            Open evaluation suite
          </Link>
        </Panel>

        <Panel>
          <SectionTitle title="Audit trail" meta="today" />
          <div className="relative pl-5">
            <span className="absolute top-1 bottom-1 left-[5px] w-px bg-border" />
            <div className="space-y-5">
              {[
                { s: "critical" as const, t: "Support Assistant paused", m: "19:32:18 · by Cyril" },
                { s: "info" as const, t: "Prompt v1.2 deployed", m: "19:35:44 · by Cyril" },
                { s: "warning" as const, t: "Eval suite #220 run", m: "19:36:10 · by scheduler" },
                { s: "resolved" as const, t: "Support Assistant resumed", m: "19:37:01 · by Cyril" },
              ].map((e) => (
                <div key={e.t} className="relative">
                  <span className="absolute top-1 -left-[19px] size-3 rounded-full bg-card ring-4 ring-card">
                    <SeverityDot severity={e.s} />
                  </span>
                  <p className="text-[13px] font-medium">{e.t}</p>
                  <p className="text-[11px] text-muted-foreground">{e.m}</p>
                </div>
              ))}
            </div>
          </div>
          <Link to="/audit" className="mt-5 inline-block text-[12px] font-semibold text-brand">
            Full audit log
          </Link>
        </Panel>
      </div>
    </>
  );
}
