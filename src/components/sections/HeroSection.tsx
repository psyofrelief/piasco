import Link from "next/link";
import Headline from "../ui/Headline";
import Section from "../ui/Section";
import Button from "../ui/Button";
import FadeUp from "../ui/FadeUp";
import LogoIcon from "../logo/LogoIcon";

export default function HeroSection() {
  return (
    <Section
      hasBackground
      className="border-outline gap-y-xl mx-auto flex min-h-150 flex-col items-center justify-center border-y border-dashed text-center sm:max-w-250 sm:border"
    >
      <FadeUp
        as={"header"}
        className="gap-y-sm flex flex-col items-center justify-center"
      >
        <LogoIcon />
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
    </Section>
  );
}
