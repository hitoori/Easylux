# Venice Water Taxi — Design QA

- Source visual truth: `/var/folders/8z/xjjt5_3n63b308c5nxghy7qc0000gn/T/codex-clipboard-0caa15a8-5365-4848-bca9-ec1089f703e6.png`
- Implementation: `http://127.0.0.1:5173/#services`, section `#service-water-taxi`
- Implementation capture: inline Codex in-app Browser capture, tab 9
- Viewport: 1440 × 900 CSS px
- Source pixels: 2906 × 1280; implementation viewport: 1440 × 900; comparison normalized by proportional visual inspection of the same desktop state
- State: Arriving in Venice active

## Full-view comparison evidence

- Text, access note and booking row now share the section's left alignment axis.
- Map fills the full hero background, stays right-anchored and blends behind an opaque-to-transparent left gradient.
- Title keeps two lines, with existing Source Serif 4 sizing and ivory color.
- Existing Manrope copy, gold accents, prices, CTA and tab behavior remain unchanged.
- No horizontal overflow at 1440 px or 390 px.

## Focused comparison evidence

Focused review covered the title/map boundary, bottom edge and CTA. The final pass enlarges the map with `object-fit: cover`, shifts it right by 8%, extends it beyond the right edge, and increases the CTA to 390 px while keeping the Hotel / Nearest Landing label visible.

## Required fidelity surfaces

- Fonts and typography: existing Source Serif 4 and Manrope preserved; title remains exactly two lines.
- Spacing and layout rhythm: all left-side content aligns at 57.6 px in the 1440 px viewport; map begins at 189.7 px and stays inside the section.
- Colors and visual tokens: existing Easy Lux ivory, charcoal and gold tokens preserved.
- Image quality and asset fidelity: original map files are used without raster modification or distortion; the larger crop matches the supplied composition.
- Copy and content: existing texts and both separate prices remain unchanged.

## Interaction checks

- Arriving and Leaving tabs update `aria-selected` and the active map.
- Both states keep the same 554.8 px desktop section height.
- Mobile map returns to relative flow at 390 px.

## Comparison history

1. P2: previous contained map left too much empty space above and below the visual.
2. Fix: enlarged the map with `cover`, used an 8% right shift and widened the CTA from 360 px to 390 px.
3. Post-fix evidence: map reaches the hero's right and bottom edges, landing label remains visible, and page has no horizontal overflow.

## Findings

No remaining P0, P1 or P2 issues for the requested alignment change.

## Follow-up polish

None required for this scoped change.

final result: passed
