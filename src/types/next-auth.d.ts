import { DefaultSession } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    hasPassword?: boolean;
  }

  interface Session {
    user: {
      id: string;
      hasPassword: boolean;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    hasPassword?: boolean;
  }
}
