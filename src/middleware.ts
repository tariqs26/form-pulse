import { authMiddleware } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export default authMiddleware({
  publicRoutes: ["/", "/submit"],
  afterAuth(auth, req, _) {
    if (auth.userId === null && req.nextUrl.pathname.startsWith("/dashboard")) {
      const url = new URL("/sign-in", req.url)
      url.searchParams.set("redirect_url", req.nextUrl.pathname)
      return NextResponse.redirect(url)
    }
    return NextResponse.next()
  },
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
}
