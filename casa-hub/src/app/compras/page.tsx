import { ShoppingCart } from "lucide-react";
import { ShoppingList } from "@/components/features/ShoppingList";
import { AppCard } from "@/components/ui/AppCard";
import { PageHeader } from "@/components/ui/PageHeader";

export default function ComprasPage() {
  return (
    <>
      <PageHeader
        eyebrow="Lista integrada"
        title="Compras"
        description="Adicione itens, marque como comprado, separe por categoria e mantenha o mercado da casa sob controle."
        action={<span className="hidden rounded-[8px] bg-white px-3 py-2 text-sm font-black text-cocoa shadow-soft sm:inline-flex"><ShoppingCart size={17} className="mr-2" /> Mock local</span>}
      />
      <AppCard>
        <ShoppingList />
      </AppCard>
    </>
  );
}
