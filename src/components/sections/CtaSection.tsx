import Headline from "../ui/Headline";
import Section from "../ui/Section";
import Link from "next/link";
import Button from "../ui/Button";
import Image from "next/image";

export default function CtaSection() {
  return (
    <Section className="border-outline gap-y-lg relative mx-auto flex min-h-150 max-w-250 flex-col items-center justify-center border border-dashed border-b-transparent!">
      <header className="gap-y-sm flex flex-col items-center text-center">
        <Headline className="max-w-68 sm:max-w-120">
          Build digital touchpoints that never break
        </Headline>
        <p className="text-foreground-secondary max-w-120">
          Sign up today to manage your dynamic QR codes and personalised slugs
          within a high performance engine designed for growth
        </p>
      </header>

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
      <div className="pointer-events-none absolute inset-0 -z-1 flex items-end justify-center">
        <Image
          src="/images/gradient.webp"
          alt="gradient image"
          width={1000}
          height={1000}
          className="h-150 w-full object-bottom"
          priority
        />
      </div>
    </Section>
  );
}
