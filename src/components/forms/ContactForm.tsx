"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import TextArea from "@/components/ui/TextArea";
import FormMessage from "@/components/ui/FormMessage";
import { useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.email({ message: "Enter a valid email" }),
  message: z
    .string()
    .min(10, { message: "Message must be more than 10 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_MAIL_ACCESS_TOKEN,
          ...values,
        }),
      });

      const result = await response.json();
      if (result.success) {
        toast.success("Message sent successfully!");
        reset();
      }
    } catch (error) {
      console.error("Submission error", error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="gap-y-md flex w-full flex-col items-end"
    >
      {/* Email and Name Fields */}
      <div className="gap-sm flex w-full items-center">
        <div className="gap-y-xs flex w-full flex-col">
          <Label htmlFor="firstname">Name</Label>
          <Input
            id="firstname"
            placeholder="John Appleseed"
            {...register("name")}
          />
          {errors.name && <FormMessage>{errors.name.message}</FormMessage>}
        </div>

        <div className="gap-y-xs flex w-full flex-col">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="example@gmail.com"
            {...register("email")}
          />
          {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
        </div>
      </div>
      {/* Message Field */}
      <div className="gap-y-xs flex w-full flex-col">
        <Label htmlFor="message">Message</Label>
        <TextArea
          id="message"
          placeholder="Add your message"
          {...register("message")}
        />
        {errors.message && <FormMessage>{errors.message.message}</FormMessage>}
      </div>

      <Button isLoading={isSubmitting} type="submit" className="mt-auto">
        Send Message
      </Button>
    </form>
  );
}
