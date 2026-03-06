import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Headline({ children, className = "" }: Props) {
  return (
    <h1 className={cn("text-2xl leading-[1.1em]", className)}>{children}</h1>
  );
}
