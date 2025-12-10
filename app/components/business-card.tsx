import { cn } from "@/lib/utils";

type Props = {
  name: string;
  tagline: string;
  description: string;
  subdued?: boolean;
};

export default function BusinessCard({
  name,
  tagline,
  description,
  subdued = false,
}: Props) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/60 p-6 transition-all duration-200",
        subdued
          ? "bg-white/70"
          : "bg-white shadow-subtle hover:-translate-y-0.5 hover:shadow-lg"
      )}
    >
      <div className="space-y-3">
        <div>
          <h3 className="text-sm font-medium text-ink">{name}</h3>
          <p className="text-xs text-amber-700/80 mt-1">{tagline}</p>
        </div>
        <p className="text-xs text-ink-muted leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
