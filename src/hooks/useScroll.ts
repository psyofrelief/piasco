"use client";

import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useCallback } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin);
}

export function useHandleScroll() {
  return useCallback((target: string | Element) => {
    const el =
      typeof target === "string"
        ? document.getElementById(target.replace("#", ""))
        : target;

    if (el) {
      gsap.to(window, {
        duration: 0.8,
        scrollTo: { y: el, autoKill: true },
        ease: "power3.inOut",
      });
    }
  }, []);
}
