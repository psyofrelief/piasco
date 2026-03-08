"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FadeUpProps {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  stagger?: number;
}

export default function FadeUp({
  children,
  as: Component = "div",
  className = "",
  stagger = 0.15,
}: FadeUpProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const elements = container.current?.children;

      if (elements) {
        gsap.fromTo(
          elements,
          { opacity: 0, y: 20, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            stagger: stagger,
            scrollTrigger: {
              trigger: container.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    },
    { scope: container },
  );

  return (
    <Component ref={container} className={className}>
      {children}
    </Component>
  );
}
