import Image from "next/image";

interface Props {
  title: string;
  description: string;
  imgSrc: string;
}

export default function FeaturesOverviewCard({
  title,
  description,
  imgSrc,
}: Props) {
  return (
    <li className="gap-y-xs flex flex-col">
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          priority
          loading="eager"
          fill
          className="object-cover"
          src={imgSrc}
          alt={title}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-col">
        <p className="font-semibold">{title}</p>
        <p className="text-xs leading-tight sm:text-sm">{description}</p>
      </div>
    </li>
  );
}
