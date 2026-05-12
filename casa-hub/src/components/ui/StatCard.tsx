import { LucideIcon } from "lucide-react";
import { AppCard } from "./AppCard";

type StatCardProps = {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  tone?: string;
};

export function StatCard({ label, value, detail, icon: Icon, tone = "bg-coral" }: StatCardProps) {
  return (
    <AppCard>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-cocoa/60">{label}</p>
          <strong className="mt-1 block text-2xl text-cocoa">{value}</strong>
          <span className="mt-1 block text-xs font-semibold text-cocoa/55">{detail}</span>
        </div>
        <span className={`flex h-10 w-10 items-center justify-center rounded-[8px] text-white ${tone}`}>
          <Icon size={20} />
        </span>
      </div>
    </AppCard>
  );
}
