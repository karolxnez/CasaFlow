import { CheckCircle2 } from "lucide-react";
import { ProgressBar } from "@/components/features/ProgressBar";
import { AppCard } from "@/components/ui/AppCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusPill } from "@/components/ui/StatusPill";
import { trips } from "@/data/mock";
import { currency } from "@/lib/format";

export default function ViagensPage() {
  const trip = trips[0];
  return (
    <>
      <PageHeader eyebrow="Planos bons" title="Viagens" description="Destino, orcamento, parcelas, checklist e datas importantes para sair de casa sem correria." />
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
