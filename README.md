# The New India Manifesto — Platform (Frontend)

The **action layer of the book** by Rohan Subhash Deshmukh — a multi-page platform built around a
**Read → Pledge → Act** funnel. Readers explore the manifesto, take the pledge, and then act via one
of four role lanes (Founder / Mentor / Investor / Expert). An admin control room sees everything; a
role-based permission model decides who sees what.

**This is the frontend-only phase.** There is no real backend, payments, OTP, email, or database.
Everything is simulated with a typed, `localStorage`-backed mock data layer and seeded dummy data, so
the whole MVP surface is clickable and demoable. The mock layer is designed to be swapped for real
API calls with minimal churn.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · lucide-react.

## Install & run

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build && npm start   # production build
```

## Demo mode (no login required)

A floating **Demo** widget (bottom-right) simulates authentication. Switch the active identity between
**Guest / Founder / Mentor / Investor / Expert / Admin** to see role-scoped views without a backend,
and **Reset demo data** to restore the seeded state. There is also a simulated email-OTP screen at
`/login` (any 6-digit code works).

## Routes (spec §2 — MVP surface)

| Route | Page |
|---|---|
| `/` | Home — the Read → Pledge → Act funnel |
| `/book` | The book + simulated Razorpay checkout (physical / eBook) |
| `/rohan` | About Rohan |
| `/initiative` | The programme, the 100,000 goal, the revolving Village Venture Fund model |
| `/pledge` | "Yes, I Am In" supporter capture |
| `/apply/founder` | Multi-step founder application (with dedup) |
| `/apply/mentor` · `/apply/investor` · `/apply/expert` | Role applications (pending approval) |
| `/dashboard` | Applicant view — shows **Received → Under review** only, never internal status |
| `/admin` | Control room: tabs, search, status changes, CSV export (admin-gated) |
| `/login` | Simulated email-OTP sign-in |
| `/privacy` · `/terms` · `/shipping` · `/refund` | Legal (DPDP / Razorpay) |

## Project structure

```
app/
  layout.tsx              # fonts + <Providers> + global <RoleSwitcher>
  (site)/                 # pages with the global header/footer
    layout.tsx, page.tsx (Home), book/, rohan/, initiative/, pledge/,
    dashboard/, privacy/, terms/, shipping/, refund/
  apply/                  # focused application shells (no global chrome)
    founder/, mentor/, investor/, expert/
  admin/                  # admin control room
  login/                  # simulated OTP
components/
  ui/                     # design system: Button, FormInput, FormTextarea,
                          #   SelectField, MultiSelectField, CheckboxConsent, ...
  site/                   # SiteHeader, SiteFooter, sections, BookCheckout, LegalShell, RoleSwitcher
  apply/                  # ApplicationLayout + ApplicationAside, FounderWizard,
                          #   VideoRecorder, VideoUploader, ApplyShell, ApplicationSuccess
  admin/                  # AdminRoom (tabbed control room)
lib/
  types.ts                # full data model (spec §5) as TS types
  options.ts              # enum option lists + label helpers
  seed.ts                 # deterministic dummy data
  store.ts                # localStorage persistence + CSV export  ← the backend seam
  MockDataProvider.tsx    # collections + mutations (create/dedup/status)
  MockAuthProvider.tsx    # simulated current user + role switching
  permissions.ts          # spec §3 permission matrix
  validation.ts           # shared field validators
public/images/            # author + work photos, book cover
```

## Key behaviours

- **Dedup (spec §4):** `addFounderApplication` (in `MockDataProvider`) checks `findApplicationByEmail`
  before insert; a repeat email is blocked and shown the "you've already applied / waitlist" state.
- **Applicant visibility:** the dashboard maps `internalStatus` → **Received / Under review** only via
  `toPublicStatus`; shortlist/match/reject decisions stay internal.
- **Permissions (spec §3):** `lib/permissions.ts` gates the admin room and the permission-aware nav.
- **Consent (spec §9):** three unbundled consents on the founder form; a separate, unticked
  campaign-updates opt-in at book checkout.
- **Positioning guardrail (spec §0):** no "funding"/grant language — support is framed as the book's
  revolving **Village Venture Fund** (₹10k–₹2L micro-equity), mentorship, and vetted-investor
  connections.

## Where the backend plugs in (next phase)

Everything funnels through **`lib/store.ts`** and the two providers:

1. Replace the `localStorage` reads/writes in `store.ts` / `MockDataProvider.tsx` with API calls
   (Next.js Route Handlers → Postgres/Prisma). The `lib/types.ts` model maps 1:1 to the Prisma schema.
2. Replace `MockAuthProvider` with real email-OTP auth (Auth.js / Supabase); keep the same
   `currentUser` / `role` shape so guards keep working.
3. Replace the simulated checkout in `components/site/BookCheckout.tsx` with real Razorpay + webhook
   verification.
4. Enforce `lib/permissions.ts` server-side.

V2 (not in this phase): mentor/investor dashboards, interest → admin-approved match → contact reveal,
pitch-deck uploads, funnel analytics.
```
