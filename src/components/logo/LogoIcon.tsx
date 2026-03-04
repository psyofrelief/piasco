import { cn } from "@/lib/utils";

interface LogoIconProps {
  variant?: "default" | "outline";
  className?: string;
}

export default function LogoIcon({
  variant = "default",
  className,
}: LogoIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="37"
      height="37"
      fill="none"
      className={cn(
        variant === "outline" && "border-outline border",
        className,
      )}
    >
      <g clipPath="url(#a)">
        <path
          className={variant === "default" ? "fill-black" : "fill-transparent"}
          d="M0 0h33v33H0z"
        />

        {[16.5, 19.676, 22.851, 26.026, 29.201].map((x, i) => (
          <rect
            key={i}
            width="16.212"
            height="16.212"
            x={x}
            y="5.036"
            className={
              variant === "default" ? "stroke-white" : "stroke-outline"
            }
            strokeWidth=".794"
            rx="8.106"
            transform={`rotate(45 ${x} 5.036)`}
          />
        ))}
      </g>
      <defs>
        <clipPath id="a">
          <path d="M0 0h33v33H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
