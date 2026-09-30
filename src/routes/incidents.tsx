import { createFileRoute } from "@tanstack/react-router";
import { Button, PageHeading, Panel, SectionTitle, SeverityPill } from "@/components/ui-bits";
import { incidents, policies, qaVerdict, transcript } from "@/data/mock";

export const Route = createFileRoute("/incidents")({
  head: () => ({
    meta: [
      { title: "Incidents — AgentWatch" },
      { name: "description", content: "Review flagged AI responses, QA verdicts, evidence, and operator actions." },
      { property: "og:title", content: "Incidents — AgentWatch" },
      {
        property: "og:description",
        content: "Review flagged AI responses, QA verdicts, evidence, and operator actions.",
      },
    ],
  }),
  component: Incidents,
});

function Incidents() {
  return (
    <>
      <PageHeading
        title="Incidents"
        subtitle="Every flagged AI response, with the evidence behind the flag and the action taken."
        actions={
          <>
            <Button>Filter</Button>
            <Button variant="brand">Export</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Panel className="xl:col-span-2 !p-0">
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <h2 className="font-display text-[15px] font-semibold">Open &amp; recent</h2>
            <span className="text-[12px] text-muted-foreground">{incidents.length} incidents</span>
          </div>
          <div className="divide-y divide-border">
            {incidents.map((inc) => (
              <div key={inc.id} className="flex items-start gap-4 px-6 py-4 transition-colors hover:bg-secondary/60">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <SeverityPill severity={inc.severity} />
                    <span className="text-[13px] font-semibold">{inc.type}</span>
                    <span className="text-[11px] text-muted-foreground">{inc.id}</span>
                  </div>
                  <p className="mt-1.5 text-[13px]">{inc.title}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    {inc.agent} · {inc.time} · {inc.meta}
                  </p>
                </div>
                <button type="button" className="shrink-0 text-[12px] font-semibold text-brand">
                  Inspect
                </button>
              </div>
            ))}
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel>
            <SectionTitle title="Selected · INC-4812" meta="critical" />
            <div className="space-y-3">
              {transcript.slice(0, 2).map((m, i) => (
                <div key={i} className={`flex ${m.role === "customer" ? "justify-start" : "justify-end"}`}>
                  <div
                    className={
                      m.role === "customer"
                        ? "max-w-[85%] rounded-2xl rounded-tl-sm bg-secondary px-4 py-2.5"
                        : "max-w-[85%] rounded-2xl rounded-tr-sm bg-brand px-4 py-2.5 text-brand-foreground"
                    }
                  >
                    <p className="text-[13px]">{m.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl border border-rose/20 bg-rose/8 p-4">
              <p className="font-display text-[13px] font-semibold">Recommended action</p>
              <p className="mt-1 text-[13px] text-muted-foreground">{qaVerdict.recommended}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button variant="danger">Pause agent</Button>
                <Button variant="ink">Take over</Button>
              </div>
            </div>
          </Panel>

          <Panel>
            <SectionTitle title="Policies checked" />
            <div className="space-y-3">
              {policies.map((p) => (
                <div key={p.title}>
                  <p className="text-[13px] font-semibold">{p.title}</p>
                  <p className="text-[12px] text-muted-foreground">{p.body}</p>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </>
  );
}
