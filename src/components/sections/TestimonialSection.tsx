import Image from "next/image";
import Headline from "../ui/Headline";
import Section from "../ui/Section";

export default function TestimonialSection() {
  return (
    <div
      data-theme="dark"
      className="bg-background text-foreground flex w-full justify-center"
    >
      <Section className="gap-x-xl px-sm border-x-outline gap-y-md flex w-full max-w-250 flex-col items-center border-x border-dashed md:flex-row">
        <Image
          src={"/images/testimonial.webp"}
          alt="testimonial profile image"
          height={512}
          width={512}
          className="w-full md:w-fit"
        />
        <header className="gap-y-sm flex flex-col">
          <Headline className="text-lg leading-[1.1em] sm:max-w-200 sm:text-xl">
            We treat our links as part of our branding, not just a utility.
            Managing redirects at this scale while maintaining custom slugs is
            finally seamless.
          </Headline>
          <p className="text-foreground-secondary font-mono uppercase">
            Mona Lisa, Head of Product & Design, Vakanda
          </p>
        </header>
      </Section>
    </div>
  );
}
