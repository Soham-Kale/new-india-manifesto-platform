import { ShoppingCart } from 'lucide-react'

const AMAZON_BOOK_URL =
  'https://www.amazon.in/New-India-Manifesto-Beyond-Possible/dp/9371644494'

const PRICE = 499

export default function BookCheckout() {
  return (
    <div className="rounded-2xl border border-line bg-surface p-6 shadow-card">
      <h3 className="font-serif text-xl font-medium text-ink">Get your copy</h3>

      {/* Physical book */}
      <div className="mt-4 text-center rounded-xl border border-accent bg-accent-soft px-4 py-3">
        <span className="block text-sm font-medium text-ink">Paperback</span>
        <span className="text-xs text-muted">Available on Amazon</span>
      </div>

      <a
        href={AMAZON_BOOK_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-glow"
      >
        <ShoppingCart className="h-4 w-4" aria-hidden="true" />
        Buy on Amazon
      </a>

      <p className="mt-3 text-center text-xs text-muted">
        Ships from Amazon · secure Amazon checkout
      </p>
    </div>
  )
}
