import { Link } from "@tanstack/react-router";

const nav = [
  { label: "Overview", to: "/" },
  { label: "Incidents", to: "/incidents" },
  { label: "Prompts", to: "/prompts" },
  { label: "Evals", to: "/evals" },
  { label: "Audit", to: "/audit" },
] as const;

export function AppHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-card/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-6 px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-brand font-display text-lg font-bold text-brand-foreground">
            A
          </span>
          <span className="leading-tight">
            <span className="block font-display text-[15px] font-bold">AgentWatch</span>
            <span className="-mt-0.5 block text-[11px] text-muted-foreground">AI Ops &amp; QA Console</span>
          </span>
        </Link>

        <nav className="ml-4 hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-full px-3.5 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-secondary"
              activeProps={{ className: "bg-brand text-brand-foreground font-semibold hover:bg-brand" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-[12px] text-muted-foreground md:flex">
            <span className="size-1.5 rounded-full bg-mint" />3 of 4 agents active
          </div>
          <span className="grid size-9 place-items-center rounded-full bg-accent/15 font-display text-sm font-bold text-accent">
            CL
          </span>
        </div>
      </div>
    </header>
  );
}
