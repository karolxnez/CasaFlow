import { clsx } from "clsx";

const styles: Record<string, string> = {
  alta: "border-coral/18 bg-coral/8 text-coral",
  media: "border-[color:var(--app-border)] bg-[var(--app-soft)] text-[color:var(--app-muted)]",
  baixa: "border-sage/18 bg-sage/8 text-sage",
  pendente: "border-[color:var(--app-border)] bg-[var(--app-soft)] text-[color:var(--app-muted)]",
  comprado: "border-sage/18 bg-sage/8 text-sage",
  pago: "border-sage/18 bg-sage/8 text-sage",
  atrasado: "border-coral/18 bg-coral/8 text-coral",
  pet: "border-[color:var(--app-border)] bg-[var(--app-soft)] text-[color:var(--app-muted)]",
  viagem: "border-[color:var(--app-border)] bg-[var(--app-soft)] text-[color:var(--app-muted)]",
  evento: "border-[color:var(--app-border)] bg-[var(--app-soft)] text-[color:var(--app-muted)]",
  conta: "border-[color:var(--app-border)] bg-[var(--app-soft)] text-[color:var(--app-muted)]"
};

export function StatusPill({ value, className }: { value: string; className?: string }) {
  return (
    <span className={clsx("inline-flex rounded-full border px-2 py-1 text-[10px] font-semibold uppercase tracking-wide", styles[value] ?? "border-[color:var(--app-border)] bg-[var(--app-soft)] text-[color:var(--app-text)]", className)}>
      {value}
    </span>
  );
}
