import { clsx } from "clsx";

type PrimaryButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "soft";
};

export function PrimaryButton({ className, variant = "solid", ...props }: PrimaryButtonProps) {
  return (
    <button
      className={clsx(
        "focus-ring inline-flex h-10 items-center justify-center gap-2 rounded-[10px] px-3.5 text-sm font-semibold transition",
        variant === "solid"
          ? "bg-[var(--app-accent)] text-[var(--app-accent-contrast)] hover:opacity-90"
          : "border border-[color:var(--app-border)] bg-[var(--app-surface)] text-[color:var(--app-text)] hover:bg-[var(--app-soft)]",
        className
      )}
      {...props}
    />
  );
}
