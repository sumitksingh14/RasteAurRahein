"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/** Fire a GA4 page_view event — called on every route change */
function GAPageTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_ID || typeof window === "undefined" || !window.gtag) return;
    const url =
      pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
    window.gtag("event", "page_view", {
      page_path: url,
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
}

/**
 * Loads Google Analytics 4.
 *
 * Mount once inside <body> in the root layout.
 * Reads NEXT_PUBLIC_GA_MEASUREMENT_ID from the environment — if not set,
 * nothing is loaded so local dev stays clean.
 *
 * Custom event helper (call from any client component):
 *   window.gtag?.("event", "newsletter_signup", { method: "footer" });
 */
export default function GoogleAnalytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
            send_page_view: false
          });
        `}
      </Script>
      {/* Suspense required because useSearchParams() needs it in Next.js 13+ */}
      <Suspense fallback={null}>
        <GAPageTracker />
      </Suspense>
    </>
  );
}

// Augment the Window type so `window.gtag` is usable in TypeScript everywhere
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}
