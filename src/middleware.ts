import NextAuth from "next-auth";
import { authConfig } from "./lib/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;
  const isVerified = !!req.auth?.user?.emailVerified;

  if (pathname.startsWith("/dashboard")) {
    if (!isLoggedIn) {
      return Response.redirect(new URL("/auth/login", req.nextUrl));
    }

    const isVerifyPage = pathname === "/auth/verify";
    if (!isVerified && !isVerifyPage) {
      return Response.redirect(new URL("/auth/verify", req.nextUrl));
    }
  }

  if (pathname.startsWith("/auth") && isLoggedIn) {
    if (isVerified) {
      return Response.redirect(new URL("/dashboard", req.nextUrl));
    }
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
