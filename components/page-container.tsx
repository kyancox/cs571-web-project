import type { ReactNode } from "react";

// Figma "Content" frame: 64px side padding, 40px top, 48px bottom, 24px gap
export function PageContainer({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 pt-10 pb-12 sm:px-8 lg:px-16">
      {children}
    </div>
  );
}

export function PageHeading({ children }: { children: ReactNode }) {
  return <h1 className="text-[28px] font-bold tracking-tight text-ink sm:text-[32px]">{children}</h1>;
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-[22px] font-semibold text-ink">{children}</h2>;
}
