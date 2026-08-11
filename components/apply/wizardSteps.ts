export interface WizardStep {
  number: string
  label: string
  hint: string
}

export const FOUNDER_STEPS: WizardStep[] = [
  { number: '01', label: 'About you', hint: 'Who you are' },
  { number: '02', label: 'Your idea', hint: 'What you’re building' },
  { number: '03', label: 'Your story', hint: 'Share a video link' },
  { number: '04', label: 'Review', hint: 'Consent & submit' },
]
