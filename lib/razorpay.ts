// Razorpay Checkout loader — frontend-only, TEST MODE.
// Uses the real Razorpay Checkout popup when a test key is configured via
// NEXT_PUBLIC_RAZORPAY_KEY_ID (test cards only, no real money, no server-side
// order/signature verification — that is backend work for a later phase).
// When no key is set, callers fall back to a simulated success.

export interface RazorpaySuccess {
  razorpay_payment_id: string
  razorpay_order_id?: string
  razorpay_signature?: string
}

export interface RazorpayOptions {
  key: string
  amount: number // in paise
  currency: string
  name: string
  description?: string
  image?: string
  order_id?: string
  prefill?: { name?: string; email?: string; contact?: string }
  notes?: Record<string, string>
  theme?: { color?: string }
  handler?: (response: RazorpaySuccess) => void
  modal?: { ondismiss?: () => void }
}

export interface RazorpayInstance {
  open: () => void
  on: (event: string, handler: (response: unknown) => void) => void
}

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance
  }
}

const SRC = 'https://checkout.razorpay.com/v1/checkout.js'
let loadingPromise: Promise<boolean> | null = null

export function getRazorpayKey(): string | undefined {
  const k = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
  return k && k.trim() ? k.trim() : undefined
}

/** Injects the Razorpay Checkout script once; resolves true when available. */
export function loadRazorpay(): Promise<boolean> {
  if (typeof window === 'undefined') return Promise.resolve(false)
  if (window.Razorpay) return Promise.resolve(true)
  if (loadingPromise) return loadingPromise

  loadingPromise = new Promise<boolean>((resolve) => {
    const script = document.createElement('script')
    script.src = SRC
    script.async = true
    script.onload = () => resolve(!!window.Razorpay)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
  return loadingPromise
}
