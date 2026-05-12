"use client";

import { members } from "@/data/mock";
import { useState } from "react";

export function ProfileSwitcher() {
  const [active, setActive] = useState(members[0].id);

  return (
    <div className="rounded-[8px] border border-white/80 bg-white/70 p-3 shadow-soft">
      <p className="mb-3 text-xs font-bold uppercase tracking-wide text-cocoa/60">Perfis da casa</p>
      <div className="grid grid-cols-3 gap-2">
        {members.map((member) => {
          const selected = active === member.id;
          return (
            <button
              key={member.id}
              type="button"
              onClick={() => setActive(member.id)}
              className={`focus-ring rounded-[8px] border p-2 text-center transition ${
                selected ? "border-cocoa bg-cream" : "border-transparent bg-white/60 hover:border-cocoa/20"
              }`}
            >
              <span
                className="mx-auto flex h-10 w-10 items-center justify-center rounded-[8px] text-sm font-black text-white"
                style={{ background: member.color }}
              >
                {member.avatar}
              </span>
              <span className="mt-2 block truncate text-xs font-bold text-cocoa">{member.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
