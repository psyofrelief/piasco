"use client";

import type * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";
import ChevronDownIcon from "../icons/ChevronDownIcon";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> & {}) => (
  <AccordionPrimitive.Item className={cn("", className)} {...props} />
);
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = ({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {}) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      className={cn(
        "bg-popover p-sm data-[state=open]:border-b-outline! data-[state=open]:bg-popover/70 hover:stroke-accent border-outline data-[state=closed]:hover:text-accent-muted flex flex-1 cursor-pointer items-center justify-between border border-dashed border-b-transparent! text-left text-xs transition-all data-[state=closed]:font-normal data-[state=open]:border-b! data-[state=open]:border-dashed! sm:text-sm [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = ({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> & {}) => (
  <AccordionPrimitive.Content
    className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-xs sm:text-sm"
    {...props}
  >
    <div className={cn("py-xs px-sm", className)}>{children}</div>
  </AccordionPrimitive.Content>
);
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
