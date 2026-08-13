import type { Metadata } from 'next'
import BookCheckout from '@/components/site/BookCheckout'
import BookIntro from '@/components/site/BookIntro'
import { AuthorVideo } from '@/components/site/sections'

export const metadata: Metadata = {
  title: 'The New India Manifesto — Going Beyond Possible',
  description:
    'The New India Manifesto by Rohan Deshmukh — not a biography, a manifesto. A call to India’s youth to build a self-reliant New India. Get your copy.',
}

export default function BookPage() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-5 sm:px-8 sm:py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-14">
          {/* Left: content */}
          <BookIntro />

          {/* Right: sticky buy panel */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="mb-5 hidden overflow-hidden rounded-2xl border border-line shadow-lift lg:block">
              <img
                src="/images/book-cover.jpg"
                alt="The New India Manifesto: Going Beyond Possible"
                className="w-full"
              />
            </div>
            <BookCheckout />
          </div>
        </div>
      </div>
      <AuthorVideo />
    </>
  )
}
