import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;
  if (token && url.pathname.startsWith("/")) {
    // return NextResponse.redirect(new URL("/list", request.url));
  }
  if (
    !token &&
    (url.pathname.startsWith("/list") ||
      url.pathname.startsWith("/kanban-board"))
  ) {
    // return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/", "/list", "/kanban-board"],
};
