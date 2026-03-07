"use server";

import { resend } from "@/lib/resend";
import { signOut } from "@/lib/auth";

export async function sendContactMessage(values: {
  name: string;
  email: string;
  message: string;
}) {
  const { name, email, message } = values;

  const { error } = await resend.emails.send({
    from: "Piasco Contact Form <hello@p-s.co>",
    to: "hello@p-s.co",
    replyTo: email,
    subject: `New contact message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  });

  if (error) {
    throw new Error("Failed to send email");
  }

  return { success: true };
}

export async function handleSignOut() {
  await signOut();
}
