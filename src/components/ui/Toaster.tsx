"use client";

import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "group toast flex items-center gap-x-sm w-full p-sm " +
            "bg-background border border-dotted border-outline " +
            "shadow-lg",
          title: "text-sm font-medium",
          description: "text-foreground-secondary",
          success: "text-foreground",
          error: "text-red-500",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
