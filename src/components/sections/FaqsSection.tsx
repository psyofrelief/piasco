"use client";
import Headline from "../ui/Headline";
import Section from "../ui/Section";
import Heading from "../ui/Heading";
import { usePathname } from "next/navigation";
import FaqsAccordion from "../FaqsAccordion";
import Link from "next/link";

export default function FaqsSection() {
  const pathname = usePathname();

  return (
    <Section
      id="faqs"
      className="px-sm gap-y-lg mx-auto grid max-w-250 grid-cols-1 sm:grid-cols-2 lg:px-0"
    >
      <div className="gap-y-sm flex flex-col justify-between">
        <header className="gap-y-xs flex flex-col">
          <Heading label="Frequently Asked Questions" />
          <Headline>Essential Answers.</Headline>
        </header>
        {pathname !== "/contact" && (
          <p>
            Got another question?{" "}
            <span className="underline transition-all hover:underline-offset-4">
              <Link href={"/contact"}>Contact Us</Link>
            </span>
          </p>
        )}
      </div>
      <FaqsAccordion />
    </Section>
  );
}
