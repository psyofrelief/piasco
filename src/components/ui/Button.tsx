import { cn } from "@/lib/utils";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
  variant?: "primary" | "outline";
}
export default function Button({
  children,
  isLoading = false,
  variant = "primary",
  className = "",
  disabled,
  ...props
}: Props) {
  const variants = {
    primary: "bg-foreground text-background hover:opacity-60",
    outline:
      "border border-inherit border-dotted text-foreground-secondary hover:opacity-60",
  };

  return (
    <button
      className={cn(
        "gap-x-sm px-sm py-xs flex size-fit cursor-pointer items-center justify-center font-mono tracking-normal whitespace-nowrap uppercase transition-all",
        variants[variant],
        isLoading && "cursor-not-allowed opacity-50",
        className,
      )}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && (
        <span className="size-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}

      {children}
    </button>
  );
}
