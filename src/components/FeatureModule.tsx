import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import Headline from "./ui/Headline";
import FadeUp from "./ui/FadeUp";

interface Props {
  title: string;
  description: string;
  imgSrc: string;
  imgAlt: string;
  hasCta?: boolean;
  isReversed?: boolean;
}

export default function FeatureModule({
  title,
  description,
  imgSrc,
  imgAlt,
  hasCta = false,
  isReversed = false,
}: Props) {
  return (
    <li className="gap-x-xl gap-y-sm grid grid-cols-1 items-center sm:grid-cols-2">
      {/* Image Container */}
      <div
        className={cn(
          "bg-popover relative aspect-square w-full overflow-hidden",
          isReversed ? "md:order-last" : "md:order-first",
        )}
      >
        <Image src={imgSrc} alt={imgAlt} fill className="object-cover" />
      </div>

      {/* Content Container */}
      <div className="gap-y-md flex flex-col">
        <FadeUp as={"header"} className="gap-y-xs flex flex-col">
          <Headline>{title}</Headline>
          <p className="text-foreground-secondary leading-tight">
            {description}
          </p>
        </FadeUp>

        {hasCta && (
          <Link href="/auth/register" className="flex size-fit">
            <Button className="flex-1">Get Started</Button>
          </Link>
        )}
      </div>
    </li>
  );
}
