import { clsx } from "clsx";

const styles: Record<string, string> = {
  alta: "bg-coral/15 text-coral",
  media: "bg-honey/25 text-cocoa",
  baixa: "bg-sage/15 text-sage",
  pendente: "bg-honey/25 text-cocoa",
  comprado: "bg-sage/15 text-sage",
  pago: "bg-sage/15 text-sage",
  atrasado: "bg-coral/15 text-coral",
  pet: "bg-lilac/15 text-lilac",
  viagem: "bg-skysoft/15 text-skysoft",
  evento: "bg-sage/15 text-sage",
  conta: "bg-honey/25 text-cocoa"
};

export function StatusPill({ value, className }: { value: string; className?: string }) {
  return (
    <span className={clsx("inline-flex rounded-[8px] px-2.5 py-1 text-xs font-black uppercase", styles[value] ?? "bg-cocoa/10 text-cocoa", className)}>
      {value}
    </span>
  );
}
