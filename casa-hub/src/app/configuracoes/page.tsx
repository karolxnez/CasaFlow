import { Bell, Palette } from "lucide-react";
import { AppCard } from "@/components/ui/AppCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { members } from "@/data/mock";

export default function ConfiguracoesPage() {
  return (
    <>
      <PageHeader eyebrow="Preferencias" title="Configuracoes" description="Perfis dos 3 moradores, cor de cada pessoa, notificacoes e categorias personalizaveis." />
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <AppCard>
          <h2 className="mb-3 text-xl font-black text-cocoa">Moradores</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {members.map((member) => (
              <div key={member.id} className="rounded-[8px] bg-white p-4 text-center">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-[8px] text-2xl font-black text-white" style={{ background: member.color }}>
                  {member.avatar}
                </span>
                <strong className="mt-3 block text-cocoa">{member.name}</strong>
                <p className="text-xs font-semibold text-cocoa/55">{member.role} · {member.mood}</p>
              </div>
            ))}
          </div>
        </AppCard>
        <AppCard>
          <h2 className="mb-3 text-xl font-black text-cocoa">Preferencias</h2>
          {[
            ["Lembretes de contas", Bell],
            ["Alertas do Snoopy", Bell],
            ["Temas por pessoa", Palette],
            ["Categorias editaveis", Palette]
          ].map(([label, Icon]) => {
            const IconComponent = Icon as typeof Bell;
            return (
              <div key={label as string} className="mb-2 flex items-center justify-between rounded-[8px] bg-white p-3 last:mb-0">
                <span className="flex items-center gap-2 text-sm font-bold text-cocoa"><IconComponent size={17} /> {label as string}</span>
                <span className="h-6 w-11 rounded-[8px] bg-sage p-1"><span className="block h-4 w-4 rounded-[6px] bg-white translate-x-5" /></span>
              </div>
            );
          })}
        </AppCard>
      </div>
    </>
  );
}
