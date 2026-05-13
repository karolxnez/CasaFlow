"use client";

import { Check, Palette, RotateCcw, UserRound } from "lucide-react";
import { AppCard } from "@/components/ui/AppCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { members } from "@/data/mock";
import { useAppData } from "@/lib/app-data";
import { getShortName } from "@/lib/profiles";
import { themeOptions } from "@/lib/themes";

export default function ConfiguracoesPage() {
  const { activeMemberId, resetData, setActiveMemberId, setThemeId, themeId } = useAppData();

  return (
    <>
      <PageHeader eyebrow="Preferencias" title="Configuracoes" />
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_320px]">
        <AppCard>
          <div className="mb-4 flex items-center gap-2 text-[color:var(--app-text)]">
            <UserRound size={18} />
            <h2 className="text-base font-semibold">Perfil ativo</h2>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            {members.map((member) => {
              const active = member.id === activeMemberId;
              return (
                <button
                  key={member.id}
                  type="button"
                  onClick={() => setActiveMemberId(member.id)}
                  className={`focus-ring rounded-[10px] border px-4 py-4 text-left transition ${
                    active
                      ? "border-[color:var(--app-text)] bg-[var(--app-soft)]"
                      : "border-[color:var(--app-border)] bg-[var(--app-surface)] hover:bg-[var(--app-soft)]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex items-center gap-3">
                      <span
                        className="flex h-11 w-11 items-center justify-center rounded-[10px] text-sm font-semibold text-white"
                        style={{ background: member.color }}
                      >
                        {member.avatar}
                      </span>
                      <span>
                        <strong className="block text-sm font-semibold text-[color:var(--app-text)]">{getShortName(member.name)}</strong>
                        <span className="block text-xs font-medium text-[color:var(--app-muted)]">{member.role}</span>
                      </span>
                    </span>
                    {active ? <Check size={16} className="text-[color:var(--app-text)]" /> : null}
                  </div>
                </button>
              );
            })}
          </div>
        </AppCard>

        <AppCard>
          <div className="mb-4 flex items-center gap-2 text-[color:var(--app-text)]">
            <Palette size={18} />
            <h2 className="text-base font-semibold">Tema</h2>
          </div>
          <div className="space-y-2">
            {themeOptions.map((theme) => {
              const active = theme.id === themeId;
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => setThemeId(theme.id)}
                  className={`focus-ring flex w-full items-center justify-between rounded-[10px] border px-3 py-3 text-left transition ${
                    active
                      ? "border-[color:var(--app-text)] bg-[var(--app-soft)]"
                      : "border-[color:var(--app-border)] bg-[var(--app-surface)] hover:bg-[var(--app-soft)]"
                  }`}
                >
                  <span>
                    <strong className="block text-sm font-semibold text-[color:var(--app-text)]">{theme.label}</strong>
                  </span>
                  <span className="flex items-center gap-1.5">
                    {theme.preview.map((color) => (
                      <span key={color} className="h-4 w-4 rounded-full border border-black/5" style={{ background: color }} />
                    ))}
                  </span>
                </button>
              );
            })}
          </div>
          <PrimaryButton variant="soft" className="mt-4 w-full justify-center" onClick={resetData}>
            <RotateCcw size={16} /> Resetar dados
          </PrimaryButton>
        </AppCard>
      </div>
    </>
  );
}
