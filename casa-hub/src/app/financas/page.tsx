"use client";

import { Target } from "lucide-react";
import { ProgressBar } from "@/components/features/ProgressBar";
import { AppCard } from "@/components/ui/AppCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { StatusPill } from "@/components/ui/StatusPill";
import { useAppData } from "@/lib/app-data";
import { currency } from "@/lib/format";

export default function FinancasPage() {
  const { finances, toggleFinanceStatus, trips, updateTripSaved } = useAppData();
  const total = finances.reduce((sum, item) => sum + item.amount, 0);
  const paid = finances.filter((item) => item.status === "pago").reduce((sum, item) => sum + item.amount, 0);
  const pending = total - paid;
  const trip = trips[0];

  return (
    <>
      <PageHeader eyebrow="Controle mensal" title="Financas" />
      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Total do mes" value={currency(total)} detail="previsto" icon={Target} tone="bg-cocoa" />
        <StatCard label="Ja pago" value={currency(paid)} detail="confirmado" icon={Target} tone="bg-sage" />
        <StatCard label="Pendente" value={currency(pending)} detail="a acompanhar" icon={Target} tone="bg-coral" />
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <AppCard>
          <h2 className="mb-3 text-base font-semibold text-cocoa">Contas</h2>
          <div className="space-y-2">
            {finances.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleFinanceStatus(item.id)}
                className="focus-ring flex w-full items-center justify-between gap-3 rounded-[8px] bg-white p-3 text-left hover:bg-cream"
              >
                <div>
                  <strong className="text-sm font-semibold text-cocoa">{item.title}</strong>
                  <p className="text-xs font-medium text-cocoa/55">{item.category} · vence {item.dueDate}{item.installments ? ` · parcela ${item.installments}` : ""}</p>
                </div>
                <div className="text-right">
                  <strong className="text-sm font-semibold text-cocoa">{currency(item.amount)}</strong>
                  <div className="mt-1"><StatusPill value={item.status} /></div>
                </div>
              </button>
            ))}
          </div>
        </AppCard>
        <AppCard>
          <h2 className="mb-3 text-base font-semibold text-cocoa">Reserva</h2>
          <div className="rounded-[8px] bg-white p-4">
            <strong className="text-sm font-semibold text-cocoa">{trip.destination}</strong>
            <p className="mt-2 text-sm text-cocoa/65">{currency(trip.saved)} de {currency(trip.budget)}</p>
            <div className="mt-3"><ProgressBar value={trip.saved} total={trip.budget} /></div>
            <input
              className="focus-ring mt-4 w-full rounded-[8px] border border-cocoa/10 bg-cream px-3 py-2 text-sm font-semibold text-cocoa"
              type="number"
              min={0}
              value={trip.saved}
              onChange={(event) => updateTripSaved(Number(event.target.value))}
            />
          </div>
        </AppCard>
      </div>
    </>
  );
}
