# Rotaract Club NIET — Website

A cinematic, dark-premium website for Rotaract Club NIET, built with Next.js 15,
TypeScript, Tailwind CSS v4, Framer Motion, GSAP, Lenis, and Three.js (hero only).

This was built in a sandboxed environment without live browser preview, so
**run it locally to see it** — the steps below take about two minutes.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Note on fonts:** `next/font/google` fetches Space Grotesk and Inter from
> Google Fonts at build time. This requires outbound internet access on
> whatever machine runs `npm run dev` / `npm run build`. If you're behind a
> restrictive firewall, this step will fail — see "Troubleshooting" below.

## Project structure

```
src/
  app/
    layout.tsx        — fonts, metadata, nav/footer, smooth scroll
    page.tsx           — assembles all 13 sections in order
    globals.css        — design tokens (colors, type, utility classes)
  components/
    layout/             — Navbar, Footer, SmoothScrollProvider (Lenis)
    sections/            — one file per website section (Hero, About, Impact, ...)
    ui/                  — MagneticButton, SectionHeading, Counter
  data/
    content.ts           — ALL placeholder copy, stats, board members, projects,
                            events, gallery, testimonials, partners. Swap this
                            for live Supabase data whenever you're ready.
  lib/
    supabase.ts           — Supabase client (returns null gracefully if env
                            vars aren't set, so the site never crashes)
  hooks/
    useMagnetic.ts         — the magnetic-button hover effect
supabase/
  schema.sql              — every CMS table (members, board_members, events,
                            projects, gallery, announcements, testimonials,
                            join_requests) with row-level-security policies
scripts/
  gen_placeholders.py      — regenerates the on-brand placeholder photos in
                            /public/images if you add new image slots
```

## Replacing placeholder content

Everything in the brief that needed real photos/copy currently uses
generated navy-and-gold placeholder images and realistic-but-fictional
copy, so the site is fully navigable today. To go live:

1. Open `src/data/content.ts` and replace names, dates, quotes, and stats.
2. Drop real photos into `public/images/...` using the **same filenames**
   referenced in `content.ts` (or update the paths).
3. Replace `public/images/partners/*.svg` with real partner logos.

## Connecting Supabase (CMS + Join form)

The "Join Rotaract" form (`src/components/sections/JoinCTA.tsx`) is wired
to insert into Supabase already — it just needs credentials:

1. Create a free project at [supabase.com](https://supabase.com).
2. In the SQL Editor, run `supabase/schema.sql` — this creates all 8 tables
   (`members`, `board_members`, `events`, `projects`, `gallery`,
   `announcements`, `testimonials`, `join_requests`) with sensible RLS
   policies (public can read published content and submit join requests;
   everything else is admin-only via the Supabase dashboard).
3. Copy `.env.example` to `.env.local` and fill in your project URL and
   anon key from **Project Settings → API**.
4. Restart `npm run dev`. The Join form will now insert real rows into
   `join_requests`, visible in the Supabase Table Editor.
5. (Optional, more work) Swap the static arrays in `content.ts` for
   `supabase.from(...).select()` calls in each section if you want board
   members, events, projects, gallery, and testimonials to be editable
   from the Supabase dashboard without redeploying.

Until Supabase is configured, the Join form shows a friendly
"not connected yet" message instead of failing silently.

## Deploying

The fastest path matching the brief's stack is Vercel:

```bash
npm i -g vercel
vercel
```

Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` as
environment variables in the Vercel project settings (same values as your
`.env.local`).

## Design tokens

| Token | Value |
|---|---|
| Background | `#050816` |
| Card | `#0D1430` |
| Primary (navy) | `#000080` |
| Accent (gold) | `#FFD700` |
| Text | `#FFFFFF` |
| Secondary text | `#AEB8D0` |
| Display font | Space Grotesk |
| Body font | Inter |

All tokens live in `src/app/globals.css` as CSS custom properties — change
them there and the whole site updates.

## Signature visual

The hero background (`src/components/sections/HeroScene.tsx`) renders a
vanilla Three.js particle field that assembles into a gear silhouette — a
quiet nod to Rotary's own "wheel of service" — rotating slowly with subtle
mouse parallax. It's intentionally the one "loud" moment in the design;
everything else stays quiet and disciplined per the brief.

## Accessibility & performance notes

- All interactive elements have visible keyboard focus states.
- `prefers-reduced-motion` is respected in the hero scene, Lenis smooth
  scroll, magnetic buttons, and counters.
- Images use `next/image` for automatic optimization and lazy loading.
- Semantic HTML landmarks (`header`, `main`, `footer`, `section`) throughout.

## Troubleshooting

**Build fails with "Failed to fetch font":** your network is blocking
`fonts.googleapis.com`. Either allow that domain, or replace the
`next/font/google` imports in `src/app/layout.tsx` with self-hosted font
files via `next/font/local`.

**Images look like navy/gold placeholder cards:** that's expected until
you replace the files in `public/images/` with real photos — see
"Replacing placeholder content" above.
