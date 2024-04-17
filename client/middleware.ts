import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { getComapnyByUserId } from "./lib/api_handler/get_company";
import { NextResponse } from "next/server";

// See https://clerk.com/docs/references/nextjs/auth-middleware
// for more information about configuring your Middleware
export default authMiddleware({
  // Allow signed out users to access the specified routes:
  publicRoutes(req) {
    if (req.nextUrl.pathname === "/") {
      return true;
    }

    if (isPublicRoute(req.nextUrl.pathname)) {
      return true;
    }
    // Explicitly protect the admin dashboard route
    if (req.nextUrl.pathname.startsWith("admin")) {
      return false;
    }
    return false;
  },
  async afterAuth(auth, req, _) {
    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    const company = auth.userId ? await getComapnyByUserId(auth.userId) : null;
    if (
      !auth.isPublicRoute &&
      auth.userId &&
      !company &&
      req.nextUrl.pathname !== "/new"
    ) {
      const creatUsername = new URL("/new", req.url);
      return NextResponse.redirect(creatUsername);
    }
    if (!auth.isPublicRoute && auth.userId && company) {
      const headers = new Headers(req.headers);
      headers.set("company", company.username);
      if (req.nextUrl.pathname !== "/dashboard") {
        const dashboard = new URL("/dashboard", req.url);
        return NextResponse.redirect(dashboard, {
          headers,
        });
      } else {
        return NextResponse.next({
          request: {
            headers,
          },
        });
      }
    }
    console.log("this is public");
    // Allow users visiting public routes to access them
    return NextResponse.next();
  },
});

export const config = {
  matcher: [
    // Exclude files with a "." followed by an extension, which are typically static files.
    // Exclude files in the _next directory, which are Next.js internals.
    "/((?!.+\\.[\\w]+$|_next).*)",
    // Re-include any files in the api or trpc folders that might have an extension
    "/(api|trpc)(.*)",
  ],
};

// Function to check if the path should be public
const isPublicRoute = (path: string) => {
  // Matches only /company_name/deal_name
  const publicPattern = /^\/[^/]+\/[^/]+$/;
  return publicPattern.test(path);
};
