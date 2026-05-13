import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";
import { AppDataProvider } from "@/lib/app-data";

export const metadata: Metadata = {
  title: "Casa Hub",
  description: "Sistema de organizacao domestica para a casa, os moradores e o Snoopy."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <AppDataProvider>
          <AppShell>{children}</AppShell>
        </AppDataProvider>
      </body>
    </html>
  );
}
