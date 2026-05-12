import { CalendarMini } from "@/components/features/CalendarMini";
import { AppCard } from "@/components/ui/AppCard";
import { PageHeader } from "@/components/ui/PageHeader";

export default function CalendarioPage() {
  return (
    <>
      <PageHeader
        eyebrow="Agenda compartilhada"
        title="Calendario"
        description="Eventos, contas, compromissos, pet e viagens diferenciados por cores para bater o olho no celular."
      />
      <AppCard>
        <CalendarMini />
      </AppCard>
    </>
  );
}
