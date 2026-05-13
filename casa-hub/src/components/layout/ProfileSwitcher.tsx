"use client";

import { members } from "@/data/mock";
import { useAppData } from "@/lib/app-data";

export function ProfileSwitcher() {
  const { activeMemberId, setActiveMemberId } = useAppData();

  return (
    <div className="rounded-[8px] border border-cocoa/10 bg-white p-1">
      <div className="grid grid-cols-3 gap-2">
        {members.map((member) => {
          const selected = activeMemberId === member.id;
          const displayName = member.name === "Karolyne" ? "Karo" : member.name;
          return (
            <button
              key={member.id}
              type="button"
              onClick={() => setActiveMemberId(member.id)}
              className={`focus-ring rounded-[8px] border p-1.5 text-center transition ${
                selected ? "border-cocoa/10 bg-cocoa/[0.04] shadow-soft" : "border-transparent bg-transparent hover:bg-cocoa/[0.03]"
              }`}
            >
              <span
                className="mx-auto flex h-7 w-7 items-center justify-center rounded-[6px] text-xs font-semibold text-white"
                style={{ background: member.color }}
              >
                {member.avatar}
              </span>
              <span className="mt-1.5 block text-[11px] font-medium text-cocoa/78">{displayName}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
