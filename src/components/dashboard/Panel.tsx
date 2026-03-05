import { cn } from "@/lib/utils";
import Image from "next/image";

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

      <div className="pointer-events-none absolute inset-0 z-1 flex items-end justify-center">
        <Image
          src="/images/gradient.png"
          alt=""
          width={1000}
          height={1000}
          className="h-100 w-full object-bottom"
          priority
        />
      </div>
    </section>
  );
}
