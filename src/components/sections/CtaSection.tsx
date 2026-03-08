import Headline from "../ui/Headline";
import Section from "../ui/Section";
import Link from "next/link";
import Button from "../ui/Button";
import FadeUp from "../ui/FadeUp";

export default function CtaSection() {
  return (
    <Section
      hasBackground
      className="border-outline gap-y-lg relative mx-auto flex min-h-120 max-w-250 flex-col items-center justify-center border border-dashed border-b-transparent! sm:min-h-150"
    >
      <FadeUp
        as={"header"}
        className="gap-y-sm flex flex-col items-center text-center"
      >
        <Headline className="max-w-90 sm:max-w-120">
          Build digital touchpoints that never break
        </Headline>
        <p className="text-foreground-secondary max-w-90 sm:max-w-120">
          Sign up today to manage your dynamic QR codes and personalised slugs
          within a high performance engine designed for growth
        </p>
      </FadeUp>

      <div className="gap-x-xs flex items-center">
        <Link href={"/auth/register"} className="flex size-fit">
          <Button className="flex-1">Get Started</Button>
        </Link>
        <Link href={"/contact"} className="flex size-fit">
          <Button variant="outline" className="flex-1">
            Contact Us
          </Button>
        </Link>
      </div>
    </Section>
  );
}
