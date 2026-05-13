"use client";

import { Bell, Palette, RotateCcw } from "lucide-react";
import { AppCard } from "@/components/ui/AppCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { members } from "@/data/mock";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { useAppData } from "@/lib/app-data";

export default function ConfiguracoesPage() {
  const { resetData } = useAppData();

  return (
    <>
      <PageHeader eyebrow="Preferencias" title="Configuracoes" />
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <AppCard>
          <h2 className="mb-3 text-base font-semibold text-cocoa">Perfis</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {members.map((member) => (
              <div key={member.id} className="rounded-[8px] bg-white p-4 text-center">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-[8px] text-xl font-semibold text-white" style={{ background: member.color }}>
                  {member.avatar}
                </span>
                <strong className="mt-3 block text-sm font-semibold text-cocoa">{member.name}</strong>
                <p className="text-xs font-medium text-cocoa/55">{member.role} · {member.mood}</p>
              </div>
            ))}
          </div>
        </AppCard>
        <AppCard>
          <h2 className="mb-3 text-base font-semibold text-cocoa">Preferencias</h2>
          {[
            ["Lembretes de contas", Bell],
            ["Alertas do Snoopy", Bell],
            ["Temas por pessoa", Palette],
            ["Categorias editaveis", Palette]
          ].map(([label, Icon]) => {
            const IconComponent = Icon as typeof Bell;
            return (
              <div key={label as string} className="mb-2 flex items-center justify-between rounded-[8px] bg-white p-3 last:mb-0">
                <span className="flex items-center gap-2 text-sm font-semibold text-cocoa"><IconComponent size={17} /> {label as string}</span>
                <span className="h-6 w-11 rounded-[8px] bg-sage p-1"><span className="block h-4 w-4 rounded-[6px] bg-white translate-x-5" /></span>
              </div>
            );
          })}
          <PrimaryButton variant="soft" className="mt-4 w-full" onClick={resetData}>
            <RotateCcw size={16} /> Resetar dados
          </PrimaryButton>
        </AppCard>
      </div>
    </>
  );
}
