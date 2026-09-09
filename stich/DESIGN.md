---
name: Haute Couture Bridal & Beauty Portfolio
colors:
  surface: '#fcf9f3'
  surface-dim: '#dcdad4'
  surface-bright: '#fcf9f3'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3ed'
  surface-container: '#f0eee8'
  surface-container-high: '#ebe8e2'
  surface-container-highest: '#e5e2dc'
  on-surface: '#1c1c18'
  on-surface-variant: '#4e4541'
  inverse-surface: '#31312d'
  inverse-on-surface: '#f3f0ea'
  outline: '#7f7570'
  outline-variant: '#d1c4be'
  surface-tint: '#655d59'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#201a17'
  on-primary-container: '#8c827d'
  inverse-primary: '#d0c4bf'
  secondary: '#765937'
  on-secondary: '#ffffff'
  secondary-container: '#fed6ac'
  on-secondary-container: '#795b3a'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#231915'
  on-tertiary-container: '#90817b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ede0db'
  primary-fixed-dim: '#d0c4bf'
  on-primary-fixed: '#201a17'
  on-primary-fixed-variant: '#4d4541'
  secondary-fixed: '#ffddb9'
  secondary-fixed-dim: '#e6c097'
  on-secondary-fixed: '#2b1700'
  on-secondary-fixed-variant: '#5c4222'
  tertiary-fixed: '#f2dfd7'
  tertiary-fixed-dim: '#d5c3bc'
  on-tertiary-fixed: '#231915'
  on-tertiary-fixed-variant: '#51443f'
  background: '#fcf9f3'
  on-background: '#1c1c18'
  surface-variant: '#e5e2dc'
typography:
  display-xl:
    fontFamily: Playfair Display
    fontSize: 72px
    fontWeight: '400'
    lineHeight: 80px
    letterSpacing: -0.02em
  display-xl-mobile:
    fontFamily: Playfair Display
    fontSize: 44px
    fontWeight: '400'
    lineHeight: 50px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 56px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 38px
    letterSpacing: 0em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  title-editorial:
    fontFamily: Playfair Display
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '300'
    lineHeight: 30px
    letterSpacing: 0.01em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: 0.01em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.15em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.04em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  space-xxs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
  space-2xl: 4rem
  space-3xl: 6.5rem
  space-4xl: 10rem
  gutter-desktop: 2rem
  gutter-mobile: 1rem
  margin-desktop: 5rem
  margin-mobile: 1.5rem
---

## Brand & Style
This design system curates an atmosphere of bespoke luxury, intimate romance, and haute couture editorial artistry. Designed for discerning brides, private VIP clients, and high-fashion editorial productions, the UI prioritizes sensory richness, quiet poise, and timeless sophistication over utilitarian urgency.

The aesthetic philosophy draws heavily from **Warm Editorial Minimalism** accented with **Soft Glassmorphism** and tactile depth. The visual experience echoes premium printed monographs (Vogue, Harper's Bazaar, Kinfolk): generous negative space, deliberate typographic tension, museum-grade framing of imagery, and subdued metallic reflections. Every interaction feels leisurely, intentional, and velvet-smooth, evoking the calm reassurance of a private bridal suite in a Parisian atelier.

## Colors
The color palette reflects natural cosmetic pigments, warm alabaster skin tones, and rich espresso undertones. 

- **Primary (`#1E1815` - Deep Velvet Espresso):** Anchors headlines, primary buttons, and critical framing. It replaces clinical pure black with an ultra-deep, roasted coffee tone that feels grounded, warm, and cinematic.
- **Secondary (`#D4AF87` - Soft Champagne Gold):** Applied selectively to delicate accents, active navigation states, micro-lines, and focused interactive states. Avoid aggressive yellow golds; this shade possesses a muted satin sheen.
- **Tertiary (`#E8D5CE` - Blush Ivory / Rose Alabaster):** Used for subtle card fills, secondary pill tags, hover overlays, and soft tonal backgrounds.
- **Neutral Base (`#F9F6F0` - Silk Canvas / Warm Beige):** The primary canvas background. Provides an organic paper-like warmth that prevents the stark chill of raw `#FFFFFF`.

### Surface Application
- **Surface Priming:** Default page background is `#F9F6F0`.
- **Card & Elevated Surfaces:** `#FFFFFF` rendered at 85% opacity with `backdrop-filter: blur(16px)` over textured editorial imagery, or solid `#FFFFFF` with whisper-light `#1E1815` borders (6% alpha).
- **Dark Inversions (Night Mode / Masterclass / Editorial Spreads):** Background transitions to `#161210`, with text in `#F9F6F0` and borders in `#D4AF87` at 20% alpha.

## Typography
Typographic rhythm relies on high-contrast pairings: the classical, high-contrast strokes of **Playfair Display** paired with the warm, geometric legibility of **Plus Jakarta Sans**.

- **Editorial Serifs (`Playfair Display`):** Hero statements, portfolio piece titles, and testimonial quotations. Use italicized styles selectively for emotional emphasis, French beauty phrasing, or artist notes.
- **Modern Monoline Sans (`Plus Jakarta Sans`):** Curated for descriptions, scheduling inputs, pricing specifications, and client logistics. Keep body copy light (`300` to `400` weight) with generous line-height to maintain an unhurried, spacious cadence.
- **Micro-Labels & Metadata (`label-caps`):** Sub-headers, image metadata, collection names, and category filters must always use small uppercase tracking (`letter-spacing: 0.15em`) to balance the expressive nature of the primary serif.

## Layout & Spacing
The layout adheres to an asymmetrical, magazine-style 12-column grid. Rather than dense dashboard alignment, this system utilizes breathing space as a luxury signal.

- **Breakpoints:**
  - **Mobile:** 0 – 767px (4-column layout, 1rem gutters, 1.5rem outer margins)
  - **Tablet:** 768px – 1023px (8-column layout, 1.5rem gutters, 2.5rem outer margins)
  - **Desktop:** 1024px – 1440px (12-column layout, 2rem gutters, 5rem outer margins)
  - **Ultra-Wide:** 1441px+ (Max container width fixed at 1360px centered)

- **Editorial Rhythm & Overlaps:**
  - Standard section margins use `space-3xl` (6.5rem) on desktop and `space-2xl` (4rem) on mobile.
  - Image galleries employ offset masonry grids where portrait shots (3:4 ratio) sit adjacent to cinematic widescreen landscapes (16:9 ratio) with staggered vertical translations (`translate-y-8` to `translate-y-16`) to break static rigidity.
  - Text cards occasionally overlap image bounds by `-2rem` to replicate print lookbooks.

## Elevation & Depth
Elevation is rendered through organic dispersion, tonal depth, and delicate translucent diffusion rather than conventional drop shadows.

- **Atmospheric Shadows:** Deep, ultra-diffused elevation using espresso-tinted shadows:
  - *Floating Cards:* `0 20px 40px -15px rgba(30, 24, 21, 0.05), 0 0 1px rgba(30, 24, 21, 0.08)`
  - *Hover States:* `0 30px 60px -20px rgba(30, 24, 21, 0.12), 0 0 1px rgba(30, 24, 21, 0.12)`
- **Glassmorphic Floating Audio Widget:** Floating ambience audio player and sticky inquiry bars use:
  - Background: `rgba(249, 246, 240, 0.72)` (or `rgba(30, 24, 21, 0.8)` in dark viewports)
  - Backdrop Blur: `blur(20px) saturate(160%)`
  - Border: `1px solid rgba(212, 175, 135, 0.35)`
  - Shadow: `0 16px 36px rgba(30, 24, 21, 0.08)`
- **Ghost Outlines:** Structural card elements use low-contrast borders (`1px solid rgba(30, 24, 21, 0.07)`) to define boundaries without interrupting photographic flow.

## Shapes
The structural framework employs a disciplined **Soft** roundedness (`roundedness: 1`, base 0.25rem / 4px).

- **Editorial Edge Discipline:** Large imagery, bespoke cards, and full-bleed lookbook sections remain predominantly crisp (`4px` to `8px` maximum radius) to preserve the sharp lines of couture print editorial.
- **Pill Exceptions:** Interactive tags, service categories, and audio control pills utilize full pill shaping (`rounded-full`) to create tactile, touchable contrast against the rectangular photograph frames.
- **Circular Elements:** Floating circular action buttons (play/pause audio, scroll indicators, carousel next/prev triggers) maintain a pure 1:1 circular aspect ratio (`rounded-full`).

## Components

### 1. Buttons
- **Primary Button (High Drama):** Solid Deep Velvet Espresso (`#1E1815`) fill, Warm Beige (`#F9F6F0`) typography, 4px border radius. Padding: `14px 32px`. Text styled with `label-caps`. Hover effect: smooth lift (`translate-y-[-1px]`) and background transition to `#322722`.
- **Secondary Button (Champagne Outline):** Transparent fill, 1px solid `#D4AF87`, `#1E1815` typography. On hover, fills with `#E8D5CE` at 35% opacity with border tightening to `#1E1815`.
- **Text Action:** Playfair italic headline or sans-serif caps with an animated bottom hairline that expands from 0% to 100% width on hover.

### 2. Floating Glassmorphic Audio Player Widget
- A persistent ambient soundscape controller (playing curated bridal prep audio/classical suites).
- Floating in the bottom-left or bottom-right corner (`bottom: 2rem`, `inset-inline-end: 2rem`).
- Height: `44px`, Pill shape (`rounded-full`), padded `6px 18px 6px 8px`.
- Features a spinning vinyl/monogram icon, minimal gold sound equalizer bars (`#D4AF87`) that animate with audio frequency, and a play/pause toggle. Glassmorphic surface treatment.

### 3. Luxury Gallery Grid & Lookbook Cards
- **Proportions:** 4:5 (editorial portrait) and 16:10 (bridal party group narrative).
- Images utilize soft zoom on container hover (`scale(1.03)`, `transition: transform 700ms cubic-bezier(0.16, 1, 0.3, 1)`).
- Optional metadata overlay: Warm gradient scrim (`linear-gradient(to top, rgba(30, 24, 21, 0.6) 0%, transparent 60%)`) revealing collection date, bride name, and glam team tags in `label-caps`.

### 4. Input Fields & Booking Consultation Forms
- Understated architectural lines over boxed inputs. Single bottom hairline border in `rgba(30, 24, 21, 0.2)`.
- Background: transparent or `#FFFFFF` at 40% opacity.
- Focus State: Bottom border darkens to `#1E1815` (or `#D4AF87`), with zero harsh outlines. Labels transition from `body-md` inside input to `label-caps` elevated above input on focus.

### 5. Checkboxes, Radio Buttons & Date Pickers
- **Radio Buttons / Add-ons:** Subtle rounded square or circle with `#D4AF87` selection ring. Selected state features a solid `#1E1815` inner dot.
- **Bridal Date Selector:** Calendar UI presented in editorial format with serif month titles and selected dates marked with a champagne gold filled circle.

### 6. Instagram Showcase & Social Proof
- 5-column edge-to-edge reel band displaying recent brides and behind-the-scenes artistry.
- Hover overlay exhibits an opaque silk beige veil (`#F9F6F0` at 85% opacity) showing the Instagram icon, like count, and direct link to the post.