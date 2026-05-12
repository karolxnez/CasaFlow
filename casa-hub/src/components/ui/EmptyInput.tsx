export function EmptyInput({ placeholder }: { placeholder: string }) {
  return (
    <input
      className="focus-ring w-full rounded-[8px] border border-cocoa/10 bg-white px-3 py-2 text-sm text-cocoa placeholder:text-cocoa/35"
      placeholder={placeholder}
    />
  );
}
