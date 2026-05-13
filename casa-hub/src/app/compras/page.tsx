import { ShoppingCart } from "lucide-react";
import { ShoppingList } from "@/components/features/ShoppingList";
import { AppCard } from "@/components/ui/AppCard";
import { PageHeader } from "@/components/ui/PageHeader";

export default function ComprasPage() {
  return (
    <>
      <PageHeader eyebrow="Casa" title="Compras" action={<span className="hidden rounded-[8px] border border-cocoa/10 bg-white px-3 py-2 text-sm font-semibold text-cocoa sm:inline-flex"><ShoppingCart size={17} className="mr-2" /> Lista ativa</span>} />
      <AppCard>
        <ShoppingList />
      </AppCard>
    </>
  );
}
