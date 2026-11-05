"use client";

import { useEffect, useRef, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { API_BASE_URL } from "@/lib/api";

function TrackerContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const queryString = searchParams ? searchParams.toString() : "";
    const fullPath = queryString ? `${pathname}?${queryString}` : pathname;

    // Avoid duplicate tracks for the exact same path
    if (lastTrackedPath.current === fullPath) return;
    lastTrackedPath.current = fullPath;

    try {
      const payload = JSON.stringify({
        path: fullPath || "/",
        referrer: document.referrer || "",
      });

      const trackUrl = `${API_BASE_URL}/track-visit/`;

      // Use navigator.sendBeacon if available (fire-and-forget, 0ms latency)
      if (typeof navigator !== "undefined" && navigator.sendBeacon) {
        const blob = new Blob([payload], { type: "application/json" });
        navigator.sendBeacon(trackUrl, blob);
      } else {
        fetch(trackUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true,
        }).catch(() => {});
      }
    } catch {
      // Failsafe: never interrupt visitor browsing
    }
  }, [pathname, searchParams]);

  return null;
}

export default function VisitorTracker() {
  return (
    <Suspense fallback={null}>
      <TrackerContent />
    </Suspense>
  );
}

