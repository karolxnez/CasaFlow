import { clsx } from "clsx";

type AppCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function AppCard({ children, className }: AppCardProps) {
  return (
    <section
      className={clsx(
        "rounded-[10px] border p-3.5 sm:p-4",
        "border-[color:var(--app-border)] bg-[var(--app-surface)] shadow-[var(--app-shadow)]",
        className
      )}
    >
      {children}
    </section>
  );
}
