interface Props {
  value: string | number;
  label: string;
}

export default function StatCard({ value, label }: Props) {
  return (
    <li className="py-lg px-md border-r-outline bg-popover flex min-h-70 flex-col justify-between border-r border-dashed">
      <div className="bg-accent size-lg" />
      <div className="gap-y-xs flex flex-col">
        <p className="text-3xl leading-none font-semibold">{value}</p>
        <p className="text-md leading-none">{label}</p>
      </div>
    </li>
  );
}
