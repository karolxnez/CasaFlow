import { Plus } from "lucide-react";
import { RecipeCards } from "@/components/features/RecipeCards";
import { AppCard } from "@/components/ui/AppCard";
import { EmptyInput } from "@/components/ui/EmptyInput";
import { PageHeader } from "@/components/ui/PageHeader";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

export default function ComidasPage() {
  return (
    <>
      <PageHeader eyebrow="Sugestoes" title="Comidas" />
      <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <AppCard>
          <h2 className="text-lg font-black text-cocoa">O que temos em casa?</h2>
          <div className="mt-3 space-y-2">
            <EmptyInput placeholder="Ex: ovos, arroz, frango..." />
            <PrimaryButton className="w-full"><Plus size={16} /> Buscar sugestoes</PrimaryButton>
          </div>
          <div className="mt-4 rounded-[8px] bg-cream p-3 text-sm font-bold text-cocoa/65">Favoritas salvas.</div>
        </AppCard>
        <AppCard>
          <RecipeCards />
        </AppCard>
      </div>
    </>
  );
}
