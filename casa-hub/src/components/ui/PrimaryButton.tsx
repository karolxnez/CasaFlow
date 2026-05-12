import { clsx } from "clsx";

type PrimaryButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "soft";
};

export function PrimaryButton({ className, variant = "solid", ...props }: PrimaryButtonProps) {
  return (
    <button
      className={clsx(
        "focus-ring inline-flex items-center justify-center gap-2 rounded-[8px] px-4 py-2 text-sm font-black transition",
        variant === "solid" ? "bg-cocoa text-white hover:bg-cocoa/90" : "bg-white text-cocoa hover:bg-cream",
        className
      )}
      {...props}
    />
  );
}
