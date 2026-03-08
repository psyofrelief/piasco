"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BackgroundCircles() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const scrollConfig = {
        trigger: container.current,
        start: "top center",
        end: "bottom 30%",
        toggleActions: "play reverse play reverse",
      };
      // Animate bottom-right div
      gsap.fromTo(
        ".bottom-right-container",
        { x: 300, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power2.out",
          scrollTrigger: scrollConfig,
        },
      );

      // Animate top-left div
      gsap.fromTo(
        ".top-left-container",
        { x: -300, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: scrollConfig,
        },
      );
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="pointer-events-none absolute inset-0 -z-2 overflow-visible"
    >
      <div className="bottom-right-container absolute -right-80 -bottom-20 flex items-center sm:-right-[40%] md:-right-1/2 md:-bottom-30">
        <svg
          viewBox="0 0 797 591"
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-accent/60 h-auto w-100 fill-none stroke-2 md:w-200"
        >
          <Circles />
        </svg>
      </div>

      <div className="top-left-container absolute -top-20 -left-80 flex items-center sm:-left-[40%] md:-top-30 md:-left-1/2">
        <svg
          viewBox="0 0 797 591"
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-outline/50 h-auto w-100 fill-none stroke-2 md:w-200"
        >
          <Circles />
        </svg>
      </div>
    </div>
  );
}

function Circles() {
  return (
    <>
      <circle cx="295.5" cy="295.5" r="294" />
      <circle cx="317.5" cy="295.5" r="294" />
      <circle cx="340.5" cy="295.5" r="294" />
      <circle cx="363.5" cy="295.5" r="294" />
      <circle cx="386.5" cy="295.5" r="294" />
      <circle cx="409.5" cy="295.5" r="294" />
      <circle cx="432.5" cy="295.5" r="294" />
      <circle cx="455.5" cy="295.5" r="294" />
      <circle cx="478.5" cy="295.5" r="294" />
      <circle cx="501.5" cy="295.5" r="294" />
    </>
  );
}
