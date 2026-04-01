# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Larkbase Club** — A marketplace connecting enterprises with 飞书多维表格 (Lark/Bitable) experts. MVP focuses on an expert certification system and a smart matching engine.

- **Package manager**: pnpm (do NOT use npm/yarn)
- **Framework**: Next.js 16.2.2 with App Router
- **Styling**: Tailwind CSS v4 (uses `@import "tailwindcss"` syntax — no separate `tailwind.config.ts`)
- **Language**: TypeScript (strict mode)
- **Path alias**: `@/*` maps to project root

## Design System

The design system from `product-design-docs/stitch/larkbase_nexus/DESIGN.md` should be applied. Key values:

| Variable | Value | Usage |
|----------|-------|-------|
| `primary` | `#005da7` | Main brand color |
| `primary-container` | `#2976c7` | Primary container |
| `surface` | `#f7f9fb` | Page background |
| `surface-container-low` | `#f2f4f6` | Section background |
| `surface-container-lowest` | `#ffffff` | Card background |
| `surface-container-high` | `#e6e8ea` | Highlighted section |
| `on-surface` | `#191c1e` | Primary text |
| `on-surface-variant` | `#414751` | Secondary text |
| `tertiary` | `#7f5300` | Gold/expert accent |
| `outline-variant` | `#c1c7d3` | Dividers |

**Visual principles**: Tonal Surface system (no 1px borders — use background color shifts), grayscale-to-color avatar hover on Expert Cards, Bento Grid layouts, glassmorphism header with `backdrop-blur`, Inter + Noto Sans SC fonts.

## MVP Pages (5 total)

Implement these in `app/` directory following Next.js App Router conventions:

| Route | Page | Status |
|-------|------|--------|
| `/` | Homepage | Not started |
| `/experts` | Expert list | Not started |
| `/experts/[id]` | Expert detail | Not started |
| `/templates` | Template list | Not started |
| `/requests/new` | Submit request (3-step form) | Not started |

## Component Architecture

Components are organized by feature, not type. Suggested structure:

```
app/
  components/
    features/        # Page-specific components (expert-card.tsx, template-list.tsx, etc.)
    layouts/         # Shared layout components (header.tsx, footer.tsx)
    ui/              # Primitive UI components (button.tsx, badge.tsx, input.tsx)
```

Per PRD Section 5, key components to implement:
- **Expert Card**: grayscale avatar → color on hover, 12px rounded corners, certification badge
- **Template Card**: `aspect-[16/10]`, `hover:scale-110`, `shadow-xl`
- **Certification Badge**: blue/gold/purple per certification tier (no badge for junior)
- **Step Indicator**: circular numbered steps with connecting lines for the request form

## Important Conventions

- **Tailwind v4**: Colors are defined via CSS custom properties in `app/globals.css` under the `@theme` directive — not in a JS config file.
- **Next.js App Router**: All pages are Server Components by default. Add `'use client'` only when using browser APIs or React hooks.
- **TypeScript strict mode**: All code must type properly — no `any` escapes.
- **No `src/` directory**: Place all code directly under `app/` and `components/`.

## Development Commands

```bash
pnpm dev      # Start dev server at localhost:3000
pnpm build    # Production build
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

## PRD Reference

The full product specification is in `product-design-docs/larkbase-club-prd.md`. Key reminders:
- MVP has **no authentication**, **no payment**, **no evaluation system**
- Expert ratings in MVP are hardcoded placeholders (4.8)
- Matching algorithm: 40% skill + 30% price + 30% project count (≥70 threshold)
- Certification review is manual/admin-side — not a self-service flow in MVP
