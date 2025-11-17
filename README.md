# UFD — UPI Fraud Detector (Next.js)

A polished, glassmorphic UPI fraud detection demo that showcases an interactive simulator, heuristic scoring, and a modern landing page. Built with Next.js 14, React 18, and TypeScript.

## Features
- Glassmorphism UI: Gradient glows, grid overlay, glass cards, sticky glass header.
- Premium typography: Oswald (headings) + Work Sans (body).
- Interactive Simulator: Adjust parameters and see risk score update live.
- Contribution Breakdown: Iconic cards with gradient progress bars sorted by impact.
- Risk Gauge + Metrics: Visual risk, decision chip (ALLOW / REVIEW / BLOCK), and detailed factors.
- Mock APIs: Local endpoints for score and transaction samples.
- Landing Page: What is UPI fraud, parameters, red flags, FAQ, and CTA — branded as UFD.

## Tech Stack
- Next.js 14 (Pages Router)
- React 18
- TypeScript 5
- CSS (global styles) — no UI framework dependency

## Quick Start
```powershell
# Clone
git clone https://github.com/ushi86/congenial-octo-umbrella.git
cd congenial-octo-umbrella

# Install dependencies
npm install

# Run dev server (Next will choose 3000 or 3001 if busy)
npm run dev
# Open http://localhost:3000 or http://localhost:3001
```

## Scripts
- `npm run dev`: Start Next.js in development mode
- `npm run build`: Production build
- `npm run start`: Start the production server (after `build`)

## Project Structure (key files)
```
components/
  DetailedMetrics.tsx
  FormFieldsets.tsx
  Header.tsx
  ReasonBars.tsx
  RiskGauge.tsx
  ScoreBreakdown.tsx
  TransactionSimulator.tsx
  TxnForm.tsx
  TxnTable.tsx
lib/
  mockClient.ts
pages/
  _app.tsx           # Global styles/fonts
  index.tsx          # Redirect or landing entry
  landing.tsx        # Hero + education content (UFD branding)
  simulate.tsx       # Full-screen simulator (glassmorphic)
  presentation.tsx   # Optional presentation route
  admin.tsx          # Optional admin playground
  api/mock/
    score.ts         # Mock scoring API
    transactions.ts  # Mock transactions API
styles/
  globals.css        # Fonts, glassmorphism, animations
```

## UI/UX Notes
- Fonts: Oswald for headings (`h1`-`h4`), Work Sans for body.
- Visuals: Backdrop blur, subtle borders, gradient orbs, grid overlay.
- Cards: Elevated glass cards with gradient accent and soft shadows.
- Contribution UI: Replaces table with cards, icons, and animated bars for clarity.

## Scoring Model (Heuristic)
The simulator computes a 0–100 risk score from multiple factors, each contributing a weighted amount with smooth (sigmoid) scaling to avoid hard jumps:
- Amount — higher amount increases risk.
- Device — unrecognized or new device increases risk.
- Time — late-night/odd-hour transactions increase risk.
- Category — certain merchant categories carry higher baseline risk.
- Velocity — rapid consecutive transactions increase risk.
- Location — unusual or far-from-usual geolocation increases risk.
- Type — pull/push or request/pay combinations can alter risk.
- Variance — deviation from user’s recent behavior increases risk.

Decision guidance (example):
- 0–39 → ALLOW
- 40–69 → REVIEW
- 70–100 → BLOCK

Note: Values and weights are illustrative for demo purposes.

## API (Mock)
- `GET /api/mock/transactions` — Example transactions list
- `POST /api/mock/score` — Returns `{ score: number, reasons: { feature, contribution, description }[] }`

## Environment
No environment variables are required for local development. Global fonts are loaded via CSS in `styles/globals.css`.

## Deploying to Vercel
1. Push this repo to GitHub (already done if you’re reading here).
2. Import the repo in Vercel (New Project → Import Git Repository).
3. Framework preset: Next.js
4. Build command: `npm run build`
5. Output directory: `.next`
6. Env vars: Not required for this demo.

After deployment, Vercel will handle default Next.js settings automatically.

## Contributing
- Keep changes small and focused.
- Match the existing glassmorphic design and typography.
- Use TypeScript and keep components presentational and composable.

## License
No explicit license at this time. Ask the author before reuse.
