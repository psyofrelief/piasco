import { FAQS } from "@/lib/data/faqs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/Accordion";

export default function FaqsAccordion() {
  return (
    <Accordion
      type="single"
      collapsible
      className="border-b-outline grid w-full grid-cols-1 flex-col border-b border-dashed"
    >
      {FAQS.map((e, idx) => (
        <AccordionItem value={`Question ${idx}`} key={idx + 1}>
          <AccordionTrigger>
            <p className="flex">
              <span className="mr-sm text-foreground-muted hidden sm:flex">
                {idx + 1}
              </span>
              {e.question}
            </p>
          </AccordionTrigger>
          <AccordionContent>{e.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
