"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "./navigation";
import { ProfileSwitcher } from "./ProfileSwitcher";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[280px_1fr]">
      <aside className="sticky top-0 hidden h-screen border-r border-white/70 bg-white/70 p-5 backdrop-blur lg:block">
        <Link href="/dashboard" className="mb-6 flex items-center gap-3 rounded-[8px] px-2 py-1">
          <span className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-coral text-white">
            <span className="text-sm font-black tracking-tighter">CH</span>
          </span>
          <span>
            <strong className="block text-xl text-cocoa">Casa Hub</strong>
            <span className="text-sm text-cocoa/60">Karina, Kaleb e Karolyne</span>
          </span>
        </Link>
        <ProfileSwitcher />
        <nav className="mt-5 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-[8px] px-3 py-2.5 text-sm font-semibold transition ${
                  active ? "bg-cocoa text-white shadow-soft" : "text-cocoa/70 hover:bg-white hover:text-cocoa"
                }`}
              >
                <Icon size={19} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="pb-24 lg:pb-0">
        <div className="border-b border-white/70 bg-white/75 px-4 py-3 backdrop-blur lg:hidden">
          <Link href="/dashboard" className="mb-3 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-coral text-white">
              <span className="text-xs font-black tracking-tighter">CH</span>
            </span>
            <span>
              <strong className="block text-lg text-cocoa">Casa Hub</strong>
              <span className="text-xs font-semibold text-cocoa/55">Karina, Kaleb e Karolyne</span>
            </span>
          </Link>
          <ProfileSwitcher />
        </div>
        <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8 lg:py-8">{children}</div>
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-30 flex gap-2 overflow-x-auto border-t border-white/80 bg-white/95 px-2 py-2 shadow-soft backdrop-blur lg:hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-w-20 flex-col items-center gap-1 rounded-[8px] px-2 py-2 text-[11px] font-bold ${
                active ? "bg-cocoa text-white" : "text-cocoa/65"
              }`}
            >
              <Icon size={18} />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
