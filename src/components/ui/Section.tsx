import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export default function Section({
  children,
  className = "",
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "text-foreground py-xl sm:py-2xl w-full flex-1 bg-none",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}
