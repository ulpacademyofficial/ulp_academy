"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView } from "@/lib/tracking";

export default function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasTracked = useRef(false);
  const lastPath = useRef("");

  useEffect(() => {
    // Create a unique key for this page view
    const currentPath = `${pathname}?${searchParams.toString()}`;
    
    // Only track if this is a new page or first load
    if (hasTracked.current && lastPath.current === currentPath) {
      return;
    }

    // Track the page view
    trackPageView();
    hasTracked.current = true;
    lastPath.current = currentPath;
  }, [pathname, searchParams]);

  return null;
}
