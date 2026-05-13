import { clsx } from "clsx";

type PrimaryButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "soft";
};

export function PrimaryButton({ className, variant = "solid", ...props }: PrimaryButtonProps) {
  return (
    <button
      className={clsx(
        "focus-ring inline-flex h-10 items-center justify-center gap-2 rounded-[8px] px-3.5 text-sm font-semibold transition",
        variant === "solid" ? "bg-cocoa text-white hover:bg-cocoa/92" : "border border-cocoa/12 bg-white text-cocoa hover:bg-cocoa/[0.03]",
        className
      )}
      {...props}
    />
  );
}
