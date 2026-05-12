import { Target } from "lucide-react";
import { ProgressBar } from "@/components/features/ProgressBar";
import { AppCard } from "@/components/ui/AppCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { StatusPill } from "@/components/ui/StatusPill";
import { finances, trips } from "@/data/mock";
import { currency } from "@/lib/format";

export default function FinancasPage() {
  const total = finances.reduce((sum, item) => sum + item.amount, 0);
  const paid = finances.filter((item) => item.status === "pago").reduce((sum, item) => sum + item.amount, 0);
  const pending = total - paid;

  return (
    <>
      <PageHeader eyebrow="Controle mensal" title="Financas" description="Contas fixas, parcelas, gastos da casa, metas e viagem em uma visao simples." />
      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Total do mes" value={currency(total)} detail="previsto" icon={Target} tone="bg-cocoa" />
        <StatCard label="Ja pago" value={currency(paid)} detail="confirmado" icon={Target} tone="bg-sage" />
        <StatCard label="Pendente" value={currency(pending)} detail="a acompanhar" icon={Target} tone="bg-coral" />
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <AppCard>
          <h2 className="mb-3 text-xl font-black text-cocoa">Contas e parcelas</h2>
          <div className="space-y-2">
            {finances.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-3 rounded-[8px] bg-white p-3">
                <div>
                  <strong className="text-cocoa">{item.title}</strong>
                  <p className="text-xs font-semibold text-cocoa/55">{item.category} · vence {item.dueDate}{item.installments ? ` · parcela ${item.installments}` : ""}</p>
                </div>
                <div className="text-right">
                  <strong className="text-cocoa">{currency(item.amount)}</strong>
                  <div className="mt-1"><StatusPill value={item.status} /></div>
                </div>
              </div>
            ))}
          </div>
        </AppCard>
        <AppCard>
          <h2 className="mb-3 text-xl font-black text-cocoa">Meta da viagem</h2>
          <div className="rounded-[8px] bg-white p-4">
            <strong className="text-cocoa">{trips[0].destination}</strong>
            <p className="mt-2 text-sm text-cocoa/65">{currency(trips[0].saved)} de {currency(trips[0].budget)}</p>
            <div className="mt-3"><ProgressBar value={trips[0].saved} total={trips[0].budget} /></div>
          </div>
        </AppCard>
      </div>
    </>
  );
}
