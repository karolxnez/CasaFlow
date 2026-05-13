export function EmptyInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="focus-ring w-full rounded-[8px] border border-cocoa/10 bg-cocoa/[0.02] px-3 py-2 text-sm text-cocoa placeholder:text-cocoa/35"
      {...props}
    />
  );
}
