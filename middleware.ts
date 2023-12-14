import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
const PUBLIC_ROUTES = ["/error/403", "/authentication"];

const isPublicRoute = (pathname: string) => {
  return PUBLIC_ROUTES.some((route) => pathname.endsWith(route));
};

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  console.log(token);
  if (!isPublicRoute(req.nextUrl.pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL(`/authentication`, req.url));
    }
  } else {
    if (token) return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}

// export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};
