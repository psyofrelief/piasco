import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Panel({ children, className = "" }: Props) {
  return (
    <section
      className={cn(
        "text-foreground py-3xl size-full flex-1 bg-none px-40",
        className,
      )}
    >
      {children}
    </section>
  );
}
