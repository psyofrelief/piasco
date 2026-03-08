import { cn } from "@/lib/utils";
import BackgroundCircles from "./BackgroundCircles";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  hasBackground?: boolean;
}

export default function Section({
  children,
  className = "",
  hasBackground = false,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "text-foreground py-xl sm:py-2xl relative w-full flex-1 overflow-x-visible bg-none",
        className,
      )}
      {...props}
    >
      {hasBackground && (
        <>
          <div className="bg-background/70 absolute inset-0 -z-1" />

          <BackgroundCircles />
        </>
      )}
      {children}
    </section>
  );
}
