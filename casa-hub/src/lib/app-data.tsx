"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  calendarEvents,
  finances,
  members,
  shoppingItems,
  snoopyReminders,
  trips,
  watchList,
  wellnessNotes
} from "@/data/mock";
import { CalendarEvent, FinanceItem, Member, PetReminder, Priority, ShoppingItem, Trip, WatchItem } from "@/types/domain";

type WellnessNote = (typeof wellnessNotes)[number];

type AppData = {
  calendarEvents: CalendarEvent[];
  finances: FinanceItem[];
  shoppingItems: ShoppingItem[];
  snoopyReminders: PetReminder[];
  trips: Trip[];
  watchList: WatchItem[];
  wellnessNotes: WellnessNote[];
};

type QuickItemType = "compra" | "conta" | "evento" | "snoopy" | "filme" | "recado";

type QuickItem = {
  title: string;
  type: QuickItemType;
  owner: string;
  priority: Priority;
  detail: string;
};

type AppDataContextValue = AppData & {
  activeMember: Member;
  activeMemberId: string;
  addQuickItem: (item: QuickItem) => void;
  addShoppingItem: (item: Omit<ShoppingItem, "id" | "status">) => void;
  clearBoughtItems: () => void;
  removeShoppingItem: (id: string) => void;
  resetData: () => void;
  setActiveMemberId: (id: string) => void;
  toggleFinanceStatus: (id: string) => void;
  toggleShoppingItem: (id: string) => void;
  updateTripSaved: (value: number) => void;
};

const initialData: AppData = {
  calendarEvents,
  finances,
  shoppingItems,
  snoopyReminders,
  trips,
  watchList,
  wellnessNotes
};

const storageKey = "casaflow:data:v1";
const AppDataContext = createContext<AppDataContextValue | null>(null);

function createId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}`;
}

function parseAmount(value: string) {
  const normalized = value.replace(/[^\d,.-]/g, "").replace(",", ".");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<AppData>(initialData);
  const [activeMemberId, setActiveMemberId] = useState(members[0].id);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (!saved) {
      setLoaded(true);
      return;
    }

    try {
      const parsed = JSON.parse(saved);
      setData({ ...initialData, ...(parsed.data ?? parsed) });
      setActiveMemberId(parsed.activeMemberId ?? members[0].id);
    } catch {
      window.localStorage.removeItem(storageKey);
    }

    setLoaded(true);
  }, []);

  function commitData(updater: (current: AppData) => AppData) {
    setData((current) => {
      const next = updater(current);
      window.localStorage.setItem(storageKey, JSON.stringify({ activeMemberId, data: next }));
      return next;
    });
  }

  useEffect(() => {
    if (!loaded) return;
    window.localStorage.setItem(storageKey, JSON.stringify({ activeMemberId, data }));
  }, [activeMemberId, data, loaded]);

  const value = useMemo<AppDataContextValue>(() => ({
    ...data,
    activeMember: members.find((member) => member.id === activeMemberId) ?? members[0],
    activeMemberId,
    addQuickItem: (item) => {
      if (!item.title.trim()) return;
      const title = item.title.trim();
      const detail = item.detail.trim();

      commitData((current) => {
        if (item.type === "compra") {
          return {
            ...current,
            shoppingItems: [{
              id: createId("shop"),
              name: title,
              category: "mercado",
              quantity: detail || "1 un.",
              addedBy: item.owner,
              priority: item.priority,
              status: "pendente"
            }, ...current.shoppingItems]
          };
        }

        if (item.type === "conta") {
          return {
            ...current,
            finances: [{
              id: createId("fin"),
              title,
              amount: parseAmount(detail),
              dueDate: detail || "sem data",
              status: item.priority === "alta" ? "atrasado" : "pendente",
              category: "Casa"
            }, ...current.finances]
          };
        }

        if (item.type === "evento") {
          return {
            ...current,
            calendarEvents: [{
              id: createId("cal"),
              title,
              date: detail || "sem data",
              type: "evento"
            }, ...current.calendarEvents]
          };
        }

        if (item.type === "snoopy") {
          return {
            ...current,
            snoopyReminders: [{
              id: createId("pet"),
              title,
              date: detail || "sem data",
              detail,
              urgency: item.priority
            }, ...current.snoopyReminders]
          };
        }

        if (item.type === "filme") {
          return {
            ...current,
            watchList: [{
              id: createId("watch"),
              title,
              type: "filme",
              platform: detail || "sem plataforma",
              suggestedBy: item.owner,
              status: "quero assistir"
            }, ...current.watchList]
          };
        }

        return {
          ...current,
          wellnessNotes: [{ label: "Recado", value: title, owner: item.owner }, ...current.wellnessNotes.slice(0, 5)]
        };
      });
    },
    addShoppingItem: (item) => {
      if (!item.name.trim()) return;
      commitData((current) => ({
        ...current,
        shoppingItems: [{ ...item, id: createId("shop"), name: item.name.trim(), status: "pendente" }, ...current.shoppingItems]
      }));
    },
    clearBoughtItems: () => commitData((current) => ({
      ...current,
      shoppingItems: current.shoppingItems.filter((item) => item.status !== "comprado")
    })),
    removeShoppingItem: (id) => commitData((current) => ({
      ...current,
      shoppingItems: current.shoppingItems.filter((item) => item.id !== id)
    })),
    resetData: () => {
      window.localStorage.setItem(storageKey, JSON.stringify({ activeMemberId: members[0].id, data: initialData }));
      setActiveMemberId(members[0].id);
      setData(initialData);
    },
    setActiveMemberId,
    toggleFinanceStatus: (id) => commitData((current) => ({
      ...current,
      finances: current.finances.map((item) => item.id === id
        ? { ...item, status: item.status === "pago" ? "pendente" : "pago" }
        : item)
    })),
    toggleShoppingItem: (id) => commitData((current) => ({
      ...current,
      shoppingItems: current.shoppingItems.map((item) => item.id === id
        ? { ...item, status: item.status === "comprado" ? "pendente" : "comprado" }
        : item)
    })),
    updateTripSaved: (value) => commitData((current) => ({
      ...current,
      trips: current.trips.map((trip, index) => index === 0 ? { ...trip, saved: Math.max(0, value) } : trip)
    }))
  }), [activeMemberId, data]);

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error("useAppData must be used inside AppDataProvider");
  }
  return context;
}
