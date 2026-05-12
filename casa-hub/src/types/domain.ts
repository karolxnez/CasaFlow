export type Member = {
  id: string;
  name: string;
  role: string;
  color: string;
  avatar: string;
  mood: string;
};

export type Priority = "baixa" | "media" | "alta";
export type Status = "pendente" | "comprado" | "pago" | "atrasado" | "assistindo" | "assistido" | "quero assistir";

export type ShoppingItem = {
  id: string;
  name: string;
  category: "mercado" | "limpeza" | "pet" | "farmacia" | "outros";
  quantity: string;
  addedBy: string;
  priority: Priority;
  status: "pendente" | "comprado";
};

export type Recipe = {
  id: string;
  title: string;
  meal: "cafe" | "almoco" | "jantar" | "lanche" | "sobremesa";
  tags: string[];
  favorite: boolean;
  time: string;
  ingredients: string[];
  steps: string;
};

export type CalendarEvent = {
  id: string;
  title: string;
  date: string;
  type: "evento" | "conta" | "pet" | "viagem";
};

export type FinanceItem = {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  status: "pago" | "pendente" | "atrasado";
  category: string;
  installments?: string;
};

export type Trip = {
  id: string;
  destination: string;
  budget: number;
  saved: number;
  dates: string;
  status: string;
  checklist: string[];
};

export type WatchItem = {
  id: string;
  title: string;
  type: "filme" | "serie";
  platform: string;
  suggestedBy: string;
  status: "quero assistir" | "assistindo" | "assistido";
  rating?: number;
  movieNight?: string;
};

export type PetReminder = {
  id: string;
  title: string;
  date: string;
  detail: string;
  urgency: Priority;
};
