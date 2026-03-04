import { cn } from "@/lib/utils";

interface Props {
  label: string;
  className?: string;
}
export default function Heading({ label, className = "" }: Props) {
  return (
    <h1
      className={cn(
        "text-accent-muted font-mono text-xs whitespace-nowrap uppercase",
        className,
      )}
    >
      {label}
    </h1>
  );
}
