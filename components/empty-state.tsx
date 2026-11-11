import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

// Figma "Empty State" frame (screens 6 and 8)
export function EmptyState({
  icon: Icon,
  title,
  subtitle,
  action,
}: {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3.5 rounded-xl border-[1.5px] border-dashed border-line-strong bg-surface px-6 py-14 text-center">
      <div className="mb-1 grid size-16 place-items-center rounded-full bg-sunken">
        <Icon size={32} strokeWidth={1.75} className="text-muted" aria-hidden />
      </div>
      <h2 className="text-2xl font-semibold text-ink">{title}</h2>
      <p className="text-muted">{subtitle}</p>
      {action && <div className="pt-2">{action}</div>}
    </div>
  );
}
