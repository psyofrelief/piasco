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

const EMAIL_FROM = "Piasco <hello@p-s.co>";

export async function loginUser(values: LoginValues) {
  const validatedFields = loginSchema.safeParse(values);
  if (!validatedFields.success) throw new Error("Invalid fields");

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", { email, password, redirect: false });

    const user = await prisma.user.findUnique({ where: { email } });

    if (user && user.password && !user.emailVerified) {
      await sendVerificationEmail(email);
    }

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
  if (!validatedFields.success) throw new Error("Invalid fields");

  const { email, password, name } = validatedFields.data;
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) throw new Error("Email already in use");

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  await sendVerificationEmail(email);

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
    from: EMAIL_FROM,
    to: email,
    subject: "Reset your password",
    text: `Click this link to reset your password: ${link}`,
  });

  if (error) {
    throw new Error("Failed to send reset email");
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

export async function sendVerificationEmail(email: string) {
  const token = crypto.randomUUID();
  const expires = new Date(Date.now() + 3600 * 1000);

  await prisma.verificationToken.deleteMany({ where: { email } });

  await prisma.verificationToken.create({
    data: { email, token, expires },
  });

  const verifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify?token=${token}`;

  const { error } = await resend.emails.send({
    from: EMAIL_FROM,
    to: email,
    subject: "Verify your email",
    text: `Welcome to Piasco! Please verify your email by clicking here: ${verifyUrl}`,
  });

  if (error) {
    throw new Error("Failed to send verification email");
  }

  return { success: true };
}

export async function verifyToken(token: string) {
  const verificationToken = await prisma.verificationToken.findUnique({
    where: { token },
  });

  if (!verificationToken || verificationToken.expires < new Date()) {
    return { success: false };
  }

  await prisma.user.update({
    where: { email: verificationToken.email },
    data: { emailVerified: new Date() },
  });

  await prisma.verificationToken.delete({
    where: { token },
  });

  return { success: true };
}
