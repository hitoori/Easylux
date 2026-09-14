# Airport & City Transfers — Design QA

- Source visual truth: `/var/folders/8z/xjjt5_3n63b308c5nxghy7qc0000gn/T/codex-clipboard-25293491-ba03-4a34-84ad-a763657cd985.png`
- Implementation capture: `/Users/octavia/Documents/luxtransportproiect/luxtransport/airport-implementation-desktop.png`
- Source pixels: 1896 × 928
- Implementation pixels / CSS viewport: 1466 × 674 at device scale 1
- Normalization: compared by proportional section width; implementation is 77.3% of source width. Browser chrome was excluded from layout judgments.
- State: Airport & City → From the airport, dark theme.

**Full-view comparison evidence**

- The sidebar divider, main-copy start, image start and lower information bar follow the same three-column proportions as the reference.
- The current V-Class airport image is intentionally retained per the user request; only its crop, height and edge treatment were adjusted.
- The reference slogan is intentionally absent per the user request. The body copy now follows the heading directly.
- The lower bar preserves the reference hierarchy: price, primary/custom quote actions, and meeting information.

**Focused region comparison evidence**

- Typography: Source Serif 4 remains the display face; Manrope remains the utility/body face. Heading scale, body leading and small-label tracking match the existing Easy Lux system.
- Spacing: sidebar controls are slightly larger; the benefits sit at the same vertical band as the reference; the image is shorter and extends 24px toward the copy.
- Colors: existing background, ivory, muted gray and gold tokens are preserved.
- Image: the supplied project asset remains sharp and undistorted. A subtle square-edged top/left shadow blends it into the section.
- Icons: existing Phosphor icons are retained and centered within each benefit column.
- Copy: unchanged except for removal of the requested slogan and the two-line image-caption break.

**Comparison history**

- P2: Main heading and sidebar initially started too close to the image top. Fixed with a shared 40px desktop top offset; post-fix capture matches the reference rhythm.
- P2: CTA was proportionally wider than the reference. Reduced to 230px; post-fix capture restores the intended balance.
- P2: Sidebar labels wrapped because the arrow consumed a grid column. Positioned the arrow independently and restored single-line labels.
- User refinement: enlarged the three sidebar controls, centered benefit icons, shortened the image, extended it left and added subtle top/left shadowing.

**Findings**

- No actionable P0, P1 or P2 differences remain.
- Intentional deviations: current airport image and compact copy are preserved; the removed slogan is not treated as drift.

**Implementation Checklist**

- [x] Preserve section structure and current image.
- [x] Remove the unwanted slogan.
- [x] Match desktop column proportions and vertical rhythm.
- [x] Match lower information-bar hierarchy.
- [x] Preserve responsive layouts and interaction states.

**Follow-up Polish**

- P3: The shadow intensity can be tuned after viewing on the user's display; current opacity is intentionally restrained.

final result: passed
