# FinShark Frontend

FinShark is a stock research and company financial analytics app built with Next.js and React Router. It provides discovery and deep company research tools, with attention to accessible token-based design and meaningful financial presentation.

## 🚀 Project Overview

This frontend includes:

- Company lookup and profile pages
- Financial statements (income statement, balance sheet, cashflow)
- Peer comparison finder
- Portfolio management UI
- Theme and dark mode with CSS tokens
- Responsive and accessible design

## 📁 Key Project Structure

- `src/app/`: root app/pages and layout
- `src/Routes/Routes.tsx`: application route definitions
- `src/Components/`: reusable UI components (Navbar, Sidebar, Tile, CompanyDashboard, RatioList, etc.)
- `src/Views/`: high-level pages (HomePage, SearchPage, CompanyPage, DesignGuideView)
- `src/lib/fmpClient.ts`: API client for financial data
- `src/Components/IncomeStatement/`, `BalanceSheet/`, `CashflowStatement/`: statement components

## ⚙️ Local Setup

1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm run dev
```

3. Open browser:

`http://localhost:3000`

### Optional: run on a fixed port

```bash
npm run dev -- --port 3004
```

## 🧠 Updated Feature Notes

The app uses shared CSS theme variables in `src/app/globals.css` such as `--surface`, `--text-strong`, and `--primary`. Many components are styled with utility classes using these tokens for consistent theme updates.

### Recent Visual Enhancements

- `Navbar` fixed sticky top
- `Sidebar` full height and equal vertical item distribution
- Deep Dive badge and statement headers highlighted in green tokens
- Ratio cards restyled with compact, wrapped label/value layout

## 🔍 Important Components

- `src/Components/CompanyDashboard/CompanyDashboard.tsx` — main company dashboard shell with collapsible statement panel
- `src/Components/Layout/CollapsiblePanel.tsx` — reusable collapsible card layout
- `src/Components/RatioList/RatioList.tsx` — ratio metrics card list used in company and balance sheet views
- `src/Components/ComparisonFinder/ComparisonFinder.tsx` — peer comparison helper

## 🧪 Common Scripts

- `npm run dev`: starts local dev server
- `npm run build`: builds production output
- `npm run start`: runs production build locally
- `npm run lint`: run lint checks

## 🛠️ Contributing

1. Create a new branch named feature/...
2. Implement code and commit with clear message
3. Run lint and tests
4. Open PR against `main`

## 📦 Deployment

Deploy like any Next.js app (Vercel or your own container). The app entrypoint is standard Next.js app router.

## 📌 Notes

If you modify theme tokens in `src/app/globals.css`, ensure components use token utilities (`bg-surface`, `text-strong`, etc.) for consistent design.

---

For more details on each component, open the components in `src/Components` and review the usage in `src/Views`.
