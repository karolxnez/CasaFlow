import { members } from "@/data/mock";

export function getMemberByName(name: string) {
  return members.find((member) => member.name === name) ?? members[0];
}

export function getShortName(name: string) {
  return name === "Karolyne" ? "Karo" : name;
}
