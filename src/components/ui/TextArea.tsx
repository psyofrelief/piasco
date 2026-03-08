interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  type?: string;
  placeholder: string;
}

export default function TextArea({ placeholder, ...props }: Props) {
  return (
    <textarea
      className="bg-background border-foreground ring-accent-muted p-sm placeholder:text-foreground-secondary min-h-50 w-full resize-none rounded border border-dotted outline-none focus:ring sm:min-h-80"
      placeholder={placeholder}
      {...props}
    />
  );
}
