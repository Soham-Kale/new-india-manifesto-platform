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
import AvatarStack from '@/components/ui/AvatarStack'

const WORK = [
  {
    img: '/images/social-activities.jpg',
    title: 'Lokmangal Foundation',
    desc: 'Investing in people — water projects, education, healthcare and rural livelihoods.',
  },
  {
    img: '/images/mass-marriage.jpg',
    title: 'Community Marriages',
    desc: 'Over 3,000 mass marriages — turning weddings from a financial burden into a celebration of unity.',
  },
  {
    img: '/images/community.jpg',
    title: 'Reading Halls & Youth',
    desc: 'Libraries, mentorship and a platform for young people to step into the mainstream.',
  },
  {
    img: '/images/rally.jpg',
    title: 'Voice of the Youth',
    desc: 'Bringing young people into the mainstream — in education, technology, business and agriculture.',
  },
  {
    img: '/images/work.jpg',
    title: 'Lokmangal Multi-State Co-op',
    desc: 'A cooperative movement carrying forward a legacy of enterprise across Maharashtra and beyond.',
  },
  {
    img: '/images/about.jpg',
    title: 'Youth Icon of Maharashtra',
    desc: 'On our way to building your dreams — one entrepreneur, one village at a time.',
  },
]

const STATS = [
  { value: '3,000+', label: 'Community marriages organised' },
  { value: '1,00,000', label: 'Entrepreneurs we aim to incubate' },
  { value: '4', label: 'Institutions led on the ground' },
]

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
   HERO — Politian-style full-bleed crowd photo + big headline
   ============================================================ */
export function Hero() {
  return (
    <section className="relative -mt-20 overflow-hidden bg-night text-white lg:-mt-24">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/rally.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r from-night via-night/90 to-night/50"
      />
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-night/90 to-transparent"
      />
      <div className="bg-night-aura">
        <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-32 sm:px-8 lg:pb-28 lg:pt-40">
          <div className="max-w-2xl animate-fade-up">
            <Eyebrow tone="light">A manifesto for a self-reliant India</Eyebrow>

            <h1 className="mt-5 font-display text-[2.6rem] font-bold leading-[1.02] tracking-[-0.02em] sm:text-6xl">
              Read the argument.
              <br />
              Take the pledge.{' '}
              <span className="text-accent-ring">Then act.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              Dedicated to building a New India from its rural heartland — with integrity, enterprise,
              and a vision to incubate a hundred thousand entrepreneurs.
            </p>

            <div className="mt-8">
              <AvatarStack tone="light" count="56k+" label="people in the movement" />
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <PillLink href="/pledge" variant="light">
                Take the Pledge
              </PillLink>
              <PillLink href="/book" variant="outline">
                Read the Book
              </PillLink>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/60">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent-ring" aria-hidden="true" />
                Solapur, Maharashtra
              </span>
              <span className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-accent-ring" aria-hidden="true" />
                Going Beyond Possible — by Rohan Deshmukh
              </span>
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
  {
    icon: BookOpen,
    step: 'Read',
    title: 'Read the argument',
    desc: 'Explore the manifesto and the case for a self-reliant, enterprise-led India.',
    href: '/book',
    cta: 'Explore the book',
  },
  {
    icon: HandHeart,
    step: 'Pledge',
    title: 'Take the pledge',
    desc: '“Yes, I Am In.” Join the movement in under a minute — no account needed.',
    href: '/pledge',
    cta: 'Take the pledge',
  },
  {
    icon: Handshake,
    step: 'Act',
    title: 'Act on it',
    desc: 'Apply to be incubated, or step up to mentor, back a founder, or lend your expertise.',
    href: '/initiative',
    cta: 'See the initiative',
  },
]

export function FunnelSteps() {
  return (
    <section className="border-b border-line bg-surface-2">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="max-w-2xl">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem]">
            Read <span className="text-accent">→</span> Pledge <span className="text-accent">→</span> Act
          </h2>
          <p className="mt-3 text-muted">
            This isn&apos;t a stack of forms. It&apos;s one path — a movement first, a programme
            second. Start wherever you are.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {FUNNEL.map(({ icon: Icon, step, title, desc, href, cta }, i) => (
            <Link
              key={step}
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
                {step}
              </p>
              <h3 className="mt-1.5 text-lg font-semibold text-ink">{title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{desc}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                {cta}
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
   COMMUNITY EVENTS — Politian "Join our events & community"
   ============================================================ */
const EVENTS = [
  {
    img: '/images/social-activities.jpg',
    title: 'Community town-hall meeting',
    desc: 'Join local leaders and residents for an open discussion on community priorities.',
    date: 'September 12, 2026',
    time: '6:00 PM – 8:00 PM',
    location: 'Lokmangal Bhavan, Solapur',
  },
  {
    img: '/images/rally.jpg',
    title: 'Youth entrepreneurship meet',
    desc: 'A forum for young founders to pitch ideas and connect with mentors and investors.',
    date: 'October 2, 2026',
    time: '10:00 AM – 4:00 PM',
    location: 'District Hall, Solapur',
  },
  {
    img: '/images/community.jpg',
    title: 'Manifesto reading & book launch',
    desc: 'An evening on the ideas in the book — and what a self-reliant New India asks of us.',
    date: 'October 20, 2026',
    time: '5:30 PM – 7:30 PM',
    location: 'Reading Hall, Solapur',
  },
]

export function CommunityEvents() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            Join our event
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem]">
            Join our upcoming events &amp; community
          </h2>
        </div>

        <div className="mt-12 space-y-5">
          {EVENTS.map((e) => (
            <article
              key={e.title}
              className="grid gap-0 overflow-hidden rounded-3xl border border-line bg-surface shadow-card transition-shadow hover:shadow-lift sm:grid-cols-[240px_1fr]"
            >
              <div className="relative aspect-[16/10] sm:aspect-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={e.img}
                  alt={e.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-md">
                  <h3 className="text-lg font-semibold text-ink">{e.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{e.desc}</p>
                  <dl className="mt-4 space-y-1.5 text-sm text-ink">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-accent" aria-hidden="true" />
                      <span className="font-medium">Date:</span> {e.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-accent" aria-hidden="true" />
                      <span className="font-medium">Time:</span> {e.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
                      <span className="font-medium">Location:</span> {e.location}
                    </div>
                  </dl>
                </div>
                <div className="shrink-0">
                  <PillLink href="/pledge" variant="dark">
                    Event Details
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
  return (
    <section className="border-b border-line">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div className="order-2 lg:order-1">
          <Eyebrow>The story</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem]">
            From Solapur to a national vision
          </h2>
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted">
            <p>
              My journey is tied to the soil of Solapur — a city once known for its textile mills,
              beedi industry and railway junction. Growing up as the son of{' '}
              <strong className="font-medium text-ink">Subhash Bapu Deshmukh</strong>, I learned that
              enterprise and service belong together.
            </p>
            <p>
              His story still inspires me — a school dropout who started with odd jobs in a poultry
              factory and became a first-generation entrepreneur, building from a grocery shop and dairy
              farm to one of Solapur&apos;s largest sugar factories.
            </p>
            <p>
              But his real identity was investing in people. I inherited his values: humility in
              success, grit in struggle, and the belief that leadership means service.
            </p>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className="overflow-hidden rounded-3xl shadow-lift ring-1 ring-ink/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/about.jpg"
              alt="Rohan Deshmukh — Youth Icon of Maharashtra"
              className="aspect-[16/10] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   JOURNEY TIMELINE — Politian "A journey of leadership"
   (used on /initiative)
   ============================================================ */
const MILESTONES = [
  {
    year: '1990s',
    title: 'The Lokmangal beginning',
    desc: 'Subhash Deshmukh builds from odd jobs to a cooperative movement — proving enterprise can uplift a whole region.',
    img: '/images/work.jpg',
  },
  {
    year: '2010s',
    title: 'Service at scale',
    desc: 'Foundation work spreads across water, education, healthcare and 3,000+ community marriages.',
    img: '/images/mass-marriage.jpg',
  },
  {
    year: '2020s',
    title: 'The manifesto',
    desc: 'Rohan writes The New India Manifesto — a call to incubate a hundred thousand entrepreneurs.',
    img: '/images/community.jpg',
  },
  {
    year: 'Now',
    title: 'A nation waiting to be incubated',
    desc: 'The pledge becomes a programme: mentorship, network and a revolving, accountability-first model.',
    img: '/images/rally.jpg',
  },
]

export function JourneyTimeline() {
  return (
    <section className="border-b border-line bg-surface-2">
      <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>
            <span className="mx-auto">The journey</span>
          </Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem]">
            A journey of leadership &amp; progress
          </h2>
        </div>

        <div className="relative mt-14 pl-8 sm:pl-0">
          {/* spine */}
          <span
            aria-hidden="true"
            className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-accent/25 sm:left-1/2 sm:-translate-x-1/2"
          />
          <div className="space-y-10">
            {MILESTONES.map((m, i) => (
              <div
                key={m.year}
                className={`relative sm:grid sm:grid-cols-2 sm:gap-10 ${
                  i % 2 === 1 ? 'sm:[&>*:first-child]:order-2' : ''
                }`}
              >
                {/* dot */}
                <span
                  aria-hidden="true"
                  className="absolute -left-[27px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent ring-4 ring-surface-2 sm:left-1/2 sm:-translate-x-1/2"
                />
                <div className={i % 2 === 1 ? 'sm:text-left' : 'sm:text-right'}>
                  <p className="font-display text-4xl font-bold text-accent/30">{m.year}</p>
                  <h3 className="mt-1 text-lg font-semibold text-ink">{m.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{m.desc}</p>
                </div>
                <div className="mt-4 sm:mt-0">
                  <div className="overflow-hidden rounded-2xl shadow-card ring-1 ring-ink/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={m.img}
                      alt={m.title}
                      loading="lazy"
                      className="aspect-[16/10] w-full object-cover"
                    />
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
   VISION BAND — dark quote + stats
   ============================================================ */
export function VisionBand() {
  return (
    <section className="relative overflow-hidden bg-night text-canvas">
      <div className="bg-night-aura">
        <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 lg:py-28">
          <Quote className="relative mx-auto h-9 w-9 text-gold" aria-hidden="true" />
          <p className="relative mt-6 font-serif text-2xl font-medium leading-snug tracking-tight text-balance sm:text-3xl lg:text-[2.5rem]">
            &ldquo;New India is not a hashtag. It is not a slogan. It is the foundation of tomorrow —
            new thoughts, new vision, and the drumbeat of a new revolution rising from our rural
            heartland.&rdquo;
          </p>
          <p className="relative mt-8 text-sm uppercase tracking-[0.22em] text-gold">
            — Rohan Subhash Deshmukh
          </p>

          <div className="relative mt-16 grid gap-8 border-t border-canvas/10 pt-12 sm:grid-cols-3">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="font-display text-4xl font-bold text-canvas lg:text-5xl">{s.value}</p>
                <p className="mt-2 text-sm text-canvas/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   WORK GRID — real photos of the movement
   ============================================================ */
export function WorkGrid() {
  // Duplicate the list so the marquee loops seamlessly (translateX -50%).
  const track = [...WORK, ...WORK]
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-6xl px-5 pt-16 sm:px-8 lg:pt-24">
        <div className="max-w-2xl">
          <Eyebrow>Work on the ground</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem]">
            Movements, not institutions
          </h2>
          <p className="mt-3 text-muted">
            The manifesto isn&apos;t theory. It grows out of decades of real work across Maharashtra —
            each one not just an institution, but a movement.
          </p>
        </div>
      </div>

      {/* Horizontal auto-scrolling carousel (pauses on hover) */}
      <div className="group relative mt-12 overflow-hidden pb-16 lg:pb-24">
        <div className="flex w-max gap-5 pl-5 animate-marquee group-hover:[animation-play-state:paused] sm:pl-8">
          {track.map((w, i) => (
            <article
              key={`${w.title}-${i}`}
              className="w-[280px] shrink-0 overflow-hidden rounded-3xl border border-line bg-surface shadow-card sm:w-[320px]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={w.img}
                  alt={w.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-linear-to-t from-night/55 via-transparent to-transparent opacity-70"
                />
              </div>
              <div className="p-5">
                <h3 className="text-base font-semibold text-ink">{w.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{w.desc}</p>
              </div>
            </article>
          ))}
        </div>

        {/* edge fades */}
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
   AUTHOR VIDEO — Bookland editorial "why he wrote this book"
   (dummy: poster + play button)
   ============================================================ */
export function AuthorVideo() {
  return (
    <section className="border-b border-line bg-surface-2">
      <div className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-8 lg:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">In his words</p>
        <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-ink sm:text-[2.6rem]">
          Rohan talks about why he wrote this book
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          A short conversation on what the manifesto is really about — and why it&apos;s a call to
          action, not just another book on the shelf.
        </p>

        <div className="group relative mx-auto mt-10 max-w-3xl overflow-hidden rounded-3xl shadow-lift ring-1 ring-ink/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/community.jpg"
            alt="Rohan Deshmukh speaking"
            className="aspect-video w-full object-cover"
          />
          <span aria-hidden="true" className="absolute inset-0 bg-night/35" />
          <button
            type="button"
            aria-label="Play video (coming soon)"
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 text-accent shadow-lift transition-transform duration-300 group-hover:scale-110">
              <Play className="h-8 w-8 translate-x-0.5 fill-current" aria-hidden="true" />
            </span>
          </button>
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-night/70 px-3 py-1 text-xs text-white/80">
            Video coming soon
          </span>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   CONTACT — Politian dark contact block (used on /rohan)
   ============================================================ */
const CONTACTS = [
  { icon: Phone, label: 'Call us', value: '+91 82087 37624', href: 'tel:+918208737624' },
  { icon: MessageCircle, label: 'WhatsApp', value: '+91 82087 37624', href: 'https://wa.me/918208737624' },
  { icon: Mail, label: 'Email', value: 'support@youinsports.ai', href: 'mailto:support@youinsports.ai' },
  { icon: MapPin, label: 'Office', value: 'Solapur, Maharashtra, India', href: null },
]

export function ContactSection() {
  return (
    <section className="relative overflow-hidden bg-night text-canvas">
      <div className="bg-night-aura">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <div>
            <Eyebrow tone="light">Get in touch</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-[2.5rem]">
              Let&apos;s build a New India together
            </h2>
            <p className="mt-3 max-w-md text-canvas/70">
              Reach out to join the movement, invite Rohan to speak, or learn how to take part in the
              incubation programme.
            </p>

            <dl className="mt-8 space-y-4">
              {CONTACTS.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-gold">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-canvas/50">
                      {label}
                    </dt>
                    <dd className="text-sm font-medium text-canvas">
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith('http') ? '_blank' : undefined}
                          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="transition-colors hover:text-accent-ring"
                        >
                          {value}
                        </a>
                      ) : (
                        value
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative overflow-hidden rounded-3xl shadow-lift ring-1 ring-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portrait.jpg"
              alt="Rohan Deshmukh"
              className="aspect-[4/5] w-full object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   INVITATION CTA — apply funnel
   ============================================================ */
const INVITE = [
  { icon: Sprout, text: 'You have a business idea — in farming, dairy, handicraft, retail, services or tech.' },
  { icon: HeartHandshake, text: 'You want to solve a real problem for your community.' },
  { icon: Users, text: 'You are ready to build — and could use mentorship, network and revolving support.' },
]

export function InvitationCTA() {
  return (
    <section className="border-b border-line bg-surface-2">
      <div className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-8 lg:py-24">
        <Eyebrow>
          <span className="mx-auto">The invitation</span>
        </Eyebrow>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink text-balance sm:text-[2.5rem]">
          Are you building something in your town or village?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          Share your story in about a minute. We connect founders with mentors and vetted investors,
          and run a transparent, criteria-based, revolving support programme.
        </p>

        <div className="mx-auto mt-10 grid max-w-2xl gap-3 text-left">
          {INVITE.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-start gap-3.5 rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-accent/30"
            >
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <p className="text-sm leading-relaxed text-ink">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <PillLink href="/apply/founder" variant="accent">
            Start your application
          </PillLink>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   JOIN BAND — footer CTA using the book-cover artwork
   (rendered globally above the footer)
   ============================================================ */
export function JoinBand() {
  return (
    <section className="relative overflow-hidden bg-night text-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/book-cover.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-[center_30%] opacity-30"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r from-night via-night/85 to-night/55"
      />
      <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 lg:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
          Political agenda
        </p>
        <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight text-balance sm:text-5xl">
          Join the movement today for progress
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/70">
          Add your name to a self-reliant New India — read the argument, take the pledge, and act.
        </p>
        <div className="mt-9 flex justify-center">
          <PillLink href="/pledge" variant="light">
            Join the Campaign
          </PillLink>
        </div>
      </div>
    </section>
  )
}
