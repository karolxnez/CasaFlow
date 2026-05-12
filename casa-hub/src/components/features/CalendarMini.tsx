import { calendarEvents } from "@/data/mock";
import { StatusPill } from "@/components/ui/StatusPill";

const days = Array.from({ length: 30 }, (_, index) => index + 1);
const eventByDay: Record<number, (typeof calendarEvents)[number]> = {
  14: calendarEvents[0],
  16: calendarEvents[1],
  18: calendarEvents[2],
  22: calendarEvents[3],
  25: calendarEvents[4]
};

const dotClass: Record<string, string> = {
  evento: "bg-sage",
  conta: "bg-honey",
  pet: "bg-lilac",
  viagem: "bg-skysoft"
};

export function CalendarMini() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="grid grid-cols-7 gap-2">
        {["S", "T", "Q", "Q", "S", "S", "D"].map((day, index) => (
          <span key={`${day}-${index}`} className="text-center text-xs font-black text-cocoa/45">
            {day}
          </span>
        ))}
        {days.map((day) => {
          const event = eventByDay[day];
          return (
            <div key={day} className="min-h-16 rounded-[8px] border border-cocoa/10 bg-white/70 p-2">
              <span className="text-sm font-bold text-cocoa">{day}</span>
              {event ? <span className={`mt-2 block h-2 w-2 rounded-full ${dotClass[event.type]}`} /> : null}
            </div>
          );
        })}
      </div>
      <div className="space-y-2">
        {calendarEvents.map((event) => (
          <div key={event.id} className="rounded-[8px] bg-white p-3">
            <div className="flex items-center justify-between gap-3">
              <strong className="text-sm text-cocoa">{event.title}</strong>
              <StatusPill value={event.type} />
            </div>
            <p className="mt-1 text-xs font-semibold text-cocoa/55">{event.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
