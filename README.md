# Stock Market Tracker

## Project Info

A React project for tracking stock prices and visualizing them on a chart.

## Technologies Used

- Vite
- TypeScript
- React
- Tailwind CSS
- shadcn-ui
- Chart.js

## Getting Started

### Prerequisites

- Node.js and npm installed

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project folder
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start the development server
npm run dev

## Embedding an Alpha Vantage API key (skip the landing prompt)

If you want the site to start without asking for an API key, set the Alpha Vantage key in a Vite env var named `VITE_ALPHA_VANTAGE_API_KEY`.

1. Create a `.env` file at the project root (do NOT commit this file to source control if the key is private):

```bash
# .env
VITE_ALPHA_VANTAGE_API_KEY=your_alpha_vantage_key_here
```

2. Restart the dev server so Vite picks up the env variable:

```bash
npm run dev
```

3. The app will automatically read the embedded key and skip the API key prompt. The first time the app runs it will persist the embedded key into `localStorage` so the UI behaves like a saved key (you can still clear or change it from the app).

Security note: embedding an API key into a client-side bundle or committing it to a public repo exposes the key to anyone who inspects the deployed JavaScript. Prefer server-side proxies or using restricted keys for public deployments.
