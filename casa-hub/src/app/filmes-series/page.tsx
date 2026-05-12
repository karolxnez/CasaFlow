import { CalendarDays, Star } from "lucide-react";
import { AppCard } from "@/components/ui/AppCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusPill } from "@/components/ui/StatusPill";
import { watchList } from "@/data/mock";

export default function FilmesSeriesPage() {
  return (
    <>
      <PageHeader eyebrow="Noite do sofa" title="Filmes e Series" description="Lista do que a casa quer assistir, com plataforma, sugestao, status, nota e noite de filme." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {watchList.map((item) => (
          <AppCard key={item.id}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase text-coral">{item.type} · {item.platform}</p>
                <h2 className="mt-1 text-xl font-black text-cocoa">{item.title}</h2>
              </div>
              <StatusPill value={item.status} />
            </div>
            <p className="mt-3 text-sm font-semibold text-cocoa/60">Sugerido por {item.suggestedBy}</p>
            <div className="mt-4 flex items-center justify-between rounded-[8px] bg-white p-3 text-sm font-bold text-cocoa/70">
              <span className="flex items-center gap-2"><CalendarDays size={17} /> {item.movieNight ?? "sem data"}</span>
              <span className="flex items-center gap-1"><Star size={17} className="text-honey" /> {item.rating ?? "-"}</span>
            </div>
          </AppCard>
        ))}
      </div>
    </>
  );
}
