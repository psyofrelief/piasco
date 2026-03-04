interface Props {
  label: string;
}

export default function Heading({ label }: Props) {
  return (
    <h1 className="text-accent-muted font-mono text-xs whitespace-nowrap uppercase">
      {label}
    </h1>
  );
}
