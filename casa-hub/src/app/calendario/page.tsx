import { CalendarMini } from "@/components/features/CalendarMini";
import { AppCard } from "@/components/ui/AppCard";
import { PageHeader } from "@/components/ui/PageHeader";

export default function CalendarioPage() {
  return (
    <>
      <PageHeader eyebrow="Agenda" title="Calendario" />
      <AppCard>
        <CalendarMini />
      </AppCard>
    </>
  );
}
