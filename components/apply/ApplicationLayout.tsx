'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import ApplicationAside from './ApplicationAside'
import type { WizardStep } from './wizardSteps'

interface Props {
  steps: WizardStep[]
  currentStep: number
  maxReached: number
  goToStep: (index: number) => void
  children: ReactNode
}

export default function ApplicationLayout({
  steps,
  currentStep,
  maxReached,
  goToStep,
  children,
}: Props) {
  const total = steps.length
  const progress = ((currentStep + 1) / total) * 100

  return (
    <div className="flex min-h-screen bg-canvas">
      <ApplicationAside
        steps={steps}
        currentStep={currentStep}
        maxReached={maxReached}
        onStepClick={goToStep}
      />

      <div className="flex min-h-screen flex-1 flex-col">
        {/* Mobile top bar */}
        <header className="sticky top-0 z-20 border-b border-line bg-canvas/85 backdrop-blur-md lg:hidden">
          <div className="flex items-center justify-between px-5 py-3.5 sm:px-8">
            <Link href="/" className="text-left">
              <p className="font-serif text-sm font-medium tracking-tight text-ink">
                Rohan Deshmukh
              </p>
              <p className="text-[10px] uppercase tracking-[0.18em] text-accent">
                The New India Manifesto
              </p>
            </Link>
            <span className="rounded-full border border-line px-2.5 py-1 text-[11px] font-medium text-muted">
              Application
            </span>
          </div>
        </header>

        <main className="flex flex-1 flex-col">
          <div className="mx-auto flex w-full max-w-[720px] flex-1 flex-col px-5 py-8 sm:px-8 sm:py-12 lg:py-16">
            {/* Mobile progress */}
            <div className="mb-8 lg:hidden">
              <div className="mb-2 flex items-baseline justify-between">
                <span className="text-sm font-medium text-ink">
                  Step {currentStep + 1} of {total}
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                  {steps[currentStep].label}
                </span>
              </div>
              <div className="flex gap-1.5">
                {steps.map((s, i) => (
                  <span
                    key={s.number}
                    className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${
                      i <= currentStep ? 'bg-accent' : 'bg-line'
                    }`}
                  />
                ))}
              </div>
              <span className="sr-only">{Math.round(progress)}% complete</span>
            </div>

            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
