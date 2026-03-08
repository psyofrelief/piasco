"use client";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function GSAPInitialiser() {
  useEffect(() => {
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  useEffect(() => {
    const images = document.querySelectorAll("img");
    let loadedCount = 0;

    const handleImageLoad = () => {
      loadedCount++;
      if (loadedCount === images.length) {
        ScrollTrigger.refresh();
      }
    };

    images.forEach((img) => {
      if (img.complete) handleImageLoad();
      else img.addEventListener("load", handleImageLoad);
    });
  }, []);

  return null;
}
