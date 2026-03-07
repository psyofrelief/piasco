import { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    emailVerified: Date | null;
    hasPassword: boolean;
  }

  interface Session {
    user: {
      id: string;
      emailVerified: Date | null;
      hasPassword: boolean;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    emailVerified: Date | null;
    hasPassword: boolean;
  }
}
