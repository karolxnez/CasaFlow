import { CalendarEvent, FinanceItem, ShoppingItem, Trip } from "@/types/domain";
import { currency } from "./format";

type HomeInsightsInput = {
  calendarEvents: CalendarEvent[];
  finances: FinanceItem[];
  shoppingItems: ShoppingItem[];
  trips: Trip[];
};

export function getHomeInsights({ calendarEvents, finances, shoppingItems, trips }: HomeInsightsInput) {
  const total = finances.reduce((sum, item) => sum + item.amount, 0);
  const paid = finances.filter((item) => item.status === "pago").reduce((sum, item) => sum + item.amount, 0);
  const nextBills = finances.filter((item) => item.status !== "pago");
  const urgentShopping = shoppingItems.filter((item) => item.priority === "alta" || item.status === "pendente").slice(0, 3);
  const nextAction = nextBills.find((item) => item.status === "atrasado") ?? urgentShopping[0];
  const trip = trips[0];
  const fallbackAction = {
    title: "Tudo em dia",
    detail: "Sem pendencias agora",
    status: "pago"
  };

  return {
    nextAction: !nextAction ? fallbackAction : "amount" in nextAction
      ? {
          title: nextAction.title,
          detail: `${currency(nextAction.amount)} · ${nextAction.dueDate}`,
          status: nextAction.status
        }
      : {
          title: nextAction.name,
          detail: `${nextAction.quantity} · ${nextAction.category}`,
          status: nextAction.priority
        },
    nextBills,
    urgentShopping,
    stats: {
      month: { value: currency(total), detail: `${currency(paid)} pago` },
      shopping: { value: `${urgentShopping.length}`, detail: "pendentes" },
      agenda: { value: `${calendarEvents.length}`, detail: "proximos" },
      trip: { value: trip ? currency(trip.saved) : "-", detail: trip?.destination ?? "sem plano" }
    }
  };
}
