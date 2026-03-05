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
