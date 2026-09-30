import type { ReactNode } from "react";
import type { Severity } from "@/data/mock";

export function PageHeading({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-[40px] leading-none font-bold tracking-tight">{title}</h1>
        <p className="mt-2 text-[14px] text-muted-foreground">{subtitle}</p>
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </div>
  );
}

export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`panel p-6 ${className}`}>{children}</section>;
}

export function SectionTitle({ title, meta }: { title: string; meta?: string }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="font-display text-[15px] font-semibold">{title}</h2>
      {meta ? <span className="text-[12px] text-muted-foreground">{meta}</span> : null}
    </div>
  );
}

const severityStyles: Record<Severity, { dot: string; pill: string; label: string }> = {
  critical: { dot: "bg-rose", pill: "bg-rose/10 text-rose", label: "Critical" },
  warning: { dot: "bg-amber", pill: "bg-amber/12 text-amber", label: "Warning" },
  info: { dot: "bg-brand", pill: "bg-brand/10 text-brand", label: "Info" },
  resolved: { dot: "bg-mint", pill: "bg-mint/12 text-mint", label: "Resolved" },
};

export function SeverityDot({ severity }: { severity: Severity }) {
  return <span className={`mt-1.5 size-2 shrink-0 rounded-full ${severityStyles[severity].dot}`} />;
}

export function SeverityPill({ severity, text }: { severity: Severity; text?: string }) {
  const s = severityStyles[severity];
  return (
    <span className={`pill ${s.pill}`}>
      <span className={`size-1.5 rounded-full ${s.dot}`} />
      {text ?? s.label}
    </span>
  );
}

export function Button({
  children,
  variant = "ghost",
}: {
  children: ReactNode;
  variant?: "brand" | "ink" | "danger" | "ghost";
}) {
  const styles = {
    brand: "bg-brand text-brand-foreground shadow-brand",
    ink: "bg-foreground text-background",
    danger: "bg-rose text-destructive-foreground",
    ghost: "bg-card border border-border text-foreground hover:bg-secondary",
  }[variant];
  return (
    <button type="button" className={`rounded-full px-4 py-2.5 text-[13px] font-semibold transition-opacity hover:opacity-90 ${styles}`}>
      {children}
    </button>
  );
}

export function Meter({ label, value, percent, tone }: { label: string; value: string; percent: number; tone: string }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-[13px]">
        <span className="font-medium">{label}</span>
        <span className="font-display font-bold">{value}</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-secondary">
        <div className={`h-full rounded-full ${tone}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
