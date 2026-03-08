import Link from "next/link";
import Heading from "../ui/Heading";
import Headline from "../ui/Headline";
import Section from "../ui/Section";
import Button from "../ui/Button";
import GradientImage from "../ui/GradientImage";
import FadeUp from "../ui/FadeUp";

export default function HeroSection() {
  return (
    <Section className="border-outline gap-y-xl relative mx-auto flex min-h-150 flex-col items-center justify-center overflow-hidden border-y border-dashed text-center sm:max-w-250 sm:border">
      <FadeUp
        as={"header"}
        className="gap-y-sm flex flex-col items-center justify-center"
      >
        <Heading label="More than 1000 links shortened" />
        <div className="gap-y-xs flex flex-col items-center">
          <Headline>Link Management, Refined.</Headline>
          <p className="max-w-100">
            Generate trackable short links and custom QR codes in seconds. Built
            for speed, designed for precision.
          </p>
        </div>
      </FadeUp>

      <div className="gap-y-sm flex flex-col items-center">
        <Link href={"/auth/register"} className="flex size-fit">
          <Button className="flex-1">Get Started</Button>
        </Link>
        <p className="text-foreground-secondary">No credit card required</p>
      </div>
      <GradientImage />
    </Section>
  );
}
