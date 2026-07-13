import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-gradient-hero text-primary-foreground">
      <div className="pointer-events-none absolute -top-24 start-1/2 h-96 w-[80%] -translate-x-1/2 bg-gradient-glow opacity-70" />
      <div className="relative mx-auto max-w-7xl px-6 py-20 text-center">
        {eyebrow && (
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold tracking-wider backdrop-blur">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-5 text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-primary-foreground/80">
            {description}
          </p>
        )}
        {children && <div className="mt-8 flex justify-center">{children}</div>}
      </div>
    </section>
  );
}
