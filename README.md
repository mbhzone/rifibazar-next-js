# Rifi Bazar — Next.js (App Router)

Home, Products (listing), Single product, Checkout. Layout = new design mockups; colours, fonts and photos = live Rifi Bazar site.
Bangla (default) / English toggle is in the top bar. Cart is saved in the browser.

## Run
```bash
npm install
cp .env.example .env.local   # fill NEXT_PUBLIC_BASE_URL and NEXT_PUBLIC_TURNSTILE_SITE_KEY
npm run dev                  # http://localhost:3000
npm run build && npm start
```

## Pages
| URL | File |
|---|---|
| `/` | `components/HomePage.jsx` |
| `/products` (`?category=aam\|khejur-gur\|achar`, `?q=`, `?sale=1`, `?sort=`) | `components/ProductsClient.jsx` |
| `/product/[slug]` | `components/ProductDetail.jsx` |
| `/checkout` | `components/CheckoutClient.jsx` |

## What to edit
- **Products, prices, stock, photos** → `lib/products.js`
  - `inStock: false` shows the "Stock out" card.
  - `images: []` shows a "Photo" placeholder. Put the file in `public/images/` and write `'/images/your-file.jpg'`.
  - **Khejur gur prices/names and Langra photos are placeholders** — please set the real ones.
- **Phone, WhatsApp, email, address, reviews, delivery charges, coupons** → `lib/site.js`
- **Bangla / English texts** → `lib/i18n.js`
- **Colours** → CSS variables at the top of `app/globals.css`

## Checkout → backend
Posts to `${NEXT_PUBLIC_BASE_URL}/orders` (your existing Express server) with the same fields the live site sends
(`name, mobile, address, productName, price, qty, total, visitorId, turnstileToken, deviceInfo, status, orderDate`) plus extras
(`items[], email, note, deliveryArea, paymentMethod, monthlyReorder, coupon`). Cart can hold several products, so `productName`
is joined as `Name (pack) × qty + ...`. Honeypot, Turnstile and FingerprintJS are kept. GTM `view_item` / `purchase` events are kept.
The server limits 2 orders per IP per 24h (as before).

## Notes
- Fonts: the live site's global Bangla font rule is commented out, so it renders with the system sans-serif stack. This project uses the same stack. `Li Ador Noirrit` is still registered in CSS (`public/fonts`) if you want to use it.
- Admin panel (`/admin`) was not part of this request and is not included; keep using the old one against the same API.
- bKash / Nagad / Card are shown as "Coming soon" because the live site is cash-on-delivery only.
