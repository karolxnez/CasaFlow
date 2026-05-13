export const themeOptions = [
  {
    id: "claro",
    label: "Claro",
    preview: ["#f5f6f8", "#ffffff", "#17181a"]
  },
  {
    id: "grafite",
    label: "Grafite",
    preview: ["#eff1f4", "#f7f8fa", "#111214"]
  },
  {
    id: "areia",
    label: "Areia",
    preview: ["#f4f1ec", "#fffdfa", "#1f1a17"]
  }
] as const;

export type ThemeId = (typeof themeOptions)[number]["id"];
