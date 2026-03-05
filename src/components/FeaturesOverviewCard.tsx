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
      <Image height={256} width={512} src={imgSrc} alt="Feature Image" />
      <div className="flex flex-col">
        <p className="font-semibold">{title}</p>
        <p className="leading-tight">{description}</p>
      </div>
    </li>
  );
}
