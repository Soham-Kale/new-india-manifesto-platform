import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  Clock,
  MapPin,
  Quote,
  Sprout,
  HeartHandshake,
  Users,
  HandHeart,
  Handshake,
} from 'lucide-react'

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
    title: 'Community Kitchen',
    desc: 'Meals and dignity for those who need it most, built on the principle of honour and opportunity.',
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
    title: 'Shri Ram Pratishthan',
    desc: 'Service and empowerment rooted in the soil of Solapur — where this journey began.',
  },
]

const STATS = [
  { value: '3,000+', label: 'Community marriages organised' },
  { value: '1,00,000', label: 'Entrepreneurs we aim to incubate' },
  { value: '4', label: 'Institutions led on the ground' },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:py-20">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            The action layer of the book
          </span>
          <h1 className="mt-5 font-serif text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
            Read the argument.
            <br />
            Take the pledge.
            <br />
            <span className="text-accent">Then act.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            <em>The New India Manifesto</em> ends with a pledge — to incubate one enterprise
            and mentor others. This is where you act on it. Whether you&apos;re building in your
            village, or ready to back those who are, there&apos;s a lane for you.
          </p>

          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Link
              href="/apply/founder"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-6 py-3.5 text-base font-medium text-canvas shadow-sm transition-all hover:-translate-y-0.5 hover:bg-accent hover:shadow-lift sm:w-auto"
            >
              Apply to be incubated
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/book"
              className="flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-accent"
            >
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              Read the manifesto
            </Link>
          </div>

          <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 border-t border-line pt-6 text-sm text-muted">
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
              Solapur, Maharashtra
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-accent" aria-hidden="true" />
              Applications take ~1 minute
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute -right-6 -top-6 h-40 w-40 rounded-full bg-accent/10 blur-2xl"
          />
          <div className="relative overflow-hidden rounded-3xl border border-line bg-accent-soft shadow-lift">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portrait.jpg"
              alt="Rohan Subhash Deshmukh"
              className="aspect-[4/5] w-full object-cover object-top"
            />
            <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-night/90 px-4 py-3 text-canvas backdrop-blur">
              <p className="font-serif text-lg font-medium leading-tight">
                Rohan Subhash Deshmukh
              </p>
              <p className="text-xs text-canvas/60">
                Author, <span className="italic">The New India Manifesto</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

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
    <section className="border-b border-line bg-surface/60">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            How it works
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Read → Pledge → Act
          </h2>
          <p className="mt-3 text-muted">
            This isn&apos;t a stack of forms. It&apos;s one funnel — a movement first, a
            programme second. Start wherever you are.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {FUNNEL.map(({ icon: Icon, step, title, desc, href, cta }, i) => (
            <div
              key={step}
              className="group flex flex-col rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-canvas">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="font-serif text-2xl text-line">0{i + 1}</span>
              </div>
              <p className="mt-5 text-[11px] font-semibold uppercase tracking-widest text-accent">
                {step}
              </p>
              <h3 className="mt-1 text-lg font-medium text-ink">{title}</h3>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{desc}</p>
              <Link
                href={href}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition hover:gap-2.5"
              >
                {cta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function AboutStory() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-14 lg:py-24">
        <div className="order-2 lg:order-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">The story</p>
          <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            From Solapur to a national vision
          </h2>
          <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-muted">
            <p>
              My journey is tied to the soil of Solapur — a city once known for its textile
              mills, beedi industry and railway junction. Growing up as the son of{' '}
              <strong className="font-medium text-ink">Subhash Bapu Deshmukh</strong>, I learned
              that enterprise and service belong together.
            </p>
            <p>
              My father&apos;s story still inspires me — a school dropout who started with odd
              jobs in a poultry factory and became a first-generation entrepreneur. From a grocery
              shop and dairy farm to a tyre business, construction and one of Solapur&apos;s
              largest private sugar factories, he built it all the hard way.
            </p>
            <p>
              But his real identity was investing in people — water, education, healthcare and
              rural initiatives. I inherited his values: humility in success, grit in struggle,
              and the belief that leadership means service.
            </p>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className="overflow-hidden rounded-3xl border border-line shadow-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/about.jpg"
              alt="Rohan Deshmukh with the community"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export function VisionBand() {
  return (
    <section className="bg-night text-canvas">
      <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 lg:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-10 h-40 w-40 -translate-x-1/2 rounded-full bg-accent/25 blur-3xl"
        />
        <Quote className="relative mx-auto h-8 w-8 text-accent-ring" aria-hidden="true" />
        <p className="relative mt-6 font-serif text-2xl font-medium leading-snug tracking-tight sm:text-3xl lg:text-4xl">
          &ldquo;New India is not a hashtag. It is not a slogan. It is the foundation of tomorrow —
          new thoughts, new vision, and the drumbeat of a new revolution rising from our rural
          heartland.&rdquo;
        </p>
        <p className="relative mt-8 text-sm uppercase tracking-[0.2em] text-canvas/50">
          — Rohan Subhash Deshmukh
        </p>

        <div className="relative mt-14 grid gap-8 border-t border-canvas/10 pt-10 sm:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-serif text-4xl font-medium text-accent-ring">{s.value}</p>
              <p className="mt-2 text-sm text-canvas/60">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function WorkGrid() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Work on the ground
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Movements, not institutions
          </h2>
          <p className="mt-3 text-muted">
            The organisations I lead embody service, empowerment and transformation. Each one is
            not just an institution — it is a movement.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WORK.map((w) => (
            <article
              key={w.title}
              className="group overflow-hidden rounded-2xl border border-line bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
            >
              <div className="aspect-[16/10] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={w.img}
                  alt={w.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="text-base font-semibold text-ink">{w.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{w.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

const INVITE = [
  {
    icon: Sprout,
    text: 'You have a business idea — in farming, dairy, handicraft, retail, services or tech.',
  },
  { icon: HeartHandshake, text: 'You want to solve a real problem for your community.' },
  {
    icon: Users,
    text: 'You are ready to build — and could use mentorship, network and revolving support.',
  },
]

export function InvitationCTA() {
  return (
    <section className="border-b border-line bg-surface/60">
      <div className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-8 lg:py-20">
        <h2 className="font-serif text-3xl font-medium tracking-tight text-ink sm:text-4xl">
          Are you building something in your town or village?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          Share your story in about a minute. We connect founders with mentors and vetted
          investors, and run a transparent, criteria-based, revolving support programme.
        </p>

        <div className="mx-auto mt-8 grid max-w-2xl gap-3 text-left sm:grid-cols-1">
          {INVITE.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-start gap-3 rounded-xl border border-line bg-surface p-4"
            >
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <p className="text-sm leading-relaxed text-ink">{text}</p>
            </div>
          ))}
        </div>

        <Link
          href="/apply/founder"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-ink px-6 py-3.5 text-base font-medium text-canvas shadow-sm transition-all hover:-translate-y-0.5 hover:bg-accent hover:shadow-lift"
        >
          Start your application
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
