import { clsx } from "clsx";
import { Member } from "@/types/domain";
import { getShortName } from "@/lib/profiles";

type MemberBadgeProps = {
  member: Member;
  compact?: boolean;
  className?: string;
};

export function MemberBadge({ member, compact, className }: MemberBadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2 rounded-[10px] border px-2.5 py-1.5 text-sm font-semibold",
        "border-[color:var(--app-border)] bg-[var(--app-surface)] text-[color:var(--app-text)]",
        className
      )}
    >
      {compact ? (
        <span className="flex h-5 w-5 items-center justify-center rounded-[6px] text-[10px] font-semibold text-white" style={{ background: member.color }}>
          {member.avatar}
        </span>
      ) : (
        <>
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: member.color }} />
          {getShortName(member.name)}
        </>
      )}
    </span>
  );
}
