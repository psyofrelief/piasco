interface Props {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
}

export default function StatCard({ value, label, icon }: Props) {
  return (
    <li className="py-lg px-md border-r-outline bg-popover flex min-h-65 flex-col justify-between border-r border-dashed">
      <div className="flex items-center">
        {icon ? (
          <div className="text-accent size-lg flex items-center justify-center">
            {icon}
          </div>
        ) : (
          <div className="bg-accent size-lg" />
        )}
      </div>

      <div className="gap-y-xs flex flex-col pt-4">
        <p className="text-3xl leading-none font-semibold">{value}</p>
        <p className="text-md leading-none">{label}</p>
      </div>
    </li>
  );
}
