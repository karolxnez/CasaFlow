"use client";

import { CalendarDays, Check, CreditCard, ListChecks, Luggage, PawPrint } from "lucide-react";
import { AppCard } from "@/components/ui/AppCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { StatusPill } from "@/components/ui/StatusPill";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { getHomeInsights } from "@/lib/home-insights";
import { useAppData } from "@/lib/app-data";
import { currency } from "@/lib/format";
import { getShortName } from "@/lib/profiles";

export default function DashboardPage() {
  const {
    calendarEvents,
    activeMember,
    finances,
    shoppingItems,
    snoopyReminders,
    toggleFinanceStatus,
    toggleShoppingItem,
    trips,
  } = useAppData();
  const insights = getHomeInsights({ calendarEvents, finances, shoppingItems, trips });
  const nextShopping = insights.urgentShopping[0];
  const nextBill = insights.nextBills[0];
  const profileItems = shoppingItems.filter((item) => item.addedBy === activeMember.name && item.status === "pendente").slice(0, 3);
  const upcomingCalendar = calendarEvents[0];
  const pendingRows = [
    ...insights.nextBills.slice(0, 2).map((item) => ({
      id: item.id,
      title: item.title,
      meta: `${item.dueDate} · ${currency(item.amount)}`,
      status: item.status,
      onToggle: () => toggleFinanceStatus(item.id)
    })),
    ...insights.urgentShopping.slice(0, 2).map((item) => ({
      id: item.id,
      title: item.name,
      meta: `${item.quantity} · ${item.category}`,
      status: item.priority,
      onToggle: () => toggleShoppingItem(item.id)
    }))
  ];

  return (
    <>
      <PageHeader
        eyebrow="Painel"
        title="Hoje"
        action={(
          <div className="flex items-center gap-2 rounded-[8px] border border-cocoa/10 bg-white px-3 py-2">
            <span className="h-3 w-3 rounded-full" style={{ background: activeMember.color }} />
            <span className="text-sm font-semibold text-cocoa">{getShortName(activeMember.name)}</span>
          </div>
        )}
      />
      <div className="grid gap-3 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
        <AppCard className="!border-cocoa !bg-cocoa text-white">
          <div className="flex min-h-36 flex-col justify-between gap-5">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/52">Prioridade</p>
              <h2 className="mt-2 max-w-xl text-[1.65rem] font-semibold leading-tight">{insights.nextAction.title}</h2>
              <p className="mt-2 text-sm font-medium text-white/70">{insights.nextAction.detail}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <StatusPill value={insights.nextAction.status} className="w-fit !bg-white/15 !text-white" />
              {nextBill ? (
                <PrimaryButton variant="soft" onClick={() => toggleFinanceStatus(nextBill.id)}>
                  <Check size={16} /> Pagar
                </PrimaryButton>
              ) : nextShopping ? (
                <PrimaryButton variant="soft" onClick={() => toggleShoppingItem(nextShopping.id)}>
                  <Check size={16} /> Concluir
                </PrimaryButton>
              ) : null}
            </div>
          </div>
        </AppCard>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-2">
          <StatCard label="Mes" value={insights.stats.month.value} detail={insights.stats.month.detail} icon={CreditCard} tone="bg-skysoft" />
          <StatCard label="Compras" value={insights.stats.shopping.value} detail={insights.stats.shopping.detail} icon={ListChecks} tone="bg-coral" />
          <StatCard label="Agenda" value={insights.stats.agenda.value} detail={insights.stats.agenda.detail} icon={CalendarDays} tone="bg-sage" />
          <StatCard label="Reserva" value={insights.stats.trip.value} detail={insights.stats.trip.detail} icon={Luggage} tone="bg-lilac" />
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <AppCard>
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-cocoa">Em aberto</h2>
            <span className="text-xs font-medium text-cocoa/45">{pendingRows.length} itens</span>
          </div>
          <div className="space-y-2">
            {pendingRows.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={item.onToggle}
                className={`focus-ring flex w-full items-center justify-between gap-3 rounded-[8px] border border-cocoa/10 px-3 py-3 text-left ${
                  index === 0 ? "bg-cocoa/[0.03] hover:bg-cocoa/[0.05]" : "bg-white hover:bg-cocoa/[0.02]"
                }`}
              >
                <span>
                  <strong className="block text-sm font-semibold text-cocoa">{item.title}</strong>
                  <span className="text-xs font-medium text-cocoa/55">{item.meta}</span>
                </span>
                <StatusPill value={item.status} />
              </button>
            ))}
          </div>
        </AppCard>

        <div className="grid gap-4">
          <AppCard>
            <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-cocoa"><PawPrint size={18} /> Casa</h2>
            <div className="space-y-2">
              {snoopyReminders.slice(0, 2).map((item) => (
                <div key={item.id} className="rounded-[8px] border border-cocoa/10 bg-white px-3 py-3">
                  <div className="flex items-center justify-between gap-2">
                    <strong className="text-sm font-semibold text-cocoa">{item.title}</strong>
                    <StatusPill value={item.urgency} />
                  </div>
                  <p className="mt-1 text-xs font-medium text-cocoa/55">{item.date}</p>
                </div>
              ))}
              {upcomingCalendar ? (
                <div className="rounded-[8px] border border-cocoa/10 bg-cocoa/[0.03] px-3 py-3">
                  <div className="flex items-center justify-between gap-2">
                    <strong className="text-sm font-semibold text-cocoa">{upcomingCalendar.title}</strong>
                    <StatusPill value="evento" />
                  </div>
                  <p className="mt-1 text-xs font-medium text-cocoa/55">{upcomingCalendar.date}</p>
                </div>
              ) : null}
              <div className="rounded-[8px] border border-cocoa/10 bg-white px-3 py-3">
                <div className="flex items-center justify-between gap-2">
                  <strong className="text-sm font-semibold text-cocoa">{trips[0].destination}</strong>
                  <StatusPill value="viagem" />
                </div>
                <p className="mt-1 text-xs font-medium text-cocoa/55">{currency(trips[0].saved)} reservados</p>
              </div>
            </div>
          </AppCard>

          <AppCard>
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-base font-semibold text-cocoa">Do perfil</h2>
              <span className="text-xs font-medium text-cocoa/45">{getShortName(activeMember.name)}</span>
            </div>
            {profileItems.length ? (
              <div className="space-y-2">
                {profileItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleShoppingItem(item.id)}
                    className="focus-ring flex w-full items-center justify-between gap-3 rounded-[8px] border border-cocoa/10 bg-white px-3 py-3 text-left hover:bg-cocoa/[0.02]"
                  >
                    <span>
                      <strong className="block truncate text-sm font-semibold text-cocoa">{item.name}</strong>
                      <span className="text-xs font-medium text-cocoa/50">{item.quantity}</span>
                    </span>
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: activeMember.color }} />
                  </button>
                ))}
              </div>
            ) : (
              <p className="rounded-[8px] border border-cocoa/10 bg-white px-3 py-3 text-sm font-medium text-cocoa/45">Sem pendencias.</p>
            )}
          </AppCard>
        </div>
      </div>
    </>
  );
}
