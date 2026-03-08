import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Headline({ children, className = "" }: Props) {
  return (
    <h2
      className={cn(
        "font-display text-xl leading-[1.1em] sm:text-2xl",
        className,
      )}
    >
      {children}
    </h2>
  );
}
