interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  placeholder: string;
}

export default function Input({ type = "text", placeholder, ...props }: Props) {
  return (
    <input
      type={type}
      className="bg-background border-foreground ring-accent-muted px-sm py-xs placeholder:text-foreground-secondary w-full rounded border border-dotted outline-none focus:ring"
      placeholder={placeholder}
      {...props}
    />
  );
}
