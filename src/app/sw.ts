import { defaultCache } from "@serwist/next/worker";
import {
  Serwist,
  NetworkOnly,
  NetworkFirst,
  CacheFirst,
  ExpirationPlugin,
  type PrecacheEntry,
} from "serwist";

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

// ── Offline fallback for navigation requests ────────────────────────────────
// When a page navigation fails (offline + not cached), serve /offline.
// We listen for fetch events after Serwist's handlers; if no match or
// network error, we fall back to the cached /offline page.
self.addEventListener("fetch", (event: FetchEvent) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(async () => {
        const cache = await caches.open("pages");
        const cached = await cache.match("/offline");
        if (cached) return cached;
        // Ultimate fallback — basic offline message
        return new Response("You are offline. Please reconnect.", {
          status: 503,
          headers: { "Content-Type": "text/plain" },
        });
      })
    );
  }
});

// ── Web Push Notifications ──────────────────────────────────────────────────
self.addEventListener("push", (event: PushEvent) => {
  if (!event.data) return;

  try {
    const data = event.data.json();
    const title = data.title || "Raste Aur Raahein";
    const options: NotificationOptions = {
      body: data.body || "New update available on Raste Aur Raahein!",
      icon: data.icon || "/icons/icon-192.png",
      badge: "/icons/icon-192.png",
      data: {
        url: data.url || "/",
      },
    };
    event.waitUntil(self.registration.showNotification(title, options));
  } catch {
    const text = event.data.text();
    event.waitUntil(
      self.registration.showNotification("Raste Aur Raahein", {
        body: text,
        icon: "/icons/icon-192.png",
      })
    );
  }
});

self.addEventListener("notificationclick", (event: NotificationEvent) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || "/";

  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url === targetUrl && "focus" in client) {
            return client.focus();
          }
        }
        if (self.clients.openWindow) {
          return self.clients.openWindow(targetUrl);
        }
      })
  );
});
