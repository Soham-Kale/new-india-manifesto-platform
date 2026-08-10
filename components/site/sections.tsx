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

/** Small reusable eyebrow with a gold rule. */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
      <span className="h-px w-7 gold-rule" aria-hidden="true" />
      {children}
    </p>
  )
}

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-aura">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 lg:py-24">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-surface/70 px-3.5 py-1.5 text-xs font-medium text-accent shadow-sm backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            The action layer of the book
          </span>

          <h1 className="mt-6 font-serif text-[2.6rem] font-medium leading-[1.02] tracking-tight text-ink sm:text-6xl">
            Read the argument.
            <br />
            Take the pledge.
            <br />
            <span className="relative text-accent">
              Then act.
              <svg
                className="absolute -bottom-2 left-0 w-[7.5ch] text-gold"
                viewBox="0 0 200 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 9C40 3 160 3 198 7"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            <em className="text-ink">The New India Manifesto</em> ends with a pledge — to incubate one
            enterprise and mentor others. This is where you act on it. Whether you&apos;re building in
            your village, or ready to back those who are, there&apos;s a lane for you.
          </p>

          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Link
              href="/apply/founder"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-base font-medium text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-glow sm:w-auto"
            >
              Apply to be incubated
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent"
            >
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              Read the manifesto
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-6 text-sm text-muted">
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

        {/* Portrait */}
        <div className="relative mx-auto w-full max-w-sm animate-scale-in lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute -right-8 -top-8 h-44 w-44 rounded-full bg-accent/15 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-gold/15 blur-3xl"
          />
          <div className="relative rounded-[1.75rem] bg-linear-to-br from-accent/25 via-transparent to-gold/25 p-[1.5px] shadow-lift">
            <div className="overflow-hidden rounded-[1.65rem] bg-accent-soft">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portrait.jpg"
                alt="Rohan Subhash Deshmukh"
                className="aspect-[4/5] w-full object-cover object-top"
              />
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/10 bg-night/85 px-4 py-3 text-canvas backdrop-blur-md">
                <p className="font-serif text-lg font-medium leading-tight">Rohan Subhash Deshmukh</p>
                <p className="text-xs text-canvas/60">
                  Author, <span className="italic">The New India Manifesto</span>
                </p>
              </div>
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
    <section className="border-b border-line bg-surface-2">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="max-w-2xl">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight text-ink sm:text-[2.5rem]">
            Read → Pledge → Act
          </h2>
          <p className="mt-3 text-muted">
            This isn&apos;t a stack of forms. It&apos;s one funnel — a movement first, a programme
            second. Start wherever you are.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {FUNNEL.map(({ icon: Icon, step, title, desc, href, cta }, i) => (
            <Link
              key={step}
              href={href}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/30 hover:shadow-lift"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-linear-to-r from-accent to-gold transition-transform duration-300 group-hover:scale-x-100"
              />
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="font-serif text-3xl text-line-strong transition-colors group-hover:text-accent/30">
                  0{i + 1}
                </span>
              </div>
              <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
                {step}
              </p>
              <h3 className="mt-1.5 text-lg font-medium text-ink">{title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{desc}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
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

export function AboutStory() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div className="order-2 lg:order-1">
          <Eyebrow>The story</Eyebrow>
          <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight text-ink sm:text-[2.5rem]">
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
              My father&apos;s story still inspires me — a school dropout who started with odd jobs in
              a poultry factory and became a first-generation entrepreneur. From a grocery shop and
              dairy farm to a tyre business, construction and one of Solapur&apos;s largest private
              sugar factories, he built it all the hard way.
            </p>
            <p>
              But his real identity was investing in people — water, education, healthcare and rural
              initiatives. I inherited his values: humility in success, grit in struggle, and the
              belief that leadership means service.
            </p>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className="relative rounded-[1.5rem] bg-linear-to-br from-accent/20 to-gold/20 p-[1.5px] shadow-card">
            <div className="overflow-hidden rounded-[1.4rem]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/about.jpg"
                alt="Rohan Deshmukh with the community"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

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
          <p className="relative mt-8 text-sm uppercase tracking-[0.2em] text-canvas/50">
            — Rohan Subhash Deshmukh
          </p>

          <div className="relative mt-16 grid gap-8 border-t border-canvas/10 pt-12 sm:grid-cols-3">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="font-serif text-4xl font-medium text-gold lg:text-5xl">{s.value}</p>
                <p className="mt-2 text-sm text-canvas/60">{s.label}</p>
              </div>
            ))}
          </div>
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
          <Eyebrow>Work on the ground</Eyebrow>
          <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight text-ink sm:text-[2.5rem]">
            Movements, not institutions
          </h2>
          <p className="mt-3 text-muted">
            The organisations I lead embody service, empowerment and transformation. Each one is not
            just an institution — it is a movement.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WORK.map((w) => (
            <article
              key={w.title}
              className="group overflow-hidden rounded-2xl border border-line bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={w.img}
                  alt={w.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.06]"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-linear-to-t from-night/45 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
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
        <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight text-ink text-balance sm:text-[2.5rem]">
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

        <Link
          href="/apply/founder"
          className="group mt-10 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-base font-medium text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-glow"
        >
          Start your application
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
