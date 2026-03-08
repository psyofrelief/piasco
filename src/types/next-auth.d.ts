import { DefaultSession } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    hasPassword?: boolean;
    emailVerified?: Date | null;
  }

  interface Session {
    user: {
      id: string;
      hasPassword: boolean;
      emailVerified: Date | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    hasPassword?: boolean;
    emailVerified?: Date | null;
  }
}
