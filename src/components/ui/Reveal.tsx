"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface RevealProps {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  stagger?: number;
  duration?: number;
  selector?: string;
}

export default function Reveal({
  children,
  as: Component = "div",
  className = "",
  stagger = 0.05,
  duration = 0.5,
  selector = ".reveal-item",
}: RevealProps) {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.to(selector, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: duration,
        stagger: stagger,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: container },
  );

  return (
    <Component ref={container} className={className}>
      {children}
    </Component>
  );
}
