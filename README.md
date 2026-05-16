# SASCO App Prototype

Interactive iPhone 16 Plus demo for the SASCO loyalty app. Built for the SASCO CEO meeting.

## Running locally

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Deploying to Coolify

1. Set build command: `npm run build`
2. Start command: `node .next/standalone/server.js`
3. Set `PORT` env var as needed
4. Point domain: `sascoprototype.bixet.tech`

`output: 'standalone'` is already set in `next.config.ts`.

## Figma source

- File key: `A3qivsv07LJ7nqCDk0S6Bc`
- Page: `21:19` (Page 1)
- 14 screens extracted as PNGs to `/public/screens/`

## Hotspot map

All tap zones are defined in `lib/flows.ts`. Wired flows:

| Hotspot | Action |
|---|---|
| Home QR button | Opens qr-pay sheet |
| Home "اتكلم معايا" button | Slides to AI Chat |
| Home services row | Switches to Network Map tab |
| All bottom tabs | Tab switch |
| QR Pay "إغلاق" | Closes sheet |
| QR Pay "تم" | Replaces with tx-confirmed sheet |
| Tx Confirmed "العودة للرئيسية" | Closes sheet, returns to home (balance/points animated) |
| Wallet "اشحن" | Opens topup sheet |
| Wallet "أرسل" | Opens send sheet |
| Wallet "وزِّع" | Opens transfer sheet |
| Wallet "اطلب" | Opens request sheet |
| Wallet QR button | Opens qr-pay sheet |
| Wallet "نقاطك" area | Navigates to wallet-loyalty |
| AI Sticky button (all non-home screens) | Slides to AI Chat |
| Network map area | Opens selected-spot sheet |
| AI Chat template buttons | Triggers typed AI response |
| AI Chat back button | Returns to home |

## No-ops (wired but no target screen)

| Hotspot | Status |
|---|---|
| Topup / Send / Transfer / Request close buttons | Closes sheet (returns to wallet) |
| Garage car rows | Returns to home (no car detail screen) |
| Selected Spot "خذني عليها" | Closes sheet |
| More screen rows | No action |
| AI Chat send button | No action |
