# Easy Lux Transfer

Clean React + TypeScript implementation of the local Figma Make chauffeur website.

## Stack

- React 19
- TypeScript
- Tailwind CSS 4
- Vite

## Structure

- `src/pages/` — the six website pages
- `src/components/` — shared layout and booking components
- `src/config/` — shared navigation configuration
- `src/types/` — shared TypeScript types
- `src/index.css` — design tokens, typography, Tailwind theme, and global styles
- `public/images/brand/` — active Easy Lux identity files
- `public/images/home/` — Home images grouped by section
- `public/images/services/` — Services images grouped by section
- `public/images/tours/` — Tours page images
- `public/images/shared/` — destination images reused across pages

## Commands

```bash
npm run dev
npm run build
```

## Booking delivery

The current forms intentionally use local confirmation states. Gmail delivery can be connected later through a small protected server endpoint without changing the visual interface.
