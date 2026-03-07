interface Props {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
}

export default function StatCard({ value, label, icon }: Props) {
  return (
    <li className="sm:py-lg py-md sm:px-md px-sm border-r-outline bg-popover flex min-h-65 min-w-80 flex-col justify-between border-r border-dashed lg:min-w-fit">
      <div className="flex items-center">
        {icon ? (
          <div className="text-accent size-lg flex items-center justify-center">
            {icon}
          </div>
        ) : (
          <div className="bg-accent size-lg" />
        )}
      </div>

      <div className="gap-y-xs sm:gap-y-sm flex flex-col pt-4">
        <p className="font-display text-3xl leading-none font-semibold">
          {value}
        </p>
        <p className="sm:text-md leading-none">{label}</p>
      </div>
    </li>
  );
}
