import Link from "next/link";
import Heading from "../ui/Heading";
import Headline from "../ui/Headline";
import Section from "../ui/Section";
import Button from "../ui/Button";
import Image from "next/image";

export default function HeroSection() {
  return (
    <Section className="border-outline gap-y-xl relative mx-auto flex min-h-150 max-w-250 flex-col items-center justify-center overflow-hidden border border-dashed text-center">
      <div className="pointer-events-none absolute inset-0 -z-1 flex items-end justify-center">
        <Image
          src="/images/gradient.webp"
          alt="gradient background"
          width={1000}
          height={1000}
          className="h-150 w-full object-bottom"
          priority
        />
      </div>

      <div className="gap-y-sm flex flex-col items-center justify-center">
        <Heading label="More than 1000 links shortened" />
        <Headline>Link Management, Refined.</Headline>
        <p className="max-w-100">
          Generate trackable short links and custom QR codes in seconds. Built
          for speed, designed for precision.
        </p>
      </div>

      <div className="gap-y-sm flex flex-col items-center">
        <Link href={"/auth/register"} className="flex size-fit">
          <Button className="flex-1">Get Started</Button>
        </Link>
        <p className="text-foreground-secondary">No credit card required</p>
      </div>
    </Section>
  );
}
