type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export function PageHeader({ eyebrow, title, description, action }: PageHeaderProps) {
  return (
    <header className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {eyebrow ? <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-cocoa/34">{eyebrow}</p> : null}
        <h1 className="text-[1.75rem] font-semibold leading-none text-cocoa sm:text-[2rem]">{title}</h1>
        {description ? <p className="mt-1 max-w-xl text-sm font-medium text-cocoa/48">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  );
}
