"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, PanelLeftClose, PanelLeftOpen, PlusCircle, Settings2, ShoppingCart, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems } from "./navigation";
import { ProfileSwitcher } from "./ProfileSwitcher";
import { useAppData } from "@/lib/app-data";
import { MemberBadge } from "../ui/MemberBadge";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { activeMember } = useAppData();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobilePrimaryNav = navItems.filter((item) => ["/dashboard", "/adicionar", "/compras"].includes(item.href));
  const mobileSecondaryNav = navItems.filter((item) => !["/dashboard", "/adicionar", "/compras"].includes(item.href));
  const desktopPrimaryNav = navItems.slice(0, 3);
  const desktopSecondaryNav = navItems.slice(3);

  useEffect(() => {
    setCollapsed(window.localStorage.getItem("casaflow:sidebar") === "collapsed");
  }, []);

  function updateCollapsed(value: boolean) {
    setCollapsed(value);
    window.localStorage.setItem("casaflow:sidebar", value ? "collapsed" : "expanded");
  }

  return (
    <div className={`min-h-screen transition-[grid-template-columns] lg:grid ${collapsed ? "lg:grid-cols-[76px_1fr]" : "lg:grid-cols-[232px_1fr]"}`}>
      <aside className="sticky top-0 hidden h-screen border-r border-cocoa/8 bg-white/94 p-3 backdrop-blur lg:block">
        <div className={`mb-5 flex items-center ${collapsed ? "justify-center" : "justify-between gap-3"}`}>
          <Link href="/dashboard" className={`flex items-center gap-3 rounded-[8px] ${collapsed ? "justify-center" : ""}`}>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] bg-cocoa text-white">
              <span className="text-sm font-semibold tracking-tight">CH</span>
            </span>
            {!collapsed ? (
              <span>
                <strong className="block text-lg font-semibold text-cocoa">Casa Hub</strong>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-cocoa/30">Operacao da casa</span>
              </span>
            ) : null}
          </Link>
          {!collapsed ? (
            <button
              type="button"
              aria-label="Recolher menu"
              onClick={() => updateCollapsed(true)}
              className="focus-ring rounded-[8px] p-2 text-cocoa/55 hover:bg-white hover:text-cocoa"
            >
              <PanelLeftClose size={19} />
            </button>
          ) : null}
        </div>

        {collapsed ? (
          <button
            type="button"
            aria-label="Expandir menu"
            onClick={() => updateCollapsed(false)}
            className="focus-ring mb-4 flex w-full justify-center rounded-[8px] p-2 text-cocoa/55 hover:bg-white hover:text-cocoa"
          >
            <PanelLeftOpen size={19} />
          </button>
        ) : (
          <ProfileSwitcher />
        )}

        {!collapsed ? <p className="mb-2 mt-5 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-cocoa/30">Principal</p> : null}
        <nav className="mt-2 space-y-1">
          {desktopPrimaryNav.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.label}
                className={`flex items-center rounded-[8px] border px-3 py-2 text-sm font-medium transition ${
                  collapsed ? "justify-center" : "gap-3"
                } ${active ? "border-cocoa/10 bg-cocoa/[0.05] text-cocoa" : "border-transparent text-cocoa/68 hover:border-cocoa/8 hover:bg-white hover:text-cocoa"}`}
              >
                <Icon size={19} />
                {!collapsed ? <span>{item.label}</span> : null}
              </Link>
            );
          })}
        </nav>
        {!collapsed ? <p className="mb-2 mt-5 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-cocoa/30">Modulos</p> : null}
        <nav className="space-y-1">
          {desktopSecondaryNav.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.label}
                className={`flex items-center rounded-[8px] border px-3 py-2 text-sm font-medium transition ${
                  collapsed ? "justify-center" : "gap-3"
                } ${active ? "border-cocoa/10 bg-cocoa/[0.05] text-cocoa" : "border-transparent text-cocoa/68 hover:border-cocoa/8 hover:bg-white hover:text-cocoa"}`}
              >
                <Icon size={19} />
                {!collapsed ? <span>{item.label}</span> : null}
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="pb-24 lg:pb-0">
        <div className="border-b border-cocoa/8 bg-white/94 px-3 py-2.5 backdrop-blur lg:hidden">
          <div className="flex items-center justify-between gap-3">
            <Link href="/dashboard" className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-cocoa text-white">
                <span className="text-sm font-semibold tracking-tight">CH</span>
              </span>
              <span>
                <strong className="block text-[15px] font-semibold text-cocoa">Casa Hub</strong>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-cocoa/30">Operacao</span>
              </span>
            </Link>
            <div className="flex items-center gap-2">
              <MemberBadge member={activeMember} compact className="h-9 w-9 justify-center px-0 py-0" />
              <button
                type="button"
                aria-label="Abrir menu"
                onClick={() => setMobileMenuOpen(true)}
                className="focus-ring flex h-9 w-9 items-center justify-center rounded-[8px] border border-cocoa/10 bg-white text-cocoa"
              >
                <Settings2 size={17} />
              </button>
            </div>
          </div>
        </div>
        <div className="mx-auto w-full max-w-6xl px-3 py-4 sm:px-5 lg:px-7 lg:py-6">{children}</div>
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 gap-2 border-t border-cocoa/10 bg-white/96 px-3 py-2 shadow-soft backdrop-blur lg:hidden">
        {mobilePrimaryNav.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-w-0 flex-col items-center gap-1 rounded-[8px] border px-2 py-1.5 text-[10px] font-semibold ${
                active ? "border-cocoa/10 bg-cocoa/[0.06] text-cocoa" : "border-transparent text-cocoa/62"
              }`}
            >
              <Icon size={18} />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className={`focus-ring flex min-w-0 flex-col items-center gap-1 rounded-[8px] border px-2 py-1.5 text-[10px] font-semibold ${
            mobileSecondaryNav.some((item) => item.href === pathname) ? "border-cocoa/10 bg-cocoa/[0.06] text-cocoa" : "border-transparent text-cocoa/62"
          }`}
        >
          <LayoutGrid size={18} />
          <span className="truncate">Mais</span>
        </button>
      </nav>

      {mobileMenuOpen ? (
        <div className="fixed inset-0 z-40 bg-cocoa/20 lg:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute inset-x-0 bottom-0 rounded-t-[16px] border border-cocoa/10 bg-white p-4 shadow-soft" onClick={(event) => event.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-cocoa/32">Navegacao</p>
                <strong className="text-base font-semibold text-cocoa">Modulos</strong>
              </div>
              <button
                type="button"
                aria-label="Fechar menu"
                onClick={() => setMobileMenuOpen(false)}
                className="focus-ring flex h-9 w-9 items-center justify-center rounded-[8px] border border-cocoa/10 bg-white text-cocoa"
              >
                <X size={17} />
              </button>
            </div>

            <div className="mb-4">
              <ProfileSwitcher />
            </div>

            <div className="grid grid-cols-2 gap-2">
              {mobileSecondaryNav.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 rounded-[8px] border px-3 py-3 text-sm font-medium ${
                      active ? "border-cocoa/10 bg-cocoa/[0.05] text-cocoa" : "border-cocoa/10 bg-white text-cocoa"
                    }`}
                  >
                    <Icon size={17} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
