import {
  CalendarEvent,
  FinanceItem,
  Member,
  PetReminder,
  Recipe,
  ShoppingItem,
  Trip,
  WatchItem
} from "@/types/domain";

export const members: Member[] = [
  { id: "karina", name: "Karina", role: "Organizacao", color: "#a98473", avatar: "K", mood: "calma" },
  { id: "kaleb", name: "Kaleb", role: "Financas", color: "#97a9aa", avatar: "K", mood: "focado" },
  { id: "karolyne", name: "Karolyne", role: "Receitas e filmes", color: "#b7a9bd", avatar: "K", mood: "animada" }
];

export const shoppingItems: ShoppingItem[] = [
  { id: "1", name: "Racao do Snoopy", category: "pet", quantity: "1 saco 10kg", addedBy: "Karina", priority: "alta", status: "pendente" },
  { id: "2", name: "Arroz", category: "mercado", quantity: "5kg", addedBy: "Kaleb", priority: "media", status: "pendente" },
  { id: "3", name: "Desinfetante", category: "limpeza", quantity: "2 unidades", addedBy: "Karolyne", priority: "baixa", status: "comprado" },
  { id: "4", name: "Dipirona", category: "farmacia", quantity: "1 caixa", addedBy: "Karina", priority: "media", status: "pendente" }
];

export const recipes: Recipe[] = [
  {
    id: "r1",
    title: "Omelete de queijo e tomate",
    meal: "cafe",
    tags: ["rapido", "barato", "saudavel"],
    favorite: true,
    time: "12 min",
    ingredients: ["ovos", "queijo", "tomate", "oregano"],
    steps: "Bata os ovos, misture os ingredientes e doure em frigideira antiaderente."
  },
  {
    id: "r2",
    title: "Frango crocante na air fryer",
    meal: "jantar",
    tags: ["air fryer", "rapido"],
    favorite: true,
    time: "28 min",
    ingredients: ["frango", "farinha panko", "paprica", "limão"],
    steps: "Tempere o frango, empane levemente e asse na air fryer ate ficar dourado."
  },
  {
    id: "r3",
    title: "Macarrao de uma panela",
    meal: "almoco",
    tags: ["preguica", "barato"],
    favorite: false,
    time: "20 min",
    ingredients: ["macarrao", "molho", "creme de leite", "milho"],
    steps: "Cozinhe tudo junto, mexendo ate o molho ficar cremoso."
  },
  {
    id: "r4",
    title: "Brownie de caneca",
    meal: "sobremesa",
    tags: ["doce", "preguica"],
    favorite: false,
    time: "5 min",
    ingredients: ["chocolate", "farinha", "leite", "acucar"],
    steps: "Misture na caneca e leve ao micro-ondas por cerca de 90 segundos."
  }
];

export const calendarEvents: CalendarEvent[] = [
  { id: "c1", title: "Conta de luz", date: "14 maio", type: "conta" },
  { id: "c2", title: "Banho do Snoopy", date: "16 maio", type: "pet" },
  { id: "c3", title: "Noite de filme", date: "18 maio", type: "evento" },
  { id: "c4", title: "Reserva da pousada", date: "22 maio", type: "viagem" },
  { id: "c5", title: "Mercado do mes", date: "25 maio", type: "evento" }
];

export const finances: FinanceItem[] = [
  { id: "f1", title: "Aluguel", amount: 1800, dueDate: "10 maio", status: "pago", category: "Fixa" },
  { id: "f2", title: "Internet", amount: 119.9, dueDate: "15 maio", status: "pendente", category: "Fixa" },
  { id: "f3", title: "Cartao mercado", amount: 642.45, dueDate: "20 maio", status: "pendente", category: "Casa" },
  { id: "f4", title: "Passagens viagem", amount: 380, dueDate: "08 maio", status: "atrasado", category: "Viagem", installments: "2/4" }
];

export const trips: Trip[] = [
  {
    id: "t1",
    destination: "Campos do Jordao",
    budget: 2400,
    saved: 1350,
    dates: "12 a 15 julho",
    status: "planejando",
    checklist: ["reservar pousada", "confirmar pet sitter", "separar casacos", "roteiro de restaurantes"]
  }
];

export const watchList: WatchItem[] = [
  { id: "w1", title: "Divertida Mente 2", type: "filme", platform: "Lancamento no cinema", suggestedBy: "Karolyne", status: "quero assistir", movieNight: "18 maio" },
  { id: "w2", title: "Abbott Elementary", type: "serie", platform: "Star+", suggestedBy: "Karina", status: "assistindo", rating: 5 },
  { id: "w3", title: "Duna: Parte 2", type: "filme", platform: "Max", suggestedBy: "Kaleb", status: "assistido", rating: 4 }
];

export const snoopyReminders: PetReminder[] = [
  { id: "p1", title: "Comprar racao", date: "em 6 dias", detail: "Estoque atual estimado: 1,8kg", urgency: "alta" },
  { id: "p2", title: "Banho", date: "16 maio", detail: "Levar shampoo hipoalergenico", urgency: "media" },
  { id: "p3", title: "Vermifugo", date: "02 junho", detail: "Dose semestral", urgency: "baixa" }
];

export const wellnessNotes = [
  { label: "Humor", value: "leve", owner: "Casa" },
  { label: "Energia", value: "media", owner: "Karina" },
  { label: "Sono", value: "7h", owner: "Kaleb" },
  { label: "Recado", value: "Hoje tem cafe especial na cozinha.", owner: "Karolyne" }
];
