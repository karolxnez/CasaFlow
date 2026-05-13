"use client";

import { CheckCircle2 } from "lucide-react";
import { ProgressBar } from "@/components/features/ProgressBar";
import { AppCard } from "@/components/ui/AppCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusPill } from "@/components/ui/StatusPill";
import { useAppData } from "@/lib/app-data";
import { currency } from "@/lib/format";

export default function ViagensPage() {
  const { trips, updateTripSaved } = useAppData();
  const trip = trips[0];
  return (
    <>
      <PageHeader eyebrow="Planos" title="Viagens" />
      <AppCard>
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <StatusPill value={trip.status} />
            <h2 className="mt-3 text-3xl font-black text-cocoa">{trip.destination}</h2>
            <p className="mt-2 text-sm font-semibold text-cocoa/60">{trip.dates}</p>
            <div className="mt-5 rounded-[8px] bg-white p-4">
              <p className="text-sm font-bold text-cocoa/60">Guardado</p>
              <strong className="text-2xl text-cocoa">{currency(trip.saved)}</strong>
              <p className="mt-1 text-sm text-cocoa/60">orcamento previsto: {currency(trip.budget)}</p>
              <div className="mt-3"><ProgressBar value={trip.saved} total={trip.budget} /></div>
              <input
                className="focus-ring mt-4 w-full rounded-[8px] border border-cocoa/10 bg-cream px-3 py-2 text-sm font-semibold text-cocoa"
                type="number"
                min={0}
                value={trip.saved}
                onChange={(event) => updateTripSaved(Number(event.target.value))}
              />
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-xl font-black text-cocoa">Checklist</h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {trip.checklist.map((item, index) => (
                <div key={item} className="flex items-center gap-2 rounded-[8px] bg-white p-3">
                  <CheckCircle2 className={index < 1 ? "text-sage" : "text-cocoa/25"} size={20} />
                  <span className="text-sm font-bold text-cocoa">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AppCard>
    </>
  );
}
