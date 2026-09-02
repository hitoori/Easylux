# Global design-system QA

## Approved direction

- Display typography: Source Serif 4
- Body and UI typography: Manrope
- Base: `#0D0E0F`
- Secondary background: `#15191B`
- Surface: `#1B1F21`
- Elevated border/hover: `#24292C`
- Primary text: `#ECE6DB`
- Secondary text: `#C8C0B5`
- Muted text: `#AAA39A`
- Metadata: `#8F8880`
- Venetian Rich Gold accent: `#C29A45`
- Luminous gold hover: `#DAAB2D`
- Deep gold: `#84652D`

## Fidelity ledger

| Check | Result |
| --- | --- |
| Exactly two font families across page content and controls | Passed |
| Source Serif 4 used for display headings | Passed |
| Manrope used for body, navigation, labels, forms and buttons | Passed |
| Backgrounds and section transitions use the shared neutral tokens | Passed |
| Text, borders and interactive accents use the approved palette | Passed |
| Display sizes restrained on desktop and mobile | Passed |
| Home, Services, Tours, About, FAQ and Contact checked at desktop width | Passed |
| Home, Services, About and Contact checked at 390 px | Passed |
| No horizontal overflow at 390 px | Passed |
| Browser warnings and errors | None |
| Production build | Passed |

No page copy, information architecture or functionality was intentionally changed in this pass.

## Home section-flow pass

- Scope: Home only
- Vertical rhythm: compact, responsive 48–72px spacing by section role
- Transition: one-time 22px fade/reveal, 720ms editorial easing
- Media motion: subtle 1.018-to-1 scale settle
- Section continuity: fine neutral/gold divider and softened surface transitions
- Accessibility: motion disabled with `prefers-reduced-motion`
- Desktop checked: 1440 × 900
- Mobile checked: 390 × 844
- Horizontal overflow: none
- Browser warnings and errors: none
- Home copy, order and functionality: unchanged
