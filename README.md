# SocialDrive

**A peer-to-peer used car marketplace built on expert inspections, community test drive reviews, and secure escrow payments.**

Live demo: [socialdrive.vercel.app](https://socialdrive.vercel.app)

---

## Overview

SocialDrive eliminates the three biggest risks in used car buying:

| Problem | SocialDrive Solution |
|---|---|
| Unknown vehicle condition | Certified expert inspects and scores every verified listing |
| Unfair pricing | Expert validates and negotiates a fair market price |
| Unsafe payment | Funds held in escrow, released only on confirmed handover |

Community buyers add a fourth layer — detailed 7-dimension reviews after every test drive, visible to anyone researching the vehicle.

---

## Screenshots

| Landing | Listings | Vehicle Detail |
|---|---|---|
| Hero, features, how-it-works | Filtered grid with confidence scores | Inspection report + community reviews |

---

## Features

- **Expert Verified listings** — certified mechanic inspects vehicle, scores 5 categories, flags red flags, recommends fair price
- **Confidence Score** — high / medium / low indicator combining inspection score and community rating average
- **Community Test Drive Reviews** — 7-axis star ratings (engine, comfort, handling, interior, efficiency, noise, overall) + written reviews
- **Live filtering** — filter by price, year, mileage, body type, fuel type, expert-only; sort by price, mileage, inspection score, or rating
- **Seller Dashboard** — manage listings, accept/decline offers, multi-step car listing form, earnings overview
- **Expert Profiles** — credentials, certifications, recent inspection history, booking form
- **Secure modal flows** — test drive scheduling, offer submission, inspection booking
- **Role switcher** (demo mode) — toggle between Buyer / Seller / Expert to explore all UX flows

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 |
| Routing | React Router v6 |
| Styling | Tailwind CSS v3 |
| Build tool | Vite 6 |
| Deployment | Vercel |
| CI | GitHub Actions |

No backend. All data is local mock data in `src/data/` — structured for easy swap to a real API.

---

## Getting Started

### Prerequisites

- Node.js 18+ ([nodejs.org](https://nodejs.org))

### Install & run

```bash
git clone https://github.com/zabi-ship-it/socialdrive.git
cd socialdrive
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Build for production

```bash
npm run build
npm run preview   # preview the production build locally
```

---

## Project Structure

```
src/
├── data/                   # Mock data (vehicles, experts, reviews, seller)
│   ├── vehicles.js         # 8 vehicle listings with full inspection data
│   ├── experts.js          # 3 expert inspector profiles
│   ├── reviews.js          # 12+ test drive reviews
│   └── seller.js           # Seller dashboard data
│
├── context/
│   └── UserContext.jsx     # Role state (buyer | seller | expert)
│
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx      # Sticky nav with role switcher
│   │   └── Footer.jsx
│   ├── ui/                 # Primitive components (Badge, Button, StarRating)
│   ├── vehicles/           # VehicleCard, VehicleFilters, ConfidenceScore, InspectionReport
│   └── reviews/            # ReviewCard, MultiDimensionalRating
│
└── pages/
    ├── LandingPage.jsx
    ├── ListingsPage.jsx
    ├── VehicleDetailPage.jsx
    ├── SellerDashboardPage.jsx
    └── ExpertProfilePage.jsx
```

---

## Connecting a Real Backend

All data imports in pages follow this pattern:

```js
import { vehicles } from '../data/vehicles.js'
```

To connect a real API, replace these imports with `useEffect` + `fetch` / a query library (React Query, SWR). Component prop interfaces stay the same — no component rewrites needed.

---

## Deployment

This project is deployed on Vercel. The `vercel.json` at the root handles client-side routing rewrites so React Router links work on direct navigation.

To deploy your own instance:

1. Fork or clone this repo to your GitHub account
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import from GitHub
3. Vercel auto-detects Vite — no configuration needed
4. Click **Deploy**

Every push to `main` triggers an automatic redeploy. Pull requests get a preview URL automatically.

---

## Roadmap

See [PRODUCT_SPECIFICATIONS.md](./PRODUCT_SPECIFICATIONS.md) for the full product vision.

- [ ] Real authentication (Clerk / Auth0 / Supabase Auth)
- [ ] Backend API (Supabase / PlanetScale / Railway)
- [ ] Payment processing (Stripe Connect for escrow)
- [ ] VIN decoder integration
- [ ] Mobile app (React Native)
- [ ] AI-powered price recommendations (Phase 3)

---

## License

MIT

---

Built with the [SocialDrive Product Specifications](./PRODUCT_SPECIFICATIONS.md).
