export default function StepHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string
  title: string
  subtitle: string
}) {
  return (
    <div className="mb-8">
      <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        <span className="h-px w-6 bg-accent/50" aria-hidden="true" />
        {eyebrow}
      </p>
      <h1 className="font-serif text-[1.75rem] font-medium leading-tight tracking-tight text-ink sm:text-4xl">
        {title}
      </h1>
      <p className="mt-2.5 text-sm leading-relaxed text-muted sm:text-base">{subtitle}</p>
    </div>
  )
}
