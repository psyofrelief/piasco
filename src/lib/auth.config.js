export const authConfig = {
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.emailVerified = user.emailVerified;
        token.hasPassword = user.hasPassword;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.hasPassword = token.hasPassword;
        session.user.emailVerified = token.emailVerified;
      }
      return session;
    },
  },
};
