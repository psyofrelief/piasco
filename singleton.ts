import { TextEncoder, TextDecoder } from "util";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";
import { PrismaClient } from "./generated/prisma/client";
import { prisma } from "@/lib/prisma";

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
  revalidateTag: jest.fn(),
}));

jest.mock(
  "@auth/prisma-adapter",
  () => ({
    __esModule: true,
    PrismaAdapter: jest.fn(() => ({})),
  }),
  { virtual: true },
);

jest.mock(
  "next-auth",
  () => ({
    __esModule: true,
    default: jest.fn(() => ({
      handlers: { GET: jest.fn(), POST: jest.fn() },
      auth: jest.fn(),
      signIn: jest.fn(),
      signOut: jest.fn(),
    })),
  }),
  { virtual: true },
);

jest.mock("next-auth/providers/google", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("next-auth/providers/credentials", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/lib/prisma", () => ({
  __esModule: true,
  prisma: mockDeep<PrismaClient>(),
}));

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

// Reset before each test
beforeEach(() => {
  if (!prismaMock) {
    throw new Error(
      "prismaMock is undefined. Check your @/lib/prisma mock factory.",
    );
  }
  mockReset(prismaMock);
});
