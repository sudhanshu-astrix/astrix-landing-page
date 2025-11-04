"use client";
import { useEffect, useRef } from "react";
import mixpanel from "mixpanel-browser";

function getDeviceType() {
  if (typeof window === "undefined") return "unknown";
  const ua = navigator.userAgent.toLowerCase();
  if (/mobile|android|iphone|ipad|ipod/i.test(ua)) return "mobile";
  if (/tablet|ipad/i.test(ua)) return "tablet";
  return "desktop";
}

export function useSectionTracker(sectionIds: string[]) {
  const currentSectionRef = useRef<string | null>(null);
  const enterTimeRef = useRef<number | null>(null);
  const deviceType = getDeviceType();

  useEffect(() => {
    const handleVisibility = (entries: IntersectionObserverEntry[]) => {
      const visibleEntry = entries.find((entry) => entry.isIntersecting);
      if (!visibleEntry) return;

      const now = Date.now();

      if (currentSectionRef.current && enterTimeRef.current) {
        const duration = (now - enterTimeRef.current) / 1000;
        mixpanel.track(`${currentSectionRef.current} Viewed for ${duration}s`, {
          section: currentSectionRef.current,
          duration_seconds: duration,
          device_type: deviceType,
        });
      }

      currentSectionRef.current = visibleEntry.target.id;
      enterTimeRef.current = now;
    };

    const observer = new IntersectionObserver(handleVisibility, {
      threshold: 0.5,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();

      if (currentSectionRef.current && enterTimeRef.current) {
        const duration = (Date.now() - enterTimeRef.current) / 1000;
        mixpanel.track("Section Viewed", {
          section: currentSectionRef.current,
          duration_seconds: duration,
          device_type: deviceType,
        });
      }
    };
  }, [sectionIds, deviceType]);
}
