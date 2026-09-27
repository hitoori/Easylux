# Easy Lux Transfer

Clean React + TypeScript implementation of the local Figma Make chauffeur website.

## Stack

- React 19
- TypeScript
- Tailwind CSS 4
- Vite

## Iconography

Interface icons combine the free MIT-licensed Pikaicons React set with Phosphor icons for transport and brand-specific symbols that are not included in the free Pikaicons package. Pikaicons are styled through `currentColor` to match the Easy Lux palette.

## Structure

- `src/pages/` — the six website pages
- `src/components/` — shared layout and booking components
- `src/config/` — shared navigation configuration
- `src/types/` — shared TypeScript types
- `src/index.css` — design tokens, typography, Tailwind theme, and global styles
- `public/images/brand/` — active Easy Lux identity files
- `public/images/home/` — Home images grouped by section
- `public/images/services/` — Services images grouped by section
- `public/images/shared/` — destination images reused across pages

## Commands

```bash
npm run dev
npm run build
```

## Booking delivery

The Home booking, Home quote, Services quote, and Contact forms use `/api/booking` to send two messages: a source-labelled request to Easy Lux and a matching acknowledgement to the customer. Quote and contact requests receive their own acknowledgement copy; booking tabs share the booking confirmation. A successful request is **not** a confirmed booking. When email delivery is not configured, the form displays an error and keeps the entered details.

### Activate Google address suggestions

1. Create a project in [Google Cloud Console](https://console.cloud.google.com/) and attach a billing account.
2. Enable **Maps JavaScript API** and **Places API (New)** for that project.
3. Create a browser API key. Restrict it to your website's HTTP referrers (production domain and localhost for development) and to those APIs.
4. Put `VITE_GOOGLE_MAPS_API_KEY=...` in `.env.local` for local development, and set the same public build variable in production. Rebuild the site. The key is visible in the browser by design; its restrictions control usage. Without it, addresses remain editable manually.

### Activate email delivery

1. Create a [Resend](https://resend.com/) account using `easyluxtransfer@gmail.com` and create an API key.
2. For a no-domain test, set the sender to Resend's test sender and keep the company recipient as that account email. When submitting the form, enter the same address as the customer email so both test messages arrive in that inbox:

   ```text
   RESEND_API_KEY=re_...
   BOOKING_FROM_EMAIL=Easy Lux <onboarding@resend.dev>
   BOOKING_TO_EMAIL=easyluxtransfer@gmail.com
   BOOKING_INSTAGRAM_URL=
   BOOKING_FACEBOOK_URL=
   BOOKING_TIKTOK_URL=
   ```

   Resend only allows its shared test sender to deliver to the account owner. This confirms the app-to-email flow; it does not test delivery to external customers.

3. For customer delivery, add a domain you own in Resend and verify it by adding the DNS records shown in Resend at your domain provider. A Gmail inbox can still receive orders, but a verified sending domain is needed to send confirmations to customers.
4. After domain verification, use a sender on that domain, for example `Easy Lux <booking@your-domain.com>`. Set these **server-only** values in `.env.local` for local development and as secrets/environment variables in the production Worker:

   ```text
   RESEND_API_KEY=re_...
   BOOKING_FROM_EMAIL=Easy Lux <booking@your-domain.com>
   BOOKING_TO_EMAIL=easyluxtransfer@gmail.com
   ```

   Add the company's Instagram, Facebook, and TikTok profile URLs as `BOOKING_INSTAGRAM_URL`, `BOOKING_FACEBOOK_URL`, and `BOOKING_TIKTOK_URL` to show those active links in the email footer. Leave a value empty to hide that channel.

5. Restart the local dev server or redeploy production after setting the values. Never prefix the Resend key with `VITE_` and never commit it to Git.
6. After domain verification, submit a test request using an email you own. Confirm that the client receives the acknowledgement and the company Gmail inbox receives the order. Check spam and Resend delivery logs if either is missing.

The Home forms use a required customer email to send the acknowledgement. All email delivery runs on the server, and failures are shown without a false success message.
