'use client'

import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  MapPin,
  Quote,
  Sprout,
  HeartHandshake,
  Users,
  HandHeart,
  Handshake,
  Play,
  Phone,
  Mail,
  MessageCircle,
} from 'lucide-react'
import PillLink from '@/components/ui/PillLink'
// import AvatarStack from '@/components/ui/AvatarStack'
import { useT } from '@/lib/i18n'

const WORK = [
  { img: '/images/social-activities.jpg', key: 'w1' },
  { img: '/images/mass-marriage.jpg', key: 'w2' },
  { img: '/images/community.jpg', key: 'w3' },
  { img: '/images/rally.jpg', key: 'w4' },
  { img: '/images/work.jpg', key: 'w5' },
  { img: '/images/about.jpg', key: 'w6' },
] as const

const STATS = [
  { value: '3,000+', key: 'marriages' },
  { value: '1,00,000', key: 'entrepreneurs' },
  { value: '4', key: 'institutions' },
] as const

/** Small reusable eyebrow with a marigold rule. */
function Eyebrow({ children, tone = 'dark' }: { children: React.ReactNode; tone?: 'light' | 'dark' }) {
  return (
    <p
      className={`flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.22em] ${
        tone === 'light' ? 'text-gold' : 'text-accent'
      }`}
    >
      <span className="h-px w-7 gold-rule" aria-hidden="true" />
      {children}
    </p>
  )
}

/* ============================================================
   HERO — headline left, Rohan's portrait right (maroon)
   ============================================================ */
export function Hero() {
  const { t } = useT()
  return (
    <section className="relative -mt-20 overflow-hidden bg-night text-white lg:-mt-24">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/rally.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-br from-night via-night/95 to-night-soft"
      />
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-night/90 to-transparent"
      />
      <div className="bg-night-aura">
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-12 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pb-24 lg:pt-12">
          {/* Left — the argument */}
          <div className="animate-fade-up">
            <Eyebrow tone="light">{t('home.hero.eyebrow')}</Eyebrow>

            <h1 className="mt-5 font-display text-[2.4rem] font-bold leading-[1.04] tracking-[-0.02em] sm:text-[3.6rem]">
              {t('home.hero.title1')}
              <br />
              {t('home.hero.title2')}{' '}
              <span className="text-accent-ring">{t('home.hero.titleAccent')}</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              {t('home.hero.subcopy')}
            </p>

            {/* <div className="mt-8">
              <AvatarStack tone="light" count={t('home.hero.proofCount')} label={t('home.hero.proofLabel')} />
            </div> */}

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <PillLink href="/apply/founder" variant="light">
                {t('home.hero.ctaPledge')}
              </PillLink>
              <PillLink href="/book" variant="outline">
                {t('home.hero.ctaBook')}
              </PillLink>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/60">
              <span className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-accent-ring" aria-hidden="true" />
                {t('home.hero.byline')}
              </span>
            </div>
          </div>

          {/* Right — Rohan portrait */}
          <div className="relative mx-auto w-full max-w-sm animate-scale-in lg:mr-0">
            <div
              aria-hidden="true"
              className="absolute -right-6 -top-6 h-40 w-40 rounded-full bg-accent/30 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-8 -left-6 h-36 w-36 rounded-full bg-gold/20 blur-3xl"
            />
            <div className="relative overflow-hidden rounded-[1.75rem] shadow-lift ring-1 ring-white/15">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portrait.jpg"
                alt={t('home.hero.author')}
                className="aspect-[4/5] w-full object-cover object-top"
              />
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-night to-transparent"
              />
              <div className="absolute inset-x-4 bottom-4">
                <p className="font-display text-lg font-bold leading-tight text-white">
                  {t('home.hero.author')}
                </p>
                <p className="text-xs text-white/70">{t('home.hero.authorRole')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   BOOK FEATURE — cover + summary (home)
   ============================================================ */
export function BookFeature() {
  const { t } = useT()
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[300px_1fr] lg:gap-16">
          {/* Book cover */}
          <div className="mx-auto w-full max-w-[280px] lg:mx-0">
            <div className="overflow-hidden rounded-2xl border border-line shadow-lift">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/book-cover.jpg"
                alt={t('book.title')}
                className="w-full"
              />
            </div>
          </div>

          {/* Summary */}
          <div>
            <Eyebrow>{t('book.eyebrow')}</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem]">
              {t('book.title')}
            </h2>
            <p className="mt-2 text-lg text-muted">{t('book.subtitle')}</p>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted">
              {t('book.synopsis')}
            </p>
            <div className="mt-8">
              <PillLink href="/book" variant="dark">
                {t('home.funnel.readCta')}
              </PillLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   FUNNEL — Read → Pledge → Act
   ============================================================ */
const FUNNEL = [
  { icon: BookOpen, key: 'read', href: '/book' },
  { icon: HandHeart, key: 'pledge', href: '/pledge' },
  { icon: Handshake, key: 'act', href: '/initiative' },
] as const

export function FunnelSteps() {
  const { t } = useT()
  return (
    <section className="border-b border-line bg-surface-2">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="max-w-2xl">
          <Eyebrow>{t('home.funnel.eyebrow')}</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem]">
            {t('home.funnel.title')}
          </h2>
          <p className="mt-3 text-muted">{t('home.funnel.subcopy')}</p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {FUNNEL.map(({ icon: Icon, key, href }, i) => (
            <Link
              key={key}
              href={href}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface p-6 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="font-display text-4xl font-bold text-line-strong transition-colors group-hover:text-accent/30">
                  0{i + 1}
                </span>
              </div>
              <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
                {t(`home.funnel.${key}Step`)}
              </p>
              <h3 className="mt-1.5 text-lg font-semibold text-ink">{t(`home.funnel.${key}Title`)}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{t(`home.funnel.${key}Desc`)}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                {t(`home.funnel.${key}Cta`)}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================================
  COMMUNITY EVENTS
   ============================================================ */
const EVENTS = [
  { img: '/images/social-activities.jpg', key: 'e1' },
  { img: '/images/rally.jpg', key: 'e2' },
  { img: '/images/community.jpg', key: 'e3' },
] as const

export function CommunityEvents() {
  const { t } = useT()
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            {t('home.events.eyebrow')}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem]">
            {t('home.events.title')}
          </h2>
        </div>

        <div className="mt-12 space-y-5">
          {EVENTS.map(({ img, key }) => (
            <article
              key={key}
              className="grid gap-0 overflow-hidden rounded-3xl border border-line bg-surface shadow-card transition-shadow hover:shadow-lift sm:grid-cols-[240px_1fr]"
            >
              <div className="relative aspect-[16/10] sm:aspect-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt={t(`home.events.${key}Title`)} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-md">
                  <h3 className="text-lg font-semibold text-ink">{t(`home.events.${key}Title`)}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{t(`home.events.${key}Desc`)}</p>
                  <dl className="mt-4 space-y-1.5 text-sm text-ink">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-accent" aria-hidden="true" />
                      <span className="font-medium">{t('home.events.dateLabel')}</span> {t(`home.events.${key}Date`)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-accent" aria-hidden="true" />
                      <span className="font-medium">{t('home.events.timeLabel')}</span> {t(`home.events.${key}Time`)}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
                      <span className="font-medium">{t('home.events.locationLabel')}</span> {t(`home.events.${key}Location`)}
                    </div>
                  </dl>
                </div>
                <div className="shrink-0">
                  <PillLink href="/pledge" variant="dark">
                    {t('home.events.details')}
                  </PillLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   ABOUT STORY (used on /rohan)
   ============================================================ */
export function AboutStory() {
  const { t } = useT()
  return (
    <section className="border-b border-line">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div className="order-2 lg:order-1">
          <Eyebrow>{t('home.about.eyebrow')}</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem]">
            {t('home.about.title')}
          </h2>
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted">
            <p>{t('home.about.p1')}</p>
            <p>{t('home.about.p2')}</p>
            <p>{t('home.about.p3')}</p>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className="overflow-hidden rounded-3xl shadow-lift ring-1 ring-ink/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/rohan-about-1.jpg" alt={t('home.about.title')} className="aspect-[4/5] w-full object-cover object-top" />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   JOURNEY TIMELINE (used on /initiative)
   ============================================================ */
const MILESTONES = [
  { img: '/images/work.jpg', key: 'm1' },
  { img: '/images/mass-marriage.jpg', key: 'm2' },
  { img: '/images/community.jpg', key: 'm3' },
  { img: '/images/rally.jpg', key: 'm4' },
] as const

export function JourneyTimeline() {
  const { t } = useT()
  return (
    <section className="border-b border-line bg-surface-2">
      <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>
            <span className="mx-auto">{t('home.timeline.eyebrow')}</span>
          </Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem]">
            {t('home.timeline.title')}
          </h2>
        </div>

        <div className="relative mt-14 pl-8 sm:pl-0">
          <span
            aria-hidden="true"
            className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-accent/25 sm:left-1/2 sm:-translate-x-1/2"
          />
          <div className="space-y-10">
            {MILESTONES.map(({ img, key }, i) => (
              <div
                key={key}
                className={`relative sm:grid sm:grid-cols-2 sm:gap-10 ${
                  i % 2 === 1 ? 'sm:[&>*:first-child]:order-2' : ''
                }`}
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-[27px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent ring-4 ring-surface-2 sm:left-1/2 sm:-translate-x-1/2"
                />
                <div className={i % 2 === 1 ? 'sm:text-left' : 'sm:text-right'}>
                  <p className="font-display text-4xl font-bold text-accent/30">{t(`home.timeline.${key}Year`)}</p>
                  <h3 className="mt-1 text-lg font-semibold text-ink">{t(`home.timeline.${key}Title`)}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{t(`home.timeline.${key}Desc`)}</p>
                </div>
                <div className="mt-4 sm:mt-0">
                  <div className="overflow-hidden rounded-2xl shadow-card ring-1 ring-ink/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={t(`home.timeline.${key}Title`)} loading="lazy" className="aspect-[16/10] w-full object-cover" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   VISION BAND
   ============================================================ */
export function VisionBand() {
  const { t } = useT()
  return (
    <section className="relative overflow-hidden bg-night text-canvas">
      <div className="bg-night-aura">
        <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 lg:py-28">
          <Quote className="relative mx-auto h-9 w-9 text-gold" aria-hidden="true" />
          <p className="relative mt-6 font-serif text-2xl font-medium leading-snug tracking-tight text-balance sm:text-3xl lg:text-[2.5rem]">
            {t('home.vision.quote')}
          </p>
          <p className="relative mt-8 text-sm uppercase tracking-[0.22em] text-gold">
            {t('home.vision.author')}
          </p>

          <div className="relative mt-16 grid gap-8 border-t border-canvas/10 pt-12 sm:grid-cols-3">
            {STATS.map((s) => (
              <div key={s.key}>
                <p className="font-display text-4xl font-bold text-canvas lg:text-5xl">{s.value}</p>
                <p className="mt-2 text-sm text-canvas/60">{t(`home.stats.${s.key}Label`)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   WORK GRID — horizontal auto-scrolling carousel
   ============================================================ */
export function WorkGrid() {
  const { t } = useT()
  const track = [...WORK, ...WORK]
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-6xl px-5 pt-16 sm:px-8 lg:pt-24">
        <div className="max-w-2xl">
          <Eyebrow>{t('home.work.eyebrow')}</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem]">
            {t('home.work.title')}
          </h2>
          <p className="mt-3 text-muted">{t('home.work.subcopy')}</p>
        </div>
      </div>

      <div className="group relative mt-12 overflow-hidden pb-16 lg:pb-24">
        <div className="flex w-max gap-5 pl-5 animate-marquee group-hover:[animation-play-state:paused] sm:pl-8">
          {track.map((w, i) => (
            <article
              key={`${w.key}-${i}`}
              className="w-[280px] shrink-0 overflow-hidden rounded-3xl border border-line bg-surface shadow-card sm:w-[320px]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={w.img} alt={t(`home.work.${w.key}Title`)} loading="lazy" className="h-full w-full object-cover" />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-linear-to-t from-night/55 via-transparent to-transparent opacity-70"
                />
              </div>
              <div className="p-5">
                <h3 className="text-base font-semibold text-ink">{t(`home.work.${w.key}Title`)}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{t(`home.work.${w.key}Desc`)}</p>
              </div>
            </article>
          ))}
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-linear-to-r from-canvas to-transparent sm:w-20"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-linear-to-l from-canvas to-transparent sm:w-20"
        />
      </div>
    </section>
  )
}

/* ============================================================
  AUTHOR VIDEO
   ============================================================ */
export function AuthorVideo() {
  const { t } = useT()
  return (
    <section className="border-b border-line bg-surface-2">
      <div className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-8 lg:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">{t('home.video.eyebrow')}</p>
        <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-ink sm:text-[2.6rem]">
          {t('home.video.title')}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted">{t('home.video.subcopy')}</p>

        <div className="group relative mx-auto mt-10 max-w-3xl overflow-hidden rounded-3xl shadow-lift ring-1 ring-ink/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/community.jpg" alt={t('home.hero.author')} className="aspect-video w-full object-cover" />
          <span aria-hidden="true" className="absolute inset-0 bg-night/35" />
          <button type="button" aria-label={t('home.video.play')} className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 text-accent shadow-lift transition-transform duration-300 group-hover:scale-110">
              <Play className="h-8 w-8 translate-x-0.5 fill-current" aria-hidden="true" />
            </span>
          </button>
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-night/70 px-3 py-1 text-xs text-white/80">
            {t('home.video.badge')}
          </span>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
  CONTACT (used on /rohan)
   ============================================================ */
const CONTACTS = [
  { icon: Phone, key: 'call', value: '+91 8208737624', href: 'tel:+918208737624' },
  { icon: MessageCircle, key: 'whatsapp', value: '+91 8208737624', href: 'https://wa.me/918208737624' },
  { icon: Mail, key: 'email', value: 'connect@rohandeshmukh.in', href: 'mailto:connect@rohandeshmukh.in' },
  { icon: MapPin, key: 'office', value: null, href: null },
] as const

export function ContactSection() {
  const { t } = useT()
  return (
    <section className="relative overflow-hidden bg-night text-canvas">
      <div className="bg-night-aura">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <div>
            <Eyebrow tone="light">{t('home.contact.eyebrow')}</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-[2.5rem]">
              {t('home.contact.title')}
            </h2>
            <p className="mt-3 max-w-md text-canvas/70">{t('home.contact.subcopy')}</p>

            <dl className="mt-8 space-y-4">
              {CONTACTS.map(({ icon: Icon, key, value, href }) => {
                const display = value ?? t('home.contact.officeValue')
                return (
                  <div key={key} className="flex items-center gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-gold">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-canvas/50">
                        {t(`home.contact.${key}Label`)}
                      </dt>
                      <dd className="text-sm font-medium text-canvas">
                        {href ? (
                          <a
                            href={href}
                            target={href.startsWith('http') ? '_blank' : undefined}
                            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="transition-colors hover:text-accent-ring"
                          >
                            {display}
                          </a>
                        ) : (
                          display
                        )}
                      </dd>
                    </div>
                  </div>
                )
              })}
            </dl>
          </div>

          <div className="relative overflow-hidden rounded-3xl shadow-lift ring-1 ring-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/rohan-about-2.jpg" alt={t('home.hero.author')} className="aspect-[4/5] w-full object-cover object-top" />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
  INVITATION CTA
   ============================================================ */
const INVITE = [
  { icon: Sprout, key: 'i1' },
  { icon: HeartHandshake, key: 'i2' },
  { icon: Users, key: 'i3' },
] as const

export function InvitationCTA() {
  const { t } = useT()
  return (
    <section className="border-b border-line bg-surface-2">
      <div className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-8 lg:py-24">
        <Eyebrow>
          <span className="mx-auto">{t('home.invite.eyebrow')}</span>
        </Eyebrow>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink text-balance sm:text-[2.5rem]">
          {t('home.invite.title')}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">{t('home.invite.subcopy')}</p>

        <div className="mx-auto mt-10 grid max-w-2xl gap-3 text-left">
          {INVITE.map(({ icon: Icon, key }) => (
            <div
              key={key}
              className="flex items-start gap-3.5 rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-accent/30"
            >
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <p className="text-sm leading-relaxed text-ink">{t(`home.invite.${key}`)}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <PillLink href="/apply/founder" variant="accent">
            {t('home.invite.cta')}
          </PillLink>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
  JOIN BAND — footer CTA using the book-cover artwork
   ============================================================ */
export function JoinBand() {
  const { t } = useT()
  return (
    <section className="relative overflow-hidden bg-night text-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/join-book.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-25"
      />
      {/* strong, even dark overlay so the white text stays clearly readable */}
      <span aria-hidden="true" className="absolute inset-0 bg-night/80" />
      <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 lg:py-24">
        <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight text-balance sm:text-5xl">
          {t('home.join.title')}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/70">{t('home.join.subcopy')}</p>
        <div className="mt-9 flex justify-center">
          <PillLink href="/pledge" variant="light">
            {t('home.join.cta')}
          </PillLink>
        </div>
      </div>
    </section>
  )
}
