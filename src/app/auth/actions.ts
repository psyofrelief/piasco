"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import {
  registerSchema,
  RegisterValues,
  loginSchema,
  LoginValues,
} from "@/lib/data/schemas/authSchema";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import { randomBytes, createHash } from "crypto";
import { resend } from "@/lib/resend";

export async function loginUser(values: LoginValues) {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    throw new Error("Invalid fields");
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { success: "Logged in" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          throw new Error("Invalid credentials.");
        default:
          throw new Error("Something went wrong.");
      }
    }
    throw error;
  }
}

export async function registerUser(values: RegisterValues) {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    throw new Error("Invalid fields");
  }

  const { email, password, name } = validatedFields.data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Email already in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return { success: "User created" };
}

export async function requestPasswordReset(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return { success: true };

  const token = randomBytes(32).toString("hex");
  const hashedToken = createHash("sha256").update(token).digest("hex");
  const expires = new Date(Date.now() + 3600000);

  await prisma.passwordResetToken.create({
    data: { email, token: hashedToken, expires },
  });

  const link = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset?token=${token}&email=${encodeURIComponent(email)}`;

  const { error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    text: `Click this link to reset your password: ${link}`,
  });
  if (error) {
    console.error("Resend Error:", error);
    throw new Error("Failed to send email");
  }

  return { success: true };
}

export async function resetPasswordAction({ email, token, password }: any) {
  const hashedToken = createHash("sha256").update(token).digest("hex");

  const resetEntry = await prisma.passwordResetToken.findUnique({
    where: { token: hashedToken },
  });

  if (
    !resetEntry ||
    resetEntry.expires < new Date() ||
    resetEntry.email !== email
  ) {
    throw new Error("Invalid or expired token");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { email },
    data: { password: hashedPassword },
  });

  await prisma.passwordResetToken.delete({ where: { token: hashedToken } });
}
