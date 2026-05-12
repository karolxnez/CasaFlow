import { Plus } from "lucide-react";
import { RecipeCards } from "@/components/features/RecipeCards";
import { AppCard } from "@/components/ui/AppCard";
import { EmptyInput } from "@/components/ui/EmptyInput";
import { PageHeader } from "@/components/ui/PageHeader";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

export default function ComidasPage() {
  return (
    <>
      <PageHeader
        eyebrow="Sugestoes de refeicoes"
        title="Comidas"
        description="Ideias para cafe, almoco, jantar, lanche e sobremesa, com filtros para dias corridos ou preguicosos."
      />
      <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <AppCard>
          <h2 className="text-lg font-black text-cocoa">O que temos em casa?</h2>
          <div className="mt-3 space-y-2">
            <EmptyInput placeholder="Ex: ovos, arroz, frango..." />
            <PrimaryButton className="w-full"><Plus size={16} /> Buscar sugestoes</PrimaryButton>
          </div>
          <div className="mt-4 rounded-[8px] bg-cream p-3 text-sm font-semibold text-cocoa/70">
            Favoritas aparecem com coracao e podem virar lista de compras futuramente.
          </div>
        </AppCard>
        <AppCard>
          <RecipeCards />
        </AppCard>
      </div>
    </>
  );
}
