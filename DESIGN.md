# Design Direction

## Identity
**Executive Slate Split-Screen Profile** — A simple, calm, and trustworthy two-column profile pairing a tinted 40% sticky identity panel on the left with a 60% scrolling career and project canvas on the right.

## Dials
- **ENERGY: 2 (Balanced)** — Clean, business-ready hierarchy with zero decorative gradients, orbs, or "hacker/terminal" tropes.
- **RHYTHM: 2 (Consistent with contrast)** — Two-tone split between the sticky left profile panel and crisp right reading column.
- **MOTION: 2 (Purposeful)** — Scroll-spy indicator, subtle hover border shifts, and project filter transitions only.

## Palette (R-01, R-29)
- **Light (Executive Slate):** `#ffffff` main canvas, `#f4f6f9` left panel, `#ffffff` card surface, `#0f172a` primary ink, `#475569` muted ink, `#e2e8f0` hairline border, **`#1d4ed8` Classic Slate Blue** accent (WCAG AA compliant).
- **Dark (Deep Navy):** `#0f172a` main canvas, `#162033` left panel, `#162033` card surface, `#f8fafc` primary ink, `#94a3b8` muted ink, `#1e293b` hairline border, **`#60a5fa` Soft Blue** accent.

## Typography, Print & Surface Discipline (R-06, R-10, R-11, R-12)
- **Body & UI:** `Inter` (self-hosted via `@fontsource/inter`), no decorative monospace text.
- **Display Accent:** System editorial serif (`Georgia, Cambria, "Times New Roman", serif`) in italic for surname emphasis.
- **Print:** `@media print` formats the page into a clean, ink-friendly resume when printed or saved as PDF.
