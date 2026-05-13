"use client";

import { Check, Plus, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { StatusPill } from "@/components/ui/StatusPill";
import { useAppData } from "@/lib/app-data";
import { getMemberByName, getShortName } from "@/lib/profiles";
import { ShoppingItem } from "@/types/domain";

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
  const groupedItems = useMemo(
    () =>
      categories
        .map((category) => ({
          category,
          items: filteredItems.filter((item) => item.category === category)
        }))
        .filter((group) => group.items.length > 0),
    [filteredItems]
  );

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
      <section className="rounded-[10px] border border-[color:var(--app-border)] bg-[var(--app-surface)] p-3 shadow-[var(--app-shadow)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[color:var(--app-muted)]">Pendentes</p>
            <strong className="text-xl font-semibold text-[color:var(--app-text)]">{pendingCount}</strong>
          </div>
          <div className="flex flex-wrap gap-1">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`focus-ring rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase transition ${
                  filter === item
                    ? "bg-[var(--app-accent)] text-[var(--app-accent-contrast)]"
                    : "bg-[var(--app-soft)] text-[color:var(--app-muted)] hover:text-[color:var(--app-text)]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <form className="mt-3 grid gap-2 sm:grid-cols-[minmax(0,1fr)_104px_108px_auto]" onSubmit={addItem}>
          <input
            className="focus-ring w-full rounded-[10px] border border-[color:var(--app-border)] bg-[var(--app-surface-muted)] px-3 py-2.5 text-sm text-[color:var(--app-text)] placeholder:text-[color:var(--app-muted)]"
            placeholder="Novo item"
            value={draft.name}
            onChange={(event) => setDraft({ ...draft, name: event.target.value })}
          />
          <input
            className="focus-ring rounded-[10px] border border-[color:var(--app-border)] bg-[var(--app-surface-muted)] px-3 py-2.5 text-sm text-[color:var(--app-text)]"
            value={draft.quantity}
            onChange={(event) => setDraft({ ...draft, quantity: event.target.value })}
          />
          <select
            className="focus-ring rounded-[10px] border border-[color:var(--app-border)] bg-[var(--app-surface-muted)] px-3 py-2.5 text-sm text-[color:var(--app-text)]"
            value={draft.category}
            onChange={(event) => setDraft({ ...draft, category: event.target.value as ShoppingItem["category"] })}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <PrimaryButton type="submit" className="w-full sm:w-auto">
            <Plus size={16} /> Add
          </PrimaryButton>
        </form>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {smartSuggestions.map((suggestion) => (
              <button
                key={suggestion.name}
                type="button"
                onClick={() => addSuggestion(suggestion)}
                className="focus-ring inline-flex shrink-0 items-center gap-2 rounded-full border border-[color:var(--app-border)] bg-[var(--app-surface)] px-3 py-1.5 text-xs font-semibold text-[color:var(--app-text)] hover:bg-[var(--app-soft)]"
              >
                <Plus size={14} />
                {suggestion.name}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={clearBoughtItems}
            className="focus-ring rounded-[10px] p-2 text-[color:var(--app-muted)] hover:bg-[var(--app-soft)] hover:text-[color:var(--app-text)]"
            aria-label="Limpar comprados"
          >
            <X size={17} />
          </button>
        </div>
      </section>

      <div className="space-y-4">
        {groupedItems.map((group) => (
          <section key={group.category}>
            <div className="mb-2 flex items-center gap-2">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--app-muted)]">{group.category}</h2>
              <div className="h-px flex-1 bg-[color:var(--app-border)]" />
            </div>
            <div className="space-y-2">
              {group.items.map((item) => {
                const owner = getMemberByName(item.addedBy);
                const bought = item.status === "comprado";
                return (
                  <div
                    key={item.id}
                    className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-[10px] border border-[color:var(--app-border)] bg-[var(--app-surface)] px-3 py-2.5 shadow-[var(--app-shadow)]"
                  >
                    <button
                      aria-label={`Marcar ${item.name}`}
                      type="button"
                      onClick={() => toggleShoppingItem(item.id)}
                      className={`focus-ring flex h-8 w-8 items-center justify-center rounded-[10px] border ${
                        bought
                          ? "border-sage bg-sage text-white"
                          : "border-[color:var(--app-border)] text-[color:var(--app-muted)] hover:bg-[var(--app-soft)]"
                      }`}
                    >
                      {bought ? <Check size={16} /> : null}
                    </button>
                    <div className="min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <strong className={`block truncate text-sm font-semibold ${bought ? "text-[color:var(--app-muted)] line-through" : "text-[color:var(--app-text)]"}`}>
                          {item.name}
                        </strong>
                        <StatusPill value={item.priority} className="hidden sm:inline-flex" />
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs font-medium text-[color:var(--app-muted)]">
                        <span>{item.quantity}</span>
                        <span className="h-1 w-1 rounded-full bg-[color:var(--app-border)]" />
                        <span className="inline-flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full" style={{ background: owner.color }} />
                          {getShortName(item.addedBy)}
                        </span>
                      </div>
                    </div>
                    <button
                      className="focus-ring rounded-[10px] p-2 text-[color:var(--app-muted)] hover:bg-[var(--app-soft)] hover:text-[color:var(--app-text)]"
                      onClick={() => removeShoppingItem(item.id)}
                      aria-label={`Remover ${item.name}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        {!groupedItems.length ? (
          <div className="rounded-[10px] border border-[color:var(--app-border)] bg-[var(--app-surface)] px-3 py-5 text-center text-sm font-medium text-[color:var(--app-muted)] shadow-[var(--app-shadow)]">
            Sem itens.
          </div>
        ) : null}
      </div>
    </div>
  );
}
