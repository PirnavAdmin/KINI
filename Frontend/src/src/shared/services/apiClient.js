import axios from "axios";

// In dev, requests are sent as same-origin relative paths so the Vite
// proxy (see vite.config.js) can forward them server-to-server, working
// around the backend not sending Access-Control-Allow-Origin. There's
// no proxy layer in a built/previewed app, so those hit the real API
// directly — a CORS failure there is a backend-side fix.
const API_BASE_URL = import.meta.env.DEV ? "" : "https://latitude-apron-winter.ngrok-free.dev";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    // Free ngrok tunnels serve an HTML interstitial warning page to
    // browser-originated requests unless this header is present, which
    // would otherwise break JSON parsing here.
    "ngrok-skip-browser-warning": "true",
  },
});

export default apiClient;
