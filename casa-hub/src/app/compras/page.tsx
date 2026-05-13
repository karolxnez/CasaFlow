"use client";

import { ShoppingCart } from "lucide-react";
import { ShoppingList } from "@/components/features/ShoppingList";
import { PageHeader } from "@/components/ui/PageHeader";
import { MemberBadge } from "@/components/ui/MemberBadge";
import { useAppData } from "@/lib/app-data";

export default function ComprasPage() {
  const { activeMember } = useAppData();

  return (
    <>
      <PageHeader
        eyebrow="Casa"
        title="Compras"
        action={(
          <div className="flex items-center gap-2">
            <span className="hidden rounded-[10px] border border-[color:var(--app-border)] bg-[var(--app-surface)] px-3 py-2 text-sm font-semibold text-[color:var(--app-text)] sm:inline-flex">
              <ShoppingCart size={17} className="mr-2" /> Ativa
            </span>
            <MemberBadge member={activeMember} />
          </div>
        )}
      />
      <ShoppingList />
    </>
  );
}
