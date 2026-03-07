import { cn } from "@/lib/utils";
import GradientImage from "../ui/GradientImage";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Panel({ children, className = "" }: Props) {
  return (
    <>
      <section
        className={cn(
          "text-foreground sm:py-3xl py-xl px-sm sm:px-lg border-t-outline size-full flex-1 border-t border-dashed bg-none lg:border-t-transparent 2xl:px-40",
          className,
        )}
      >
        {children}
        <GradientImage />
      </section>
    </>
  );
}
