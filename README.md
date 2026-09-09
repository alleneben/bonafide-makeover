# BONAFIDE MAKEOVER — Static Next.js Site

A fast, statically exported single-page website for BONAFIDE MAKEOVER, built from the `stitch_luxe_beauty_studio` design.

## Stack

- **Next.js 15** with App Router
- **Static export** (`output: 'export'`) — pre-rendered HTML for instant loads
- **Tailwind CSS v4** with design tokens from the Stitch design system
- **next/font** for optimized Playfair Display & Manrope fonts

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production Build

```bash
npm run build
```

Static files are output to the `out/` directory. Deploy to any static host (Vercel, Netlify, S3, GitHub Pages, etc.).

## Sections

- Hero
- Portfolio
- Services
- Reviews
- Booking
- Footer
