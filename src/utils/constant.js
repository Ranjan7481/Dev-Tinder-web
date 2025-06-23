// Use fallback if env var not set (for local dev)
export const BASEURL = import.meta.env.VITE_API_URL || "http://localhost:7777";
