
# THEUNOiA — Website

> Independence starts here.

Bharat's student-first freelance ecosystem. Where beautiful thinking meets real opportunity — before graduation, not after.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **Animations**: Framer Motion
- **Fonts**: Space Grotesk (heading) + Manrope (body)
- **Deployment**: Vercel

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout (fonts, metadata, grain)
│   ├── page.tsx            # Landing page
│   └── globals.css         # Global styles
├── components/
│   ├── Nav.tsx             # Fixed navigation
│   ├── DepthRail.tsx       # Scroll-linked depth indicator
│   ├── animation/
│   │   ├── AnimationSlot.tsx   # Swappable animation wrapper
│   │   ├── OceanCanvas.tsx     # Caustic wave background
│   │   ├── ScrollReveal.tsx    # Scroll-triggered reveal
│   │   ├── CountUp.tsx         # Number counter animation
│   │   └── LunaAnimation.tsx   # Animated Luna mascot
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── BehindName.tsx
│   │   ├── OceanTheory.tsx
│   │   ├── Pillars.tsx
│   │   ├── Stats.tsx
│   │   ├── TeamTeaser.tsx
│   │   ├── CTA.tsx
│   │   └── Footer.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Eyebrow.tsx
│       ├── Logo.tsx
│       └── BrandMark.tsx
├── lib/
│   └── constants.ts        # Brand tokens & content
└── public/
    └── assets/luna/         # Luna mascot images
```

## Swapping Animations

Every section contains an `<AnimationSlot>` wrapper. To replace any animation:

```tsx
// Current (Framer Motion)
<AnimationSlot id="hero-luna">
  <LunaAnimation variant="working" />
</AnimationSlot>

// Swap to Lottie
<AnimationSlot id="hero-luna">
  <LottiePlayer src="/animations/luna-hero.json" />
</AnimationSlot>
```

## Swapping Makira Font

When Makira font files are available:

1. Place `.woff2` files in `public/fonts/`
2. Add `@font-face` in `globals.css`
3. Update `--font-head` CSS variable

## Brand Colors

| Token | Hex | Usage |
|---|---|---|
| Navy | `#0A1B37` | Primary background |
| Navy Deep | `#060f22` | Deepest sections |
| Gold | `#CBA96B` | Accents, labels |
| Terracotta | `#C06B3E` | Links, gradient |
| Beige | `#B7AA9A` | Footer, CTA fade |
| Ivory | `#F3EFE6` | Text, light sections |

## Mascot

**Luna** 🦊 — a fox in a navy hoodie with amber eyes and a messenger bag.

---

Built with 🧠 by THEUNOiA


