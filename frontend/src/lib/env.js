// Vite exposes only variables prefixed with VITE_
// Make sure your .env has these (no quotes):
// VITE_API_URL=...
// VITE_COGNITO_REGION=...
// VITE_USER_POOL_ID=...
// VITE_USER_POOL_CLIENT_ID=...

const { VITE_API_URL, VITE_COGNITO_REGION, VITE_USER_POOL_ID, VITE_USER_POOL_CLIENT_ID } = import.meta.env;

export const API_URL = VITE_API_URL;
export const COGNITO_REGION = VITE_COGNITO_REGION;
export const USER_POOL_ID = VITE_USER_POOL_ID;
export const USER_POOL_CLIENT_ID = VITE_USER_POOL_CLIENT_ID;

// (Optional but helpful in dev) warn if something is missing
if (import.meta.env.DEV) {
  const missing = [];
  if (!API_URL) missing.push("VITE_API_URL");
  if (!COGNITO_REGION) missing.push("VITE_COGNITO_REGION");
  if (!USER_POOL_ID) missing.push("VITE_USER_POOL_ID");
  if (!USER_POOL_CLIENT_ID) missing.push("VITE_USER_POOL_CLIENT_ID");
  if (missing.length) {
    // eslint-disable-next-line no-console
    console.warn("[env] Missing env vars:", missing.join(", "));
  }
}
