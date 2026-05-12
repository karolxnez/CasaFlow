"use client";

import { Plus, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import { shoppingItems } from "@/data/mock";
import { ShoppingItem } from "@/types/domain";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { StatusPill } from "@/components/ui/StatusPill";

const categories: ShoppingItem["category"][] = ["mercado", "limpeza", "pet", "farmacia", "outros"];
const priorities: ShoppingItem["priority"][] = ["baixa", "media", "alta"];

export function ShoppingList() {
  const [items, setItems] = useState<ShoppingItem[]>(shoppingItems);
  const [draft, setDraft] = useState({
    name: "",
    category: "mercado" as ShoppingItem["category"],
    quantity: "1 un.",
    addedBy: "Karina",
    priority: "media" as ShoppingItem["priority"]
  });

  const pendingCount = useMemo(() => items.filter((item) => item.status === "pendente").length, [items]);

  function addItem() {
    if (!draft.name.trim()) return;
    setItems((current) => [
      {
        id: crypto.randomUUID(),
        name: draft.name.trim(),
        category: draft.category,
        quantity: draft.quantity,
        addedBy: draft.addedBy,
        priority: draft.priority,
        status: "pendente"
      },
      ...current
    ]);
    setDraft((current) => ({ ...current, name: "" }));
  }

  function toggleItem(id: string) {
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, status: item.status === "comprado" ? "pendente" : "comprado" } : item))
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="rounded-[8px] bg-cream p-4">
        <h2 className="text-lg font-black text-cocoa">Adicionar item</h2>
        <div className="mt-4 space-y-3">
          <input
            className="focus-ring w-full rounded-[8px] border border-cocoa/10 bg-white px-3 py-2 text-sm"
            placeholder="Ex: leite, racao, sabao..."
            value={draft.name}
            onChange={(event) => setDraft({ ...draft, name: event.target.value })}
          />
          <div className="grid grid-cols-2 gap-2">
            <select className="focus-ring rounded-[8px] border border-cocoa/10 bg-white px-3 py-2 text-sm" value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value as ShoppingItem["category"] })}>
              {categories.map((category) => <option key={category}>{category}</option>)}
            </select>
            <input className="focus-ring rounded-[8px] border border-cocoa/10 bg-white px-3 py-2 text-sm" value={draft.quantity} onChange={(event) => setDraft({ ...draft, quantity: event.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <select className="focus-ring rounded-[8px] border border-cocoa/10 bg-white px-3 py-2 text-sm" value={draft.addedBy} onChange={(event) => setDraft({ ...draft, addedBy: event.target.value })}>
              {["Karina", "Kaleb", "Karolyne"].map((name) => <option key={name}>{name}</option>)}
            </select>
            <select className="focus-ring rounded-[8px] border border-cocoa/10 bg-white px-3 py-2 text-sm" value={draft.priority} onChange={(event) => setDraft({ ...draft, priority: event.target.value as ShoppingItem["priority"] })}>
              {priorities.map((priority) => <option key={priority}>{priority}</option>)}
            </select>
          </div>
          <PrimaryButton className="w-full" onClick={addItem}>
            <Plus size={17} /> Adicionar
          </PrimaryButton>
        </div>
      </div>

      <div>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-bold text-cocoa/60">{pendingCount} itens pendentes</p>
          <PrimaryButton variant="soft" onClick={() => setItems((current) => current.filter((item) => item.status !== "comprado"))}>
            <X size={16} /> Limpar comprados
          </PrimaryButton>
        </div>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-3 rounded-[8px] bg-white p-3">
              <input
                aria-label={`Marcar ${item.name}`}
                type="checkbox"
                checked={item.status === "comprado"}
                onChange={() => toggleItem(item.id)}
                className="h-5 w-5 accent-sage"
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <strong className={item.status === "comprado" ? "text-cocoa/40 line-through" : "text-cocoa"}>{item.name}</strong>
                  <StatusPill value={item.priority} />
                  <StatusPill value={item.status} />
                </div>
                <p className="mt-1 text-xs font-semibold text-cocoa/55">
                  {item.quantity} · {item.category} · adicionado por {item.addedBy}
                </p>
              </div>
              <button className="focus-ring rounded-[8px] p-2 text-cocoa/50 hover:bg-coral/10 hover:text-coral" onClick={() => setItems((current) => current.filter((currentItem) => currentItem.id !== item.id))}>
                <Trash2 size={17} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
