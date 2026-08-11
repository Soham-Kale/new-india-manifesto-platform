'use client'

import { Check } from 'lucide-react'
import type { WizardStep } from './wizardSteps'
import { useT } from '@/lib/i18n'

interface Props {
  steps: WizardStep[]
  currentStep: number
  maxReached: number
  onStepClick: (index: number) => void
}

export default function ApplicationAside({
  steps,
  currentStep,
  maxReached,
  onStepClick,
}: Props) {
  const { t } = useT()
  return (
    <aside className="sticky top-0 hidden h-screen w-[340px] shrink-0 flex-col justify-between overflow-hidden bg-night px-9 py-10 text-canvas lg:flex xl:w-[380px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 top-24 h-56 w-56 rounded-full bg-accent/20 blur-3xl"
      />

      <div className="relative">
        <div>
          <p className="font-serif text-lg font-medium tracking-tight">{t('apply.asideName')}</p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-canvas/45">
            {t('apply.asideTagline')}
          </p>
        </div>

        <ol className="mt-14 space-y-1">
          {steps.map((step, i) => {
            const isActive = i === currentStep
            const isDone = i < currentStep
            const isReachable = i <= maxReached
            const isLast = i === steps.length - 1
            return (
              <li key={step.number} className="relative">
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className={`absolute left-[15px] top-9 h-[calc(100%-12px)] w-px ${
                      isDone ? 'bg-accent/60' : 'bg-canvas/12'
                    }`}
                  />
                )}
                <button
                  type="button"
                  disabled={!isReachable}
                  onClick={() => isReachable && onStepClick(i)}
                  aria-current={isActive ? 'step' : undefined}
                  className={`group flex w-full items-center gap-4 rounded-xl px-2 py-2.5 text-left transition-colors ${
                    isReachable ? 'cursor-pointer' : 'cursor-default'
                  } ${isActive ? 'bg-canvas/[0.06]' : 'hover:bg-canvas/[0.04]'}`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-all ${
                      isDone
                        ? 'border-accent bg-accent text-canvas'
                        : isActive
                          ? 'border-accent bg-accent/15 text-accent-ring'
                          : 'border-canvas/20 text-canvas/40'
                    }`}
                  >
                    {isDone ? <Check className="h-4 w-4" aria-hidden="true" /> : step.number}
                  </span>
                  <span className="min-w-0">
                    <span
                      className={`block text-sm font-medium transition-colors ${
                        isActive ? 'text-canvas' : isDone ? 'text-canvas/70' : 'text-canvas/45'
                      }`}
                    >
                      {step.label}
                    </span>
                    <span className="block text-xs text-canvas/35">{step.hint}</span>
                  </span>
                </button>
              </li>
            )
          })}
        </ol>
      </div>

      <div className="relative">
        <blockquote className="border-l-2 border-accent/60 pl-4">
          <p className="font-serif text-base italic leading-relaxed text-canvas/75">
            &ldquo;{t('apply.asideQuote')}&rdquo;
          </p>
        </blockquote>
        <p className="mt-6 text-[11px] text-canvas/35">{t('apply.asideCopyright')}</p>
      </div>
    </aside>
  )
}
