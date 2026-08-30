import { defaultCache } from "@serwist/next/worker";
import { Serwist, NetworkOnly, NetworkFirst, CacheFirst, ExpirationPlugin, type PrecacheEntry } from "serwist";

// Serwist injects the precache manifest at build time as `self.__SW_MANIFEST`.
// Declare it here so TypeScript is satisfied.
declare const self: ServiceWorkerGlobalScope & {
  __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
};

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    // ── NEVER cache auth routes ────────────────────────────────────────────
    // Must be declared first so it takes priority over any later rules.
    {
      matcher: /^\/api\/auth\//,
      handler: new NetworkOnly(),
    },
    // ── Other API routes: network-first ───────────────────────────────────
    // Sanity content + AI routes: fresh when online, cache fallback offline.
    {
      matcher: /^\/api\//,
      handler: new NetworkFirst({
        cacheName: "api-responses",
      }),
    },
    // ── Static assets: cache-first ────────────────────────────────────────
    {
      matcher: /\.(?:js|css|woff2?|png|jpg|jpeg|svg|ico|webp)$/,
      handler: new CacheFirst({
        cacheName: "static-assets",
        plugins: [
          new ExpirationPlugin({
            maxEntries: 200,
            maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
          }),
        ],
      }),
    },
    // Next.js default caching for pages/navigation
    ...defaultCache,
  ],
});

serwist.addEventListeners();
