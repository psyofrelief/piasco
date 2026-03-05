interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  placeholder: string;
}

export default function Input({ type = "text", placeholder, ...props }: Props) {
  return (
    <input
      type={type}
      className="bg-background border-outline ring-accent-muted p-sm placeholder:text-foreground-secondary w-full border border-dashed outline-none focus:ring"
      placeholder={placeholder}
      {...props}
    />
  );
}
