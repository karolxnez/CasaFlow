"use client";

import { Heart, Plus } from "lucide-react";
import { useState } from "react";
import { recipes } from "@/data/mock";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { StatusPill } from "@/components/ui/StatusPill";

const filters = ["todos", "rapido", "barato", "saudavel", "air fryer", "doce", "preguica"];

export function RecipeCards() {
  const [filter, setFilter] = useState("todos");
  const visible = filter === "todos" ? recipes : recipes.filter((recipe) => recipe.tags.includes(filter));

  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={`focus-ring whitespace-nowrap rounded-[8px] px-3 py-2 text-sm font-black ${
              filter === item ? "bg-cocoa text-white" : "bg-white text-cocoa/70"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {visible.map((recipe) => (
          <article key={recipe.id} className="rounded-[8px] bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase text-coral">{recipe.meal} · {recipe.time}</p>
                <h2 className="mt-1 text-lg font-black text-cocoa">{recipe.title}</h2>
              </div>
              {recipe.favorite ? <Heart className="fill-coral text-coral" size={20} /> : <Heart className="text-cocoa/25" size={20} />}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {recipe.tags.map((tag) => <StatusPill key={tag} value={tag} />)}
            </div>
            <p className="mt-3 text-sm font-semibold text-cocoa/65">Ingredientes: {recipe.ingredients.join(", ")}.</p>
            <p className="mt-2 text-sm leading-6 text-cocoa/65">{recipe.steps}</p>
            <PrimaryButton variant="soft" className="mt-4 w-full">
              <Plus size={16} /> Adicionar ingredientes na lista
            </PrimaryButton>
          </article>
        ))}
      </div>
    </div>
  );
}
