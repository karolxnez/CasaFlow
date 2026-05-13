import { LucideIcon } from "lucide-react";
import { AppCard } from "./AppCard";

type StatCardProps = {
  label: string;
  value: string;
  detail?: string;
  icon: LucideIcon;
  tone?: string;
};

export function StatCard({ label, value, detail }: StatCardProps) {
  return (
    <AppCard className="bg-[var(--app-surface)]">
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[color:var(--app-muted)]">{label}</p>
        <strong className="mt-1 block truncate text-lg font-semibold text-[color:var(--app-text)] sm:text-[1.15rem]">{value}</strong>
        {detail ? <span className="mt-1 block truncate text-xs font-medium text-[color:var(--app-muted)]">{detail}</span> : null}
      </div>
    </AppCard>
  );
}
