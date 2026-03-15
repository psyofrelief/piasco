import {
  loginUser,
  registerUser,
  requestPasswordReset,
  verifyToken,
} from "@/app/auth/actions";
import { prismaMock } from "../singleton";
import { signIn } from "@/lib/auth";
import { resend } from "@/lib/resend";
import bcrypt from "bcryptjs";
import {
  PasswordResetToken,
  User,
  VerificationToken,
} from "../generated/prisma";

jest.mock("@/lib/auth", () => ({
  signIn: jest.fn(),
}));

jest.mock("@/lib/resend", () => ({
  resend: {
    emails: {
      send: jest
        .fn()
        .mockResolvedValue({ data: { id: "msg_123" }, error: null }),
    },
  },
}));

jest.mock("bcryptjs", () => ({
  hash: jest.fn().mockResolvedValue("hashed_password"),
  compare: jest.fn(),
}));

describe("Auth Actions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("registerUser", () => {
    const validRegistration = {
      email: "new@example.com",
      password: "password123",
      name: "New User",
    };

    it("should throw error if email is already in use", async () => {
      prismaMock.user.findUnique.mockResolvedValue({ id: "1" } as User);

      await expect(registerUser(validRegistration)).rejects.toThrow(
        "Email already in use",
      );
    });

    it("should hash password and create user successfully", async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      const result = await registerUser(validRegistration);

      expect(bcrypt.hash).toHaveBeenCalledWith("password123", 10);
      expect(prismaMock.user.create).toHaveBeenCalledWith({
        data: {
          name: "New User",
          email: "new@example.com",
          password: "hashed_password",
        },
      });
      expect(prismaMock.verificationToken.create).toHaveBeenCalled();
      expect(result.success).toBe("User created");
    });
  });

  describe("loginUser", () => {
    const loginData = { email: "test@example.com", password: "password123" };

    it("should call signIn and send verification email if not verified", async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        email: "test@example.com",
        password: "hashed",
        emailVerified: null,
      } as User);

      const result = await loginUser(loginData);

      expect(signIn).toHaveBeenCalledWith("credentials", {
        email: loginData.email,
        password: loginData.password,
        redirect: false,
      });
      // Verifies sendVerificationEmail was triggered
      expect(prismaMock.verificationToken.create).toHaveBeenCalled();
      expect(result.success).toBe("Logged in");
    });
  });

  describe("requestPasswordReset", () => {
    it("should throw error if a token was requested less than 2 minutes ago", async () => {
      prismaMock.passwordResetToken.findFirst.mockResolvedValue({
        id: "old_token",
      } as PasswordResetToken);

      await expect(requestPasswordReset("test@example.com")).rejects.toThrow(
        "Please wait a few minutes",
      );
    });

    it("should create a token and send email if user exists", async () => {
      prismaMock.passwordResetToken.findFirst.mockResolvedValue(null);
      prismaMock.user.findUnique.mockResolvedValue({ id: "user_1" } as User);

      const result = await requestPasswordReset("test@example.com");

      expect(prismaMock.passwordResetToken.create).toHaveBeenCalled();
      expect(resend.emails.send).toHaveBeenCalledWith(
        expect.objectContaining({
          subject: "Reset your password",
        }),
      );
      expect(result.success).toBe(true);
    });
  });

  describe("verifyToken", () => {
    it("should return success: false for expired tokens", async () => {
      prismaMock.verificationToken.findUnique.mockResolvedValue({
        expires: new Date(Date.now() - 1000), // 1 second ago
      } as VerificationToken);

      const result = await verifyToken("expired_token");
      expect(result.success).toBe(false);
    });

    it("should verify user and delete token if valid", async () => {
      const validToken = {
        email: "verify@example.com",
        token: "valid_uuid",
        expires: new Date(Date.now() + 10000),
      };
      prismaMock.verificationToken.findUnique.mockResolvedValue(
        validToken as VerificationToken,
      );

      const result = await verifyToken("valid_uuid");

      expect(prismaMock.user.update).toHaveBeenCalledWith({
        where: { email: validToken.email },
        data: { emailVerified: expect.any(Date) },
      });
      expect(prismaMock.verificationToken.delete).toHaveBeenCalled();
      expect(result.success).toBe(true);
    });
  });
});
