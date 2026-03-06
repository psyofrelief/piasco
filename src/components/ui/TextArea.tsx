interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  type?: string;
  placeholder: string;
}

export default function TextArea({ placeholder, ...props }: Props) {
  return (
    <textarea
      className="bg-background border-outline ring-accent-muted p-sm placeholder:text-foreground-secondary min-h-80 w-full border border-dashed outline-none focus:ring"
      placeholder={placeholder}
      {...props}
    />
  );
}
