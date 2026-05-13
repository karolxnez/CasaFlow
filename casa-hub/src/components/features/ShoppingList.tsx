"use client";

import { Check, Plus, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import { ShoppingItem } from "@/types/domain";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { MemberBadge } from "@/components/ui/MemberBadge";
import { useAppData } from "@/lib/app-data";
import { getMemberByName, getShortName } from "@/lib/profiles";

const categories: ShoppingItem["category"][] = ["mercado", "limpeza", "pet", "farmacia"];
const filters = ["pendente", "comprado", "todos"] as const;
const smartSuggestions: Array<Pick<ShoppingItem, "name" | "category" | "quantity" | "priority">> = [
  { name: "Leite", category: "mercado", quantity: "1 cx.", priority: "media" },
  { name: "Ovos", category: "mercado", quantity: "12 un.", priority: "media" },
  { name: "Racao", category: "pet", quantity: "1 saco", priority: "alta" },
  { name: "Papel", category: "limpeza", quantity: "1 pct.", priority: "media" }
];

export function ShoppingList() {
  const { activeMember, addShoppingItem, clearBoughtItems, removeShoppingItem, shoppingItems: items, toggleShoppingItem } = useAppData();
  const [filter, setFilter] = useState<(typeof filters)[number]>("pendente");
  const [draft, setDraft] = useState({
    name: "",
    category: "mercado" as ShoppingItem["category"],
    quantity: "1 un.",
    priority: "media" as ShoppingItem["priority"]
  });

  const pendingCount = useMemo(() => items.filter((item) => item.status === "pendente").length, [items]);
  const filteredItems = useMemo(() => {
    if (filter === "todos") return items;
    return items.filter((item) => item.status === filter);
  }, [filter, items]);
  const groupedItems = useMemo(() => categories
    .map((category) => ({
      category,
      items: filteredItems.filter((item) => item.category === category)
    }))
    .filter((group) => group.items.length > 0), [filteredItems]);
  const activeMemberItems = useMemo(() => items.filter((item) => item.addedBy === activeMember.name), [activeMember.name, items]);

  function addItem(event?: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    if (!draft.name.trim()) return;
    addShoppingItem({
      name: draft.name.trim(),
      category: draft.category,
      quantity: draft.quantity,
      addedBy: activeMember.name,
      priority: draft.priority
    });
    setDraft((current) => ({ ...current, name: "" }));
  }

  function addSuggestion(suggestion: Pick<ShoppingItem, "name" | "category" | "quantity" | "priority">) {
    addShoppingItem({
      ...suggestion,
      addedBy: activeMember.name
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-cocoa/34">Lista</p>
          <h2 className="text-lg font-semibold text-cocoa">{pendingCount} pendentes</h2>
        </div>
        <MemberBadge member={activeMember} />
      </div>

      <form className="grid gap-2 rounded-[8px] border border-cocoa/10 bg-white p-3 sm:grid-cols-[minmax(0,1fr)_110px_120px_auto]" onSubmit={addItem}>
        <input
          className="focus-ring w-full rounded-[8px] border border-cocoa/10 bg-cocoa/[0.02] px-3 py-2 text-sm"
          placeholder="Adicionar item"
          value={draft.name}
          onChange={(event) => setDraft({ ...draft, name: event.target.value })}
        />
        <input
          className="focus-ring rounded-[8px] border border-cocoa/10 bg-cocoa/[0.02] px-3 py-2 text-sm"
          value={draft.quantity}
          onChange={(event) => setDraft({ ...draft, quantity: event.target.value })}
        />
        <select className="focus-ring rounded-[8px] border border-cocoa/10 bg-cocoa/[0.02] px-3 py-2 text-sm" value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value as ShoppingItem["category"] })}>
          {categories.map((category) => <option key={category}>{category}</option>)}
        </select>
        <PrimaryButton type="submit" className="px-3">
          <Plus size={17} /> Adicionar
        </PrimaryButton>
      </form>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {smartSuggestions.map((suggestion) => (
            <button
              key={suggestion.name}
              type="button"
              onClick={() => addSuggestion(suggestion)}
              className="focus-ring inline-flex shrink-0 items-center gap-2 rounded-[8px] border border-cocoa/10 bg-white px-3 py-2 text-sm font-semibold text-cocoa hover:bg-cocoa/[0.03]"
            >
              <Plus size={15} />
              {suggestion.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex gap-1 rounded-[8px] border border-cocoa/10 bg-white p-1">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`focus-ring rounded-[8px] px-3 py-1.5 text-xs font-semibold uppercase ${filter === item ? "bg-cocoa text-white" : "text-cocoa/55 hover:bg-cocoa/[0.03]"}`}
              >
                {item}
              </button>
            ))}
          </div>
          <button type="button" onClick={clearBoughtItems} className="focus-ring rounded-[8px] p-2 text-cocoa/45 hover:bg-white hover:text-coral" aria-label="Limpar comprados">
            <X size={17} />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {groupedItems.map((group) => (
          <section key={group.category}>
            <h2 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-cocoa/34">{group.category}</h2>
            <div className="grid gap-2 xl:grid-cols-2">
              {group.items.map((item) => {
                const owner = getMemberByName(item.addedBy);
                const bought = item.status === "comprado";
                return (
                  <div key={item.id} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-[8px] border border-cocoa/10 bg-white px-3 py-2.5">
                    <button
                      aria-label={`Marcar ${item.name}`}
                      type="button"
                      onClick={() => toggleShoppingItem(item.id)}
                      className={`focus-ring flex h-8 w-8 items-center justify-center rounded-[8px] border ${bought ? "border-sage bg-sage text-white" : "border-cocoa/10 text-cocoa/35 hover:bg-cocoa/[0.03]"}`}
                    >
                      {bought ? <Check size={17} /> : null}
                    </button>
                    <div className="min-w-0">
                      <strong className={`block truncate text-sm ${bought ? "text-cocoa/35 line-through" : "text-cocoa"}`}>{item.name}</strong>
                      <div className="mt-1 flex items-center gap-1.5 text-xs font-medium text-cocoa/45">
                        <span className="h-2 w-2 rounded-full" style={{ background: owner.color }} />
                        <span>{item.quantity}</span>
                        <span>{getShortName(item.addedBy)}</span>
                      </div>
                    </div>
                    <button className="focus-ring rounded-[8px] p-2 text-cocoa/35 hover:bg-cocoa/[0.04] hover:text-cocoa" onClick={() => removeShoppingItem(item.id)} aria-label={`Remover ${item.name}`}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
        {!groupedItems.length ? (
          <p className="rounded-[8px] bg-white px-3 py-4 text-center text-sm font-medium text-cocoa/45">Sem itens.</p>
        ) : null}
      </div>
    </div>
  );
}
