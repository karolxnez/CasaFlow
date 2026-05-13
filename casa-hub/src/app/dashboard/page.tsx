"use client";

import { Check, CreditCard, ListChecks, PawPrint } from "lucide-react";
import { AppCard } from "@/components/ui/AppCard";
import { MemberBadge } from "@/components/ui/MemberBadge";
import { PageHeader } from "@/components/ui/PageHeader";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { StatusPill } from "@/components/ui/StatusPill";
import { getHomeInsights } from "@/lib/home-insights";
import { useAppData } from "@/lib/app-data";
import { currency } from "@/lib/format";

export default function DashboardPage() {
  const { activeMember, calendarEvents, finances, shoppingItems, snoopyReminders, toggleFinanceStatus, toggleShoppingItem, trips } = useAppData();
  const insights = getHomeInsights({ calendarEvents, finances, shoppingItems, trips });
  const nextShopping = insights.urgentShopping[0];
  const nextBill = insights.nextBills[0];
  const profileItems = shoppingItems.filter((item) => item.addedBy === activeMember.name && item.status === "pendente").slice(0, 3);
  const highlights = [
    { label: "Mes", value: insights.stats.month.value, detail: insights.stats.month.detail },
    { label: "Compras", value: insights.stats.shopping.value, detail: insights.stats.shopping.detail },
    { label: "Agenda", value: insights.stats.agenda.value, detail: insights.stats.agenda.detail }
  ];
  const queue = [
    ...insights.nextBills.slice(0, 2).map((item) => ({
      id: item.id,
      icon: CreditCard,
      title: item.title,
      meta: `${item.dueDate} · ${currency(item.amount)}`,
      status: item.status,
      onClick: () => toggleFinanceStatus(item.id)
    })),
    ...insights.urgentShopping.slice(0, 2).map((item) => ({
      id: item.id,
      icon: ListChecks,
      title: item.name,
      meta: `${item.quantity} · ${item.category}`,
      status: item.priority,
      onClick: () => toggleShoppingItem(item.id)
    }))
  ];

  return (
    <>
      <PageHeader eyebrow="Painel" title="Hoje" action={<MemberBadge member={activeMember} />} />
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_340px]">
        <div className="space-y-4">
          <AppCard className="border-none bg-[var(--app-surface-strong)] text-[var(--app-accent-contrast)] shadow-none">
            <div className="flex min-h-[196px] flex-col justify-between gap-6">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">Prioridade</p>
                <h2 className="mt-2 max-w-2xl text-[1.55rem] font-semibold leading-tight sm:text-[1.8rem]">{insights.nextAction.title}</h2>
                <p className="mt-2 max-w-xl text-sm font-medium text-white/64">{insights.nextAction.detail}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <StatusPill value={insights.nextAction.status} className="w-fit !border-white/10 !bg-white/10 !text-white" />
                {nextBill ? (
                  <PrimaryButton variant="soft" onClick={() => toggleFinanceStatus(nextBill.id)} className="border-white/10 !bg-white/10 !text-white hover:!bg-white/16">
                    <Check size={16} /> Pagar
                  </PrimaryButton>
                ) : nextShopping ? (
                  <PrimaryButton variant="soft" onClick={() => toggleShoppingItem(nextShopping.id)} className="border-white/10 !bg-white/10 !text-white hover:!bg-white/16">
                    <Check size={16} /> Concluir
                  </PrimaryButton>
                ) : null}
              </div>
            </div>
          </AppCard>

          <div className="grid gap-2 sm:grid-cols-3">
            {highlights.map((item) => (
              <div key={item.label} className="rounded-[10px] border border-[color:var(--app-border)] bg-[var(--app-surface)] px-3 py-3 shadow-[var(--app-shadow)]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[color:var(--app-muted)]">{item.label}</p>
                <strong className="mt-1 block text-lg font-semibold text-[color:var(--app-text)]">{item.value}</strong>
                <span className="mt-1 block text-xs font-medium text-[color:var(--app-muted)]">{item.detail}</span>
              </div>
            ))}
          </div>

          <AppCard>
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-base font-semibold text-[color:var(--app-text)]">Fila</h2>
              <span className="text-xs font-medium text-[color:var(--app-muted)]">{queue.length} itens</span>
            </div>
            <div className="divide-y divide-[color:var(--app-border)]">
              {queue.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={item.onClick}
                    className="focus-ring flex w-full items-center justify-between gap-3 py-3 text-left first:pt-0 last:pb-0 hover:opacity-90"
                  >
                    <span className="flex min-w-0 items-start gap-3">
                      <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-[10px] bg-[var(--app-soft)] text-[color:var(--app-text)]">
                        <Icon size={16} />
                      </span>
                      <span className="min-w-0">
                        <strong className="block truncate text-sm font-semibold text-[color:var(--app-text)]">{item.title}</strong>
                        <span className="block text-xs font-medium text-[color:var(--app-muted)]">{item.meta}</span>
                      </span>
                    </span>
                    <StatusPill value={item.status} />
                  </button>
                );
              })}
            </div>
          </AppCard>
        </div>

        <div className="space-y-4">
          <AppCard>
            <div className="mb-3 flex items-center gap-2">
              <PawPrint size={17} className="text-[color:var(--app-text)]" />
              <h2 className="text-base font-semibold text-[color:var(--app-text)]">Casa</h2>
            </div>
            <div className="divide-y divide-[color:var(--app-border)]">
              {snoopyReminders.slice(0, 2).map((item) => (
                <div key={item.id} className="py-3 first:pt-0 last:pb-0">
                  <div className="flex items-center justify-between gap-2">
                    <strong className="text-sm font-semibold text-[color:var(--app-text)]">{item.title}</strong>
                    <StatusPill value={item.urgency} />
                  </div>
                  <p className="mt-1 text-xs font-medium text-[color:var(--app-muted)]">{item.date}</p>
                </div>
              ))}
              {calendarEvents[0] ? (
                <div className="py-3 last:pb-0">
                  <div className="flex items-center justify-between gap-2">
                    <strong className="text-sm font-semibold text-[color:var(--app-text)]">{calendarEvents[0].title}</strong>
                    <StatusPill value="evento" />
                  </div>
                  <p className="mt-1 text-xs font-medium text-[color:var(--app-muted)]">{calendarEvents[0].date}</p>
                </div>
              ) : null}
              <div className="py-3 last:pb-0">
                <div className="flex items-center justify-between gap-2">
                  <strong className="text-sm font-semibold text-[color:var(--app-text)]">{trips[0].destination}</strong>
                  <StatusPill value="viagem" />
                </div>
                <p className="mt-1 text-xs font-medium text-[color:var(--app-muted)]">{currency(trips[0].saved)} reservados</p>
              </div>
            </div>
          </AppCard>

          <AppCard>
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-base font-semibold text-[color:var(--app-text)]">Perfil</h2>
              <span className="text-xs font-medium text-[color:var(--app-muted)]">{activeMember.name}</span>
            </div>
            {profileItems.length ? (
              <div className="divide-y divide-[color:var(--app-border)]">
                {profileItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleShoppingItem(item.id)}
                    className="focus-ring flex w-full items-center justify-between gap-3 py-3 text-left first:pt-0 last:pb-0 hover:opacity-90"
                  >
                    <span className="min-w-0">
                      <strong className="block truncate text-sm font-semibold text-[color:var(--app-text)]">{item.name}</strong>
                      <span className="text-xs font-medium text-[color:var(--app-muted)]">{item.quantity}</span>
                    </span>
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: activeMember.color }} />
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm font-medium text-[color:var(--app-muted)]">Sem pendencias.</p>
            )}
          </AppCard>
        </div>
      </div>
    </>
  );
}
