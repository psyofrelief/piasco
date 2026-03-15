import type { NextAuthConfig, User } from "next-auth";

interface ExtendedUser extends User {
  hasPassword?: boolean;
  emailVerified?: Date | null;
}

export const authConfig = {
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      const u = user as ExtendedUser;
      if (u) {
        token.id = u.id;
        token.emailVerified = u.emailVerified;
        token.hasPassword = u.hasPassword;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        const sUser = session.user as ExtendedUser;
        sUser.hasPassword = token.hasPassword as boolean;
        sUser.emailVerified = token.emailVerified as Date | null;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
