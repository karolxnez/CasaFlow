import { CalendarDays, Clapperboard, CreditCard, ListChecks, Luggage, PawPrint } from "lucide-react";
import { AppCard } from "@/components/ui/AppCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { StatusPill } from "@/components/ui/StatusPill";
import { calendarEvents, finances, shoppingItems, snoopyReminders, trips, watchList } from "@/data/mock";
import { currency } from "@/lib/format";

export default function DashboardPage() {
  const total = finances.reduce((sum, item) => sum + item.amount, 0);
  const paid = finances.filter((item) => item.status === "pago").reduce((sum, item) => sum + item.amount, 0);
  const urgentShopping = shoppingItems.filter((item) => item.priority === "alta" || item.status === "pendente").slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow="Bom dia, casa"
        title="Inicio"
        description="Um resumo rapido do que precisa de atencao hoje: contas, Snoopy, compras, filmes e planos da casa."
      />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total do mes" value={currency(total)} detail={`${currency(paid)} ja pago`} icon={CreditCard} tone="bg-skysoft" />
        <StatCard label="Compras pendentes" value={`${urgentShopping.length}`} detail="inclui itens urgentes" icon={ListChecks} tone="bg-coral" />
        <StatCard label="Eventos proximos" value={`${calendarEvents.length}`} detail="agenda compartilhada" icon={CalendarDays} tone="bg-sage" />
        <StatCard label="Viagem" value={trips[0].destination} detail={`${currency(trips[0].saved)} guardados`} icon={Luggage} tone="bg-lilac" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <AppCard className="lg:col-span-2">
          <h2 className="mb-3 text-xl font-black text-cocoa">Proximas prioridades</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {finances.slice(1, 4).map((item) => (
              <div key={item.id} className="rounded-[8px] bg-cream p-3">
                <div className="flex items-center justify-between gap-2">
                  <strong className="text-cocoa">{item.title}</strong>
                  <StatusPill value={item.status} />
                </div>
                <p className="mt-1 text-sm font-semibold text-cocoa/60">{item.dueDate} · {currency(item.amount)}</p>
              </div>
            ))}
            {urgentShopping.map((item) => (
              <div key={item.id} className="rounded-[8px] bg-white p-3">
                <div className="flex items-center justify-between gap-2">
                  <strong className="text-cocoa">{item.name}</strong>
                  <StatusPill value={item.priority} />
                </div>
                <p className="mt-1 text-sm font-semibold text-cocoa/60">{item.quantity} · {item.category}</p>
              </div>
            ))}
          </div>
        </AppCard>

        <AppCard>
          <h2 className="mb-3 flex items-center gap-2 text-xl font-black text-cocoa"><PawPrint size={20} /> Snoopy</h2>
          <div className="space-y-2">
            {snoopyReminders.map((item) => (
              <div key={item.id} className="rounded-[8px] bg-white p-3">
                <div className="flex items-center justify-between gap-2">
                  <strong className="text-sm text-cocoa">{item.title}</strong>
                  <StatusPill value={item.urgency} />
                </div>
                <p className="mt-1 text-xs font-semibold text-cocoa/55">{item.date} · {item.detail}</p>
              </div>
            ))}
          </div>
        </AppCard>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <AppCard>
          <h2 className="mb-3 flex items-center gap-2 text-xl font-black text-cocoa"><Clapperboard size={20} /> Filmes e series</h2>
          {watchList.slice(0, 3).map((item) => (
            <div key={item.id} className="mb-2 flex items-center justify-between rounded-[8px] bg-white p-3 last:mb-0">
              <div>
                <strong className="text-cocoa">{item.title}</strong>
                <p className="text-xs font-semibold text-cocoa/55">{item.platform} · sugerido por {item.suggestedBy}</p>
              </div>
              <StatusPill value={item.status} />
            </div>
          ))}
        </AppCard>
        <AppCard>
          <h2 className="mb-3 text-xl font-black text-cocoa">Planejamento de viagens</h2>
          <div className="rounded-[8px] bg-white p-4">
            <strong className="text-cocoa">{trips[0].destination}</strong>
            <p className="mt-1 text-sm font-semibold text-cocoa/60">{trips[0].dates} · {trips[0].status}</p>
            <p className="mt-3 text-sm text-cocoa/70">Orcamento: {currency(trips[0].budget)} · guardado: {currency(trips[0].saved)}</p>
          </div>
        </AppCard>
      </div>
    </>
  );
}
