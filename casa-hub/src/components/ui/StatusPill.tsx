import { clsx } from "clsx";

const styles: Record<string, string> = {
  alta: "border-coral/20 bg-coral/8 text-coral",
  media: "border-cocoa/10 bg-cocoa/[0.03] text-cocoa/68",
  baixa: "border-sage/20 bg-sage/8 text-sage",
  pendente: "border-cocoa/10 bg-cocoa/[0.03] text-cocoa/68",
  comprado: "border-sage/18 bg-sage/8 text-sage",
  pago: "border-sage/18 bg-sage/8 text-sage",
  atrasado: "border-coral/20 bg-coral/8 text-coral",
  pet: "border-cocoa/10 bg-cocoa/[0.03] text-cocoa/68",
  viagem: "border-cocoa/10 bg-cocoa/[0.03] text-cocoa/68",
  evento: "border-cocoa/10 bg-cocoa/[0.03] text-cocoa/68",
  conta: "border-cocoa/10 bg-cocoa/[0.03] text-cocoa/68"
};

export function StatusPill({ value, className }: { value: string; className?: string }) {
  return (
    <span className={clsx("inline-flex rounded-[8px] border px-2 py-1 text-[10px] font-semibold uppercase tracking-wide", styles[value] ?? "border-cocoa/10 bg-cocoa/5 text-cocoa", className)}>
      {value}
    </span>
  );
}
