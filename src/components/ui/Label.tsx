import { cn } from "@/lib/utils";

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  htmlFor: string;
}

export default function Label({
  children,
  htmlFor,
  className,
  ...props
}: Props) {
  return (
    <label
      className={cn("text-xs font-medium", className)}
      htmlFor={htmlFor}
      {...props}
    >
      {children}
    </label>
  );
}
