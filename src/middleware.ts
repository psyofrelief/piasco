import NextAuth from "next-auth";
import { authConfig } from "./lib/auth.config";
import { rateLimit } from "./lib/rateLimit";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const { method } = req;

  if (
    (pathname.startsWith("/auth") || pathname.startsWith("/api")) &&
    method === "POST"
  ) {
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : "127.0.0.1";

    const isAllowed = rateLimit(ip);
    if (!isAllowed) {
      return new Response("Too many requests", { status: 429 });
    }
  }

  const isLoggedIn = !!req.auth;
  const isVerified = !!req.auth?.user?.emailVerified;
  const isOAuthUser = !req.auth?.user?.hasPassword;

  const isCleared = isVerified || isOAuthUser;
  if (pathname.startsWith("/dashboard")) {
    if (!isLoggedIn) {
      return Response.redirect(new URL("/auth/login", req.nextUrl));
    }

    const isVerifyPage = pathname === "/auth/verify";
    if (!isCleared && !isVerifyPage) {
      return Response.redirect(new URL("/auth/verify", req.nextUrl));
    }
  }

  if (pathname.startsWith("/auth") && isLoggedIn) {
    if (isCleared) {
      return Response.redirect(new URL("/dashboard", req.nextUrl));
    }
  }
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/auth/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
