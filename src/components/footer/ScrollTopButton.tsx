"use client";
import { useHandleScroll } from "@/hooks/useScroll";

export default function ScrollTopButton() {
  const scrollTo = useHandleScroll();

  return (
    <button
      type="button"
      className="cursor-pointer"
      onClick={() => scrollTo("top")}
    >
      Back To Top
    </button>
  );
}
