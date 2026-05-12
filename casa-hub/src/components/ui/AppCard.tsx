import { clsx } from "clsx";

type AppCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function AppCard({ children, className }: AppCardProps) {
  return (
    <section className={clsx("rounded-[8px] border border-white/80 bg-white/78 p-4 shadow-soft backdrop-blur", className)}>
      {children}
    </section>
  );
}
