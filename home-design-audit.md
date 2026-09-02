# Easy Lux Home — UX, Visual Design and Accessibility Audit

Date: 2026-08-09

## Audit scope

- Surface: current Home page at `http://127.0.0.1:4174/`
- User goal: understand the service, compare common routes, assess the vehicle and experiences, then start a booking request.
- Desktop evidence: `/tmp/easy-lux-home-audit/00-desktop-full.png` and numbered viewport captures `01`–`09`.
- Mobile evidence: `/tmp/easy-lux-home-audit/10-mobile-full.png`, `11-mobile-hero.png`, and `12-mobile-routes.png`.
- Capture viewport: 1440 × 1024 desktop and 390 × 844 mobile, device scale factor 1.
- Capture method: Playwright Chromium fallback, previously authorized by the user; the in-app Browser surface was unavailable.

## Overall verdict

The Home page has a credible quiet-luxury foundation and no longer reads as a generic gold-on-black template at first glance. The hero, open service section, factual Venice information and restrained footer belong to one system. The page is not fully unified yet: the route panel introduces a compact dashboard language, the vehicle section introduces a gallery language, and the water-taxi/Prosecco pair introduces a large editorial-image language. Variation is healthy, but the photograph grading, CTA hierarchy and one-off decorative devices do not yet provide enough connective tissue.

Overall visual cohesion: **7/10**.

## Step-by-step health

### 1. Hero and booking dock — Good

- Strongest section on the page: clear promise, authentic Venice context and an obvious booking action.
- Header, hero type and booking dock use the same warm-black/ivory/gold system.
- Risk: the pale hero image and transparent header reduce navigation contrast over the brightest sky area.
- Mobile risk: the booking dock becomes most of the first screen and delays the first proof/content section.

### 2. Three ways to travel — Good

- Open three-column structure is cleaner and more editorial than repeated cards.
- Documentary canal photograph creates a natural transition from the hero.
- Titles and descriptions share a clear hierarchy.
- Risk: when the fixed transparent header crosses this section, it can visually collide with the section heading and image.

### 3. Popular Routes & Prices — Mixed

- The panel is compact, practical and much easier to scan than the earlier oversized route ledger.
- Real prices are visible and the action is explicit.
- Main cohesion break: rounded container, column headers and six filled gold buttons read more like an admin/booking widget than the open editorial sections around it.
- Repeating the same filled-gold action on every row weakens the primary-action hierarchy.

### 4. Your private vehicle — Good with polish needed

- Real exterior/interior/luggage views are useful trust evidence.
- The asymmetric gallery is clear and interaction is understandable.
- The three photographs have noticeably different lighting, color temperature and crop quality.
- The amenities rail is too visually quiet compared with the large gallery above it.

### 5. Private water taxi — Mixed

- The split editorial layout is strong and Venice-specific.
- The bright cyan/green photograph is much more saturated than the hero and vehicle photography.
- The large faded `04` is a one-off numbering device and feels imported from a different template because the following Prosecco section does not continue the same system.

### 6. Exclusive Prosecco Hills experience — Mixed to good

- Alternating image/text direction creates useful rhythm after the water taxi section.
- Copy is specific rather than generic luxury language.
- The vineyard photograph has a different, older/high-saturation treatment than the rest of the site.
- The uppercase location eyebrow introduces another heading pattern after several different patterns already appear above.

### 7. How booking works — Good

- Compact and logically placed after the service/experience content.
- Three steps communicate the process without unnecessary decoration.
- Step numbers and descriptions are visually faint, especially on smaller screens.

### 8. Arriving in Venice — Good

- One of the most authentic sections because it explains flight details, Piazzale Roma and final water-taxi connection.
- Open columns match `Three ways to travel`, helping cohesion.
- Text density and low visual contrast make it easy to skip after several image-heavy sections.

### 9. Personalized CTA and footer — Good

- `Need a route not listed?` creates a sensible final decision point.
- Footer is restrained, readable and uses the same typography and palette.
- The ending is structurally sound but visually quiet after a long page; the CTA needs to remain the only dominant action in this area.

## Highest-impact recommendations

1. **Create one CTA hierarchy.** Keep one filled-gold primary action per section. Change repeated route-row buttons to a quieter outline or text treatment while preserving the route-panel structure the user selected.
2. **Apply one photographic grade.** Normalize white balance, saturation, contrast and shadow depth across hero, vehicle, water taxi and Prosecco photography. This is the biggest remaining “assembled from different sources” signal.
3. **Remove one-off decorative systems.** Either extend the large numeric index consistently or remove the isolated `04`; use one location-label/eyebrow rule rather than several section-specific variations.
4. **Define three heading sizes only.** Hero display, section heading and compact-module heading. The routes title, Prosecco title and CTA heading currently sit in slightly different systems.
5. **Improve the scrolled header state.** Preserve transparency at the top, then introduce a very subtle dark backdrop or shorter header after scrolling so page headings do not visually collide with navigation.
6. **Increase small-control accessibility.** Route action buttons are 31 px high with 11 px text; target at least about 40–44 px on touch layouts. Raise metadata that is currently 9–11 px where it carries important meaning.
7. **Reduce mobile first-screen dominance.** Keep the same booking logic but slightly tighten vertical padding and optional controls so the next section appears sooner.

## Accessibility evidence

Confirmed from DOM and current screenshots:

- One H1 is present and section headings follow with H2/H3 structure.
- All 11 images have alt text.
- No unnamed buttons were found.
- The three visible journey inputs have three labels.
- Desktop and mobile page-level horizontal overflow are both zero.

Risks requiring improvement or further testing:

- Route actions are 31 px tall, below the common 44 px touch-target recommendation.
- Navigation contrast changes depending on the photograph behind the transparent header.
- Several labels and captions use 9–11 px text.
- The fixed header can cover content while scrolling and may also affect anchor/focus positioning.
- Screenshot review cannot confirm complete keyboard order, modal focus trapping, screen-reader announcements, zoom behavior or WCAG contrast ratios.

## Recommended execution order

1. CTA hierarchy and routes-panel integration.
2. Photography color grading.
3. Header scrolled state.
4. Remove the isolated `04` and normalize section labels.
5. Small text and touch-target accessibility.
6. Mobile booking-dock compression.

No code was changed during this audit.
