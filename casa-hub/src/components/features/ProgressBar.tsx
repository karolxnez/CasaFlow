import { percent } from "@/lib/format";

export function ProgressBar({ value, total }: { value: number; total: number }) {
  const width = percent(value, total);

  return (
    <div className="h-2 overflow-hidden rounded-[8px] bg-cocoa/10">
      <div className="h-full rounded-[8px] bg-sage" style={{ width: `${width}%` }} />
    </div>
  );
}
