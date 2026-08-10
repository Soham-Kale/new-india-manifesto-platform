'use client'

import { useState } from 'react'
import { CheckCircle2, Download, Loader2, ShoppingCart, X, Truck } from 'lucide-react'
import type { BookFormat } from '@/lib/types'
import { useMockData } from '@/lib/MockDataProvider'
import { loadRazorpay, getRazorpayKey } from '@/lib/razorpay'
import { isEmail, isPhone, req } from '@/lib/validation'
import Button from '@/components/ui/Button'
import FormInput from '@/components/ui/FormInput'
import FormTextarea from '@/components/ui/FormTextarea'
import CheckboxConsent from '@/components/ui/CheckboxConsent'

const PRICES: Record<BookFormat, number> = { physical: 499, ebook: 199 }

type Phase = 'idle' | 'form' | 'paying' | 'done'

export default function BookCheckout() {
  const { addBookOrder } = useMockData()
  const [format, setFormat] = useState<BookFormat>('physical')
  const [quantity, setQuantity] = useState(1)
  const [phase, setPhase] = useState<Phase>('idle')

  const [buyerName, setBuyerName] = useState('')
  const [buyerEmail, setBuyerEmail] = useState('')
  const [buyerPhone, setBuyerPhone] = useState('')
  const [address, setAddress] = useState('')
  const [optIn, setOptIn] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const amount = PRICES[format] * quantity

  const validate = () => {
    const e: Record<string, string> = {}
    if (!req(buyerName)) e.buyerName = 'Please enter your name.'
    if (!isEmail(buyerEmail)) e.buyerEmail = 'Enter a valid email.'
    if (!isPhone(buyerPhone)) e.buyerPhone = 'Enter a valid 10-digit phone number.'
    if (format === 'physical' && !req(address))
      e.address = 'A shipping address is required for the physical book.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const recordOrder = (paymentId?: string) => {
    addBookOrder({
      buyerName,
      buyerEmail,
      buyerPhone,
      format,
      quantity,
      amount,
      shippingAddress: format === 'physical' ? address : null,
      consentCampaignUpdates: optIn,
      paymentId,
    })
  }

  const pay = async () => {
    if (!validate()) return
    setPhase('paying')

    const key = getRazorpayKey()
    if (key) {
      // Real Razorpay Checkout in TEST MODE (test cards, no real money).
      const ok = await loadRazorpay()
      if (ok && window.Razorpay) {
        const rzp = new window.Razorpay({
          key,
          amount: amount * 100,
          currency: 'INR',
          name: 'The New India Manifesto',
          description: `${format === 'ebook' ? 'eBook' : 'Physical book'} × ${quantity}`,
          prefill: { name: buyerName, email: buyerEmail, contact: buyerPhone },
          notes: { format },
          theme: { color: '#6b4090' },
          handler: (resp) => {
            recordOrder(resp.razorpay_payment_id)
            setPhase('done')
          },
          modal: { ondismiss: () => setPhase('form') },
        })
        rzp.on('payment.failed', () => setPhase('form'))
        rzp.open()
        return
      }
      // Script failed to load → fall through to the simulated path.
    }

    // Simulated fallback — no key configured (default in this demo).
    window.setTimeout(() => {
      recordOrder()
      setPhase('done')
    }, 1500)
  }

  const reset = () => {
    setPhase('idle')
    setBuyerName('')
    setBuyerEmail('')
    setBuyerPhone('')
    setAddress('')
    setOptIn(false)
    setErrors({})
  }

  return (
    <div className="rounded-2xl border border-line bg-surface p-6 shadow-card">
      <h3 className="font-serif text-xl font-medium text-ink">Get your copy</h3>

      {/* Format toggle */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        {(['physical', 'ebook'] as BookFormat[]).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFormat(f)}
            className={`rounded-xl border px-4 py-3 text-left transition ${
              format === f
                ? 'border-accent bg-accent-soft'
                : 'border-line hover:border-ink/30'
            }`}
          >
            <span className="block text-sm font-medium capitalize text-ink">
              {f === 'ebook' ? 'eBook' : 'Physical'}
            </span>
            <span className="text-xs text-muted">₹{PRICES[f]}</span>
          </button>
        ))}
      </div>

      {/* Quantity */}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-muted">Quantity</span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="h-8 w-8 rounded-lg border border-line text-ink transition hover:border-ink/40"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="w-6 text-center text-sm font-medium tabular-nums">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(99, q + 1))}
            className="h-8 w-8 rounded-lg border border-line text-ink transition hover:border-ink/40"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
        <span className="text-sm text-muted">Total</span>
        <span className="font-serif text-2xl font-medium text-ink">₹{amount}</span>
      </div>

      <Button className="mt-4 w-full" onClick={() => setPhase('form')}>
        <ShoppingCart className="h-4 w-4" aria-hidden="true" />
        Buy now
      </Button>
      <p className="mt-3 text-center text-xs text-muted">
        Secure checkout via Razorpay · UPI, cards, netbanking
      </p>

      {/* Checkout modal */}
      {phase !== 'idle' && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-night/50 p-4 backdrop-blur-sm sm:items-center">
          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-line bg-surface shadow-lift">
            {phase === 'done' ? (
              <div className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success/10">
                  <CheckCircle2 className="h-7 w-7 text-success" aria-hidden="true" />
                </div>
                <h4 className="font-serif text-xl font-medium text-ink">Payment successful</h4>
                <p className="mt-2 text-sm text-muted">
                  Thank you, {buyerName.split(' ')[0]}. A confirmation has been sent to{' '}
                  {buyerEmail}.
                </p>
                {format === 'ebook' ? (
                  <a
                    href="/downloads/the-new-india-manifesto.pdf"
                    download="The New India Manifesto - Going Beyond Possible.pdf"
                    target="_blank"
                    rel="noopener"
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm font-medium text-canvas transition hover:bg-accent"
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                    Download your eBook
                  </a>
                ) : (
                  <p className="mt-5 flex items-center justify-center gap-2 text-sm text-muted">
                    <Truck className="h-4 w-4 text-accent" aria-hidden="true" />
                    Your order is in the fulfillment queue.
                  </p>
                )}
                <button
                  type="button"
                  onClick={reset}
                  className="mt-6 text-sm font-medium text-accent hover:text-ink"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between border-b border-line px-5 py-4">
                  <h4 className="font-medium text-ink">Checkout · ₹{amount}</h4>
                  <button
                    type="button"
                    onClick={reset}
                    className="rounded-lg p-1 text-muted hover:text-ink"
                    aria-label="Close"
                    disabled={phase === 'paying'}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="max-h-[70vh] space-y-4 overflow-y-auto p-5">
                  <FormInput
                    label="Full name"
                    name="buyerName"
                    required
                    value={buyerName}
                    error={errors.buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                  />
                  <FormInput
                    label="Email"
                    name="buyerEmail"
                    type="email"
                    required
                    value={buyerEmail}
                    error={errors.buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                  />
                  <FormInput
                    label="Phone"
                    name="buyerPhone"
                    type="tel"
                    required
                    value={buyerPhone}
                    error={errors.buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                  />
                  {format === 'physical' && (
                    <FormTextarea
                      label="Shipping address"
                      name="address"
                      required
                      rows={3}
                      value={address}
                      error={errors.address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  )}
                  <CheckboxConsent name="bookOptIn" checked={optIn} onChange={setOptIn}>
                    Send me campaign updates about the New India movement. (Optional — unrelated to
                    this purchase.)
                  </CheckboxConsent>
                </div>

                <div className="border-t border-line p-5">
                  <Button className="w-full" onClick={pay} disabled={phase === 'paying'}>
                    {phase === 'paying' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        Processing…
                      </>
                    ) : (
                      <>Pay ₹{amount} with Razorpay</>
                    )}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
