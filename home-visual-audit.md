# Home — audit vizual, 30 august 2026

Verificare fără modificări de cod. Desktop: 1280 × 720; mobil: 390 × 844. Măsurători DOM pentru toate secțiunile vizibile; capturi detaliate pentru zonele enumerate mai jos. Nu reprezintă un audit complet de accesibilitate, de tastatură sau al tuturor breakpointurilor.

## Concluzie

Source Serif 4 / Manrope și paleta sunt coerente. Titlurile nu sunt în general prea mari: H1 desktop aproximativ 67px, H2 aproximativ 46–56px; pe mobil H1 48px, majoritatea H2 38–44px. Nu recomand micșorarea globală.

Priorități:

1. **Hero mobil — contrast și înălțime.** Textul ivory se suprapune peste cerul luminos; lizibilitate slabă în captura mobilă. Secțiunea are aproximativ 1100px la un viewport de 844px; începutul formularului apare abia spre baza primului ecran. Protejați zona textului prin overlay/crop și compactați spațiul înaintea formularului. Contrastul fotografiei este variabil; nu s-a calculat o rată WCAG pixel-cu-pixel.
2. **Fotografiile mașinii — înălțimi prea rigide.** Exteriorul are 700px pe desktop, iar întreaga secțiune 792px pe un ecran de 720px. Pe mobil exteriorul are 520px, iar cele două imagini suplimentare 270px fiecare; secțiunea ajunge la aproximativ 1783px. Recomand exterior de circa 560–620px pe desktop și 380–420px pe mobil; imaginile secundare circa 210–230px pe mobil, cu crop verificat.
3. **Etichetele mici — prea mici, nu prea mari.** Unele etichete Water Taxi sunt de 9px pe mobil, altele 10–11px; descrierile beneficiilor mașinii au 13px. Păstrați metadatele la 11–12px și textul de citit la minimum 14px. Textul principal este deja, în majoritate, 14–16px.

Imaginile vizibile au rezoluții suficiente pentru sloturile măsurate, fără întindere observată a fotografiilor. Prosecco, aproximativ 803 × 502px pe desktop și 346 × 239px pe mobil, este bine proporționat. Nicio depășire orizontală a paginii la 390px. Culoarea textului principal `#ECE6DB`, secundar `#C8C0B5`, discret `#AAA39A` este consecventă; problema majoră de contrast este deasupra fotografiei hero, nu pe fundalurile uniforme.

## Capturi și pași verificați

### 1. Hero desktop — ierarhie bună, primul ecran înalt

![Hero desktop](/tmp/home-audit-01-hero.png)

### 2. Mașină desktop — fotografie prea înaltă pentru laptop

![Mașină desktop](/tmp/home-audit-02-vehicle.png)

### 3. Prosecco desktop — proporții bune

![Prosecco desktop](/tmp/home-audit-03-journeys.png)

### 4. Hero mobil — contrast insuficient în zona cerului

![Hero mobil](/tmp/home-audit-04-mobile-hero.png)

### 5. Mașină mobil — prea multă înălțime înaintea explicației

![Mașină mobil](/tmp/home-audit-05-mobile-vehicle.png)

### 6. Booking mobil — lizibil, titlul nu necesită reducere globală

![Booking mobil](/tmp/home-audit-06-mobile-process.png)

Restul secțiunilor a fost verificat prin dimensiunile calculate și culorile din DOM, nu prin capturi complete independente în acest audit. Nu au fost trimise formulare sau modificate textele, imaginile, stilurile ori layoutul site-ului.
