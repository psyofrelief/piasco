"use client";
import { useMenuContext } from "@/contexts/menuContext";

export default function MenuIcon() {
  const { menuOpen, toggleMenu } = useMenuContext();
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-foreground size-md block cursor-pointer hover:opacity-50 sm:hidden"
      onClick={toggleMenu}
    >
      {/* Top Line */}
      <rect
        x="3"
        y="6"
        width="18"
        height="1.5"
        rx="0.75"
        fill="currentColor"
        className={`origin-center transition-all duration-300 ${
          menuOpen ? "translate-y-[4px] rotate-45" : ""
        }`}
      />
      {/* Middle Line */}
      <rect
        x="3"
        y="11.25"
        width="18"
        height="1.5"
        rx="0.75"
        fill="currentColor"
        className={`transition-opacity duration-300 ${
          menuOpen ? "opacity-0" : "opacity-100"
        }`}
      />
      {/* Bottom Line */}
      <rect
        x="3"
        y="16.5"
        width="18"
        height="1.5"
        rx="0.75"
        fill="currentColor"
        className={`origin-center transition-all duration-300 ${
          menuOpen ? "-translate-y-[4px] -rotate-45" : ""
        }`}
      />
    </svg>
  );
}
