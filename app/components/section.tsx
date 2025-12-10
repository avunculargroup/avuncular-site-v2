import type { ReactNode } from "react";

type SectionProps = {
  title: string;
  children: ReactNode;
};

export default function Section({ title, children }: SectionProps) {
  return (
    <section className="space-y-6">
      <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">
        {title}
      </h2>
      {children}
    </section>
  );
}
