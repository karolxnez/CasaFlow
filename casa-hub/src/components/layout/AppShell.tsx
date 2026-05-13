"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, PanelLeftClose, PanelLeftOpen, Settings2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems } from "./navigation";
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
      <aside className="sticky top-0 hidden h-screen flex-col border-r border-[color:var(--app-border)] bg-[var(--app-surface)] p-3 backdrop-blur lg:flex">
        <div className={`mb-5 flex items-center ${collapsed ? "justify-center" : "justify-between gap-3"}`}>
          <Link href="/dashboard" className={`flex items-center gap-3 rounded-[8px] ${collapsed ? "justify-center" : ""}`}>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-[var(--app-accent)] text-[var(--app-accent-contrast)]">
              <span className="text-sm font-semibold tracking-tight">CH</span>
            </span>
            {!collapsed ? (
              <span>
                <strong className="block text-lg font-semibold text-[color:var(--app-text)]">Casa Hub</strong>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-[color:var(--app-muted)]">Casa</span>
              </span>
            ) : null}
          </Link>
          {!collapsed ? (
            <button
              type="button"
              aria-label="Recolher menu"
              onClick={() => updateCollapsed(true)}
              className="focus-ring rounded-[10px] p-2 text-[color:var(--app-muted)] hover:bg-[var(--app-soft)] hover:text-[color:var(--app-text)]"
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
            className="focus-ring mb-4 flex w-full justify-center rounded-[10px] p-2 text-[color:var(--app-muted)] hover:bg-[var(--app-soft)] hover:text-[color:var(--app-text)]"
          >
            <PanelLeftOpen size={19} />
          </button>
        ) : null}

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
                } ${active ? "border-[color:var(--app-border)] bg-[var(--app-soft)] text-[color:var(--app-text)]" : "border-transparent text-[color:var(--app-muted)] hover:border-[color:var(--app-border)] hover:bg-[var(--app-soft)] hover:text-[color:var(--app-text)]"}`}
              >
                <Icon size={19} />
                {!collapsed ? <span>{item.label}</span> : null}
              </Link>
            );
          })}
        </nav>
        <div className="my-4 h-px bg-[color:var(--app-border)]" />
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
                } ${active ? "border-[color:var(--app-border)] bg-[var(--app-soft)] text-[color:var(--app-text)]" : "border-transparent text-[color:var(--app-muted)] hover:border-[color:var(--app-border)] hover:bg-[var(--app-soft)] hover:text-[color:var(--app-text)]"}`}
              >
                <Icon size={19} />
                {!collapsed ? <span>{item.label}</span> : null}
              </Link>
            );
          })}
        </nav>
        <div className={`mt-auto pt-4 ${collapsed ? "space-y-2" : "space-y-3"}`}>
          {collapsed ? (
            <div className="flex justify-center">
              <MemberBadge member={activeMember} compact className="h-10 w-10 justify-center px-0 py-0" />
            </div>
          ) : (
            <div className="rounded-[10px] border border-[color:var(--app-border)] bg-[var(--app-soft)] p-2.5">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[color:var(--app-muted)]">Perfil ativo</p>
              <MemberBadge member={activeMember} />
            </div>
          )}
        </div>
      </aside>

      <main className="pb-24 lg:pb-0">
        <div className="border-b border-[color:var(--app-border)] bg-[var(--app-surface)] px-3 py-2.5 backdrop-blur lg:hidden">
          <div className="flex items-center justify-between gap-3">
            <Link href="/dashboard" className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[var(--app-accent)] text-[var(--app-accent-contrast)]">
                <span className="text-sm font-semibold tracking-tight">CH</span>
              </span>
              <span>
                <strong className="block text-[15px] font-semibold text-[color:var(--app-text)]">Casa Hub</strong>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-[color:var(--app-muted)]">Casa</span>
              </span>
            </Link>
            <div className="flex items-center gap-2">
              <MemberBadge member={activeMember} compact className="h-9 w-9 justify-center px-0 py-0" />
              <button
                type="button"
                aria-label="Abrir menu"
                onClick={() => setMobileMenuOpen(true)}
                className="focus-ring flex h-9 w-9 items-center justify-center rounded-[10px] border border-[color:var(--app-border)] bg-[var(--app-surface)] text-[color:var(--app-text)]"
              >
                <Settings2 size={17} />
              </button>
            </div>
          </div>
        </div>
        <div className="mx-auto w-full max-w-6xl px-3 py-4 sm:px-5 lg:px-7 lg:py-6">{children}</div>
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 gap-2 border-t border-[color:var(--app-border)] bg-[var(--app-surface)] px-3 py-2 shadow-[var(--app-shadow)] backdrop-blur lg:hidden">
        {mobilePrimaryNav.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-w-0 flex-col items-center gap-1 rounded-[8px] border px-2 py-1.5 text-[10px] font-semibold ${
                active ? "border-[color:var(--app-border)] bg-[var(--app-soft)] text-[color:var(--app-text)]" : "border-transparent text-[color:var(--app-muted)]"
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
            mobileSecondaryNav.some((item) => item.href === pathname) ? "border-[color:var(--app-border)] bg-[var(--app-soft)] text-[color:var(--app-text)]" : "border-transparent text-[color:var(--app-muted)]"
          }`}
        >
          <LayoutGrid size={18} />
          <span className="truncate">Mais</span>
        </button>
      </nav>

      {mobileMenuOpen ? (
        <div className="fixed inset-0 z-40 bg-cocoa/20 lg:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute inset-x-0 bottom-0 rounded-t-[18px] border border-[color:var(--app-border)] bg-[var(--app-surface)] p-4 shadow-[var(--app-shadow)]" onClick={(event) => event.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[color:var(--app-muted)]">Menu</p>
                <strong className="text-base font-semibold text-[color:var(--app-text)]">Acesso</strong>
              </div>
              <button
                type="button"
                aria-label="Fechar menu"
                onClick={() => setMobileMenuOpen(false)}
                className="focus-ring flex h-9 w-9 items-center justify-center rounded-[10px] border border-[color:var(--app-border)] bg-[var(--app-surface)] text-[color:var(--app-text)]"
              >
                <X size={17} />
              </button>
            </div>

            <div className="mb-4 flex items-center justify-between rounded-[10px] border border-[color:var(--app-border)] bg-[var(--app-soft)] px-3 py-2.5">
              <span className="text-sm font-medium text-[color:var(--app-muted)]">Perfil</span>
              <MemberBadge member={activeMember} />
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
                      active ? "border-[color:var(--app-border)] bg-[var(--app-soft)] text-[color:var(--app-text)]" : "border-[color:var(--app-border)] bg-[var(--app-surface)] text-[color:var(--app-text)]"
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
