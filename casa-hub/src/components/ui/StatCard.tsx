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
    <AppCard>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-cocoa/38">{label}</p>
        <strong className="mt-1 block truncate text-lg font-semibold text-cocoa sm:text-[1.15rem]">{value}</strong>
        {detail ? <span className="mt-1 block truncate text-xs font-medium text-cocoa/48">{detail}</span> : null}
      </div>
    </AppCard>
  );
}
