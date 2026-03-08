import ContactForm from "@/components/forms/ContactForm";
import FaqsSection from "@/components/sections/FaqsSection";
import Headline from "@/components/ui/Headline";
import Section from "@/components/ui/Section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
};

export default function Page() {
  return (
    <>
      <Section
        hasBackground
        className="border-outline px-sm lg:px-md min-h-screen-minus-navbar gap-y-xl relative mx-auto flex max-w-250 flex-1 flex-col border border-dashed"
      >
        <header className="gap-y-sm flex flex-col">
          <Headline className="max-w-110">
            Need assistance <br /> with your account?
          </Headline>
          <p className="text-foreground-secondary max-w-110">
            Our support team is available to help you troubleshoot your
            redirects, optimise your branded QR codes, or assist with API
            configuration.
          </p>
        </header>
        <ContactForm />
      </Section>

      <FaqsSection />
    </>
  );
}
