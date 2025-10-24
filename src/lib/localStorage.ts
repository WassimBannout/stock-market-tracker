const API_KEY_STORAGE = 'stock_tracker_api_key';
const WATCHLIST_STORAGE = 'stock_tracker_watchlist';

// If you want to embed an API key as part of the site, set it in a Vite env var:
// VITE_ALPHA_VANTAGE_API_KEY=your_key_here
// This file will fall back to that env var when no key is stored in localStorage.
const FALLBACK_API_KEY: string | undefined = (import.meta as any).env?.VITE_ALPHA_VANTAGE_API_KEY;

export const saveApiKey = (apiKey: string) => {
  localStorage.setItem(API_KEY_STORAGE, apiKey);
};

export const getApiKey = (): string | null => {
  const stored = localStorage.getItem(API_KEY_STORAGE);
  if (stored) return stored;
  // Use embedded key from environment when present so the app skips the landing key prompt
  if (FALLBACK_API_KEY && FALLBACK_API_KEY.trim()) return FALLBACK_API_KEY.trim();
  return null;
};

export const clearApiKey = () => {
  localStorage.removeItem(API_KEY_STORAGE);
};

// Returns true if there is an API key actually stored in localStorage (not just the env fallback)
export const hasStoredApiKey = (): boolean => {
  return localStorage.getItem(API_KEY_STORAGE) !== null;
};

export const saveWatchlist = (watchlist: string[]) => {
  localStorage.setItem(WATCHLIST_STORAGE, JSON.stringify(watchlist));
};

export const getWatchlist = (): string[] => {
  const stored = localStorage.getItem(WATCHLIST_STORAGE);
  return stored ? JSON.parse(stored) : [];
};

export const addToWatchlist = (symbol: string) => {
  const watchlist = getWatchlist();
  if (!watchlist.includes(symbol)) {
    watchlist.push(symbol);
    saveWatchlist(watchlist);
  }
};

export const removeFromWatchlist = (symbol: string) => {
  const watchlist = getWatchlist();
  const filtered = watchlist.filter(s => s !== symbol);
  saveWatchlist(filtered);
};
