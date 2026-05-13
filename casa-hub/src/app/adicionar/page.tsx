"use client";

import { CalendarDays, Clapperboard, CreditCard, MessageCircle, PawPrint, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { AppCard } from "@/components/ui/AppCard";
import { EmptyInput } from "@/components/ui/EmptyInput";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { useAppData } from "@/lib/app-data";
import { Priority } from "@/types/domain";

const types = [
  { label: "Compra", value: "compra", icon: ShoppingCart, placeholder: "Item", detail: "Qtd." },
  { label: "Conta", value: "conta", icon: CreditCard, placeholder: "Conta", detail: "Valor/data" },
  { label: "Agenda", value: "evento", icon: CalendarDays, placeholder: "Compromisso", detail: "Data" },
  { label: "Midia", value: "filme", icon: Clapperboard, placeholder: "Titulo", detail: "Origem" },
  { label: "Pet", value: "snoopy", icon: PawPrint, placeholder: "Lembrete", detail: "Data" },
  { label: "Nota", value: "recado", icon: MessageCircle, placeholder: "Nota", detail: "Detalhe" }
] as const;

type QuickType = (typeof types)[number]["value"];

export default function AdicionarPage() {
  const { activeMember, addQuickItem } = useAppData();
  const [draft, setDraft] = useState({
    title: "",
    type: "compra" as QuickType,
    priority: "media" as Priority,
    detail: ""
  });
  const selectedType = types.find((item) => item.value === draft.type) ?? types[0];

  function submit(event?: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    addQuickItem({
      title: draft.title,
      type: draft.type,
      owner: activeMember.name,
      priority: draft.priority,
      detail: draft.detail
    });
    setDraft((current) => ({ ...current, title: "", detail: "" }));
  }

  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-3 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-cocoa/36">Entrada</p>
          <h1 className="mt-1 text-[1.75rem] font-semibold leading-none text-cocoa">Novo registro</h1>
        </div>
        <div className="flex items-center gap-2 rounded-[8px] border border-cocoa/10 bg-white px-3 py-2">
          <span className="h-3 w-3 rounded-full" style={{ background: activeMember.color }} />
          <span className="text-sm font-semibold text-cocoa">{activeMember.name}</span>
        </div>
      </header>

      <AppCard className="p-3 sm:p-4">
        <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
          {types.map((item) => {
            const Icon = item.icon;
            const active = draft.type === item.value;

            return (
              <button
                key={item.value}
                type="button"
                onClick={() => setDraft((current) => ({ ...current, type: item.value }))}
                className={`focus-ring inline-flex h-11 shrink-0 items-center gap-2 rounded-[8px] border px-3 text-xs font-semibold transition ${
                  active ? "border-cocoa/10 bg-cocoa/[0.06] text-cocoa" : "border-cocoa/10 bg-white text-cocoa/60 hover:bg-cocoa/[0.03]"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </div>

        <form className="grid gap-2" onSubmit={submit}>
          <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_150px_auto]">
            <EmptyInput
              autoFocus
              placeholder={selectedType.placeholder}
              value={draft.title}
              onChange={(event) => setDraft({ ...draft, title: event.target.value })}
            />
            <EmptyInput
              placeholder={selectedType.detail}
              value={draft.detail}
              onChange={(event) => setDraft({ ...draft, detail: event.target.value })}
            />
            <PrimaryButton type="submit" aria-label="Adicionar item" className="px-3">
              <Plus size={18} /> Salvar
            </PrimaryButton>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <div className="flex gap-1 rounded-[8px] border border-cocoa/10 bg-white p-1">
              {[
                ["baixa", "Baixa"],
                ["media", "Normal"],
                ["alta", "Urgente"]
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setDraft((current) => ({ ...current, priority: value as Priority }))}
                    className={`focus-ring rounded-[8px] px-3 py-1.5 text-xs font-semibold ${
                      draft.priority === value ? "bg-cocoa text-white" : "text-cocoa/50 hover:bg-cocoa/[0.03] hover:text-cocoa"
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <p className="text-xs font-medium text-cocoa/45">
              {activeMember.name}
            </p>
          </div>
        </form>
      </AppCard>
    </div>
  );
}
