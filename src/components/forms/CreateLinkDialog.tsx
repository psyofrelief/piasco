"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import Label from "@/components/ui/Label";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import FormMessage from "@/components/ui/FormMessage";
import { upsertLink } from "@/app/dashboard/actions";
import { cn } from "@/lib/utils";

interface CreateLinkDialogProps {
  label?: string;
  className?: string;
}

const linkSchema = z.object({
  destination: z.url("Please enter a valid URL"),
  slug: z
    .string()
    .max(20)
    .regex(/^[a-zA-Z0-9-]*$/, "Only letters, numbers, and dashes")
    .optional()
    .or(z.literal("")),
});

type LinkValues = z.infer<typeof linkSchema>;

export default function CreateLinkDialog({
  label = "Shorten URL",
  className,
}: CreateLinkDialogProps) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LinkValues>({
    resolver: zodResolver(linkSchema),
  });

  const onSubmit: SubmitHandler<LinkValues> = async (data) => {
    try {
      await upsertLink({
        destination: data.destination,
        slug: data.slug,
      });

      toast.success("Link saved successfully!");
      reset();
      setOpen(false);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to save link",
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={cn("w-full sm:w-fit", className)}>{label}</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Link</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="gap-y-lg flex flex-col pt-4"
        >
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="destination">Destination URL</Label>
            <Input
              {...register("destination")}
              id="destination"
              placeholder="https://example.com/very-long-url"
            />
            {errors.destination && (
              <FormMessage>{errors.destination.message}</FormMessage>
            )}
          </div>

          <div className="flex flex-col gap-y-2">
            <Label htmlFor="slug">Short Slug</Label>
            <label
              htmlFor="slug"
              className="bg-background border-outline ring-accent-muted p-sm flex w-full cursor-text items-center gap-x-0 border border-dashed transition-all focus-within:ring"
            >
              <span className="text-foreground-secondary text-sm whitespace-nowrap select-none">
                {process.env.NEXT_PUBLIC_BASE_URL || "p-s.co"}/
              </span>

              <input
                {...register("slug")}
                id="slug"
                type="text"
                placeholder="my-cool-link"
                className="placeholder:text-foreground-secondary flex-1 border-none bg-transparent p-0 text-sm outline-none"
              />
            </label>
            {errors.slug && <FormMessage>{errors.slug.message}</FormMessage>}
          </div>

          <div className="gap-x-xs flex w-full">
            <Button
              variant="outline"
              type="button"
              onClick={() => setOpen(false)}
              className="w-full"
            >
              Cancel
            </Button>
            <Button type="submit" className="w-full" isLoading={isSubmitting}>
              Create Link
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
