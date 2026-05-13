import {
  CalendarDays,
  Clapperboard,
  CreditCard,
  CirclePlus,
  HeartHandshake,
  Home,
  ListChecks,
  Luggage,
  PawPrint,
  Settings,
  Soup
} from "lucide-react";

export const navItems = [
  { href: "/dashboard", label: "Painel", icon: Home },
  { href: "/adicionar", label: "Registro", icon: CirclePlus },
  { href: "/compras", label: "Compras", icon: ListChecks },
  { href: "/comidas", label: "Refeicoes", icon: Soup },
  { href: "/calendario", label: "Agenda", icon: CalendarDays },
  { href: "/financas", label: "Financeiro", icon: CreditCard },
  { href: "/viagens", label: "Viagens", icon: Luggage },
  { href: "/filmes-series", label: "Midia", icon: Clapperboard },
  { href: "/snoopy", label: "Pet", icon: PawPrint },
  { href: "/bem-estar", label: "Bem-estar", icon: HeartHandshake },
  { href: "/configuracoes", label: "Preferencias", icon: Settings }
];
