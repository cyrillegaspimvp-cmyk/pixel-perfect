import { createFileRoute } from "@tanstack/react-router";
import { Button, PageHeading, Panel, SectionTitle } from "@/components/ui-bits";
import { promptDiff, promptVersions } from "@/data/mock";

export const Route = createFileRoute("/prompts")({
  head: () => ({
    meta: [
      { title: "Prompt Versions — AgentWatch" },
      { name: "description", content: "Version, compare, and roll out system prompts for each AI assistant." },
      { property: "og:title", content: "Prompt Versions — AgentWatch" },
      {
        property: "og:description",
        content: "Version, compare, and roll out system prompts for each AI assistant.",
      },
    ],
  }),
  component: Prompts,
});

function Prompts() {
  return (
    <>
      <PageHeading
        title="Prompt Versions"
        subtitle="Fix the instruction that caused the incident, then prove the fix with an evaluation run."
        actions={
          <>
            <Button>Compare</Button>
            <Button variant="brand">Deploy v1.2</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Panel>
          <SectionTitle title="Support Assistant" meta="3 versions" />
          <div className="space-y-2">
            {promptVersions.map((p) => (
              <div
                key={p.version}
                className={`flex items-center justify-between rounded-2xl px-4 py-3 ${
                  p.status === "Live" ? "border border-brand/20 bg-brand/8" : "border border-border"
                }`}
              >
                <div>
                  <p className="text-[13px] font-semibold">{p.version}</p>
                  <p className="text-[11px] text-muted-foreground">{p.when}</p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                    p.status === "Live" ? "bg-brand text-brand-foreground" : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="xl:col-span-2">
          <SectionTitle title="Diff · v1.1 → v1.2" meta="Support Assistant" />
          <div className="space-y-1.5 rounded-2xl bg-secondary/70 p-4 text-[13px] leading-relaxed">
            {promptDiff.removed.map((line) => (
              <p key={line} className="rounded-lg bg-rose/10 px-2 py-1 text-rose">
                − {line}
              </p>
            ))}
            {promptDiff.added.map((line) => (
              <p key={line} className="rounded-lg bg-mint/12 px-2 py-1 text-mint">
                + {line}
              </p>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <Button variant="brand">Run evaluation</Button>
            <Button>Roll back</Button>
            <span className="text-[12px] text-muted-foreground">Last run: 46 / 50 passed</span>
          </div>
        </Panel>
      </div>
    </>
  );
}
