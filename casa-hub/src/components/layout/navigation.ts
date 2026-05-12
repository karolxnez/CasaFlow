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
  { href: "/dashboard", label: "Inicio", icon: Home },
  { href: "/adicionar", label: "Adicionar", icon: CirclePlus },
  { href: "/compras", label: "Compras", icon: ListChecks },
  { href: "/comidas", label: "Comidas", icon: Soup },
  { href: "/calendario", label: "Calendario", icon: CalendarDays },
  { href: "/financas", label: "Financas", icon: CreditCard },
  { href: "/viagens", label: "Viagens", icon: Luggage },
  { href: "/filmes-series", label: "Filmes", icon: Clapperboard },
  { href: "/snoopy", label: "Snoopy", icon: PawPrint },
  { href: "/bem-estar", label: "Bem-estar", icon: HeartHandshake },
  { href: "/configuracoes", label: "Ajustes", icon: Settings }
];
