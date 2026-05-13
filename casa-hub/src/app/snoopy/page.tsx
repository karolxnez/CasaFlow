"use client";

import { PawPrint } from "lucide-react";
import { AppCard } from "@/components/ui/AppCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { StatusPill } from "@/components/ui/StatusPill";
import { useAppData } from "@/lib/app-data";
import { currency } from "@/lib/format";

export default function SnoopyPage() {
  const { snoopyReminders } = useAppData();
  const foodReminder = snoopyReminders.find((item) => item.title.toLowerCase().includes("racao"));

  return (
    <>
      <PageHeader eyebrow="Rotina pet" title="Snoopy" />
      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Racao atual" value="1,8kg" detail={foodReminder?.date ?? "sem alerta"} icon={PawPrint} tone="bg-coral" />
        <StatCard label="Gastos do mes" value={currency(186.9)} detail="pet shop e racao" icon={PawPrint} tone="bg-skysoft" />
        <StatCard label="Proxima vacina" value="24 jun" detail="lembrar carteira" icon={PawPrint} tone="bg-lilac" />
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <AppCard>
          <h2 className="mb-3 text-xl font-black text-cocoa">Lembretes importantes</h2>
          <div className="space-y-2">
            {snoopyReminders.map((item) => (
              <div key={item.id} className="rounded-[8px] bg-white p-3">
                <div className="flex items-center justify-between gap-2">
                  <strong className="text-cocoa">{item.title}</strong>
                  <StatusPill value={item.urgency} />
                </div>
                <p className="mt-1 text-sm font-semibold text-cocoa/60">{item.date} · {item.detail}</p>
              </div>
            ))}
          </div>
        </AppCard>
        <AppCard>
          <h2 className="mb-3 text-xl font-black text-cocoa">Observacoes de saude</h2>
          <div className="rounded-[8px] bg-cream p-4 text-sm leading-6 text-cocoa/70">
            Apetite normal. Coceira na orelha direita em observacao.
          </div>
        </AppCard>
      </div>
    </>
  );
}
