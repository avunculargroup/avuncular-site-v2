import type { ReactNode } from "react";

type SectionProps = {
  title: string;
  children: ReactNode;
};

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function Section({ title, children }: SectionProps) {
  const headingId = `section-${slugify(title)}`;
  return (
    <section className="space-y-6" aria-labelledby={headingId}>
      <h2
        id={headingId}
        className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700"
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
