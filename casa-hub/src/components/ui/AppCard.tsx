import { clsx } from "clsx";

type AppCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function AppCard({ children, className }: AppCardProps) {
  return (
    <section className={clsx("rounded-[8px] border border-cocoa/10 bg-white/96 p-3.5 shadow-soft sm:p-4", className)}>
      {children}
    </section>
  );
}
