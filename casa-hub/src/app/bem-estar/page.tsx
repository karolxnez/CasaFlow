"use client";

import { HeartHandshake } from "lucide-react";
import { useState } from "react";
import { AppCard } from "@/components/ui/AppCard";
import { EmptyInput } from "@/components/ui/EmptyInput";
import { PageHeader } from "@/components/ui/PageHeader";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { useAppData } from "@/lib/app-data";

export default function BemEstarPage() {
  const { addQuickItem, wellnessNotes } = useAppData();
  const [note, setNote] = useState("");

  function saveNote() {
    addQuickItem({ title: note, type: "recado", owner: "Casa", priority: "baixa", detail: "" });
    setNote("");
  }

  return (
    <>
      <PageHeader eyebrow="Clima da casa" title="Bem-estar" />
      <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <AppCard>
          <div className="grid gap-3 sm:grid-cols-2">
            {wellnessNotes.map((note) => (
              <div key={note.label} className="rounded-[8px] bg-white p-4">
                <p className="text-sm font-bold text-cocoa/55">{note.label}</p>
                <strong className="mt-1 block text-2xl text-cocoa">{note.value}</strong>
                <span className="mt-1 block text-xs font-semibold text-cocoa/50">{note.owner}</span>
              </div>
            ))}
          </div>
        </AppCard>
        <AppCard>
          <h2 className="flex items-center gap-2 text-xl font-black text-cocoa"><HeartHandshake size={20} /> Recado positivo</h2>
          <div className="mt-3 space-y-2">
            <EmptyInput placeholder="Recado para a casa" value={note} onChange={(event) => setNote(event.target.value)} />
            <PrimaryButton className="w-full" onClick={saveNote}>Salvar</PrimaryButton>
          </div>
        </AppCard>
      </div>
    </>
  );
}
