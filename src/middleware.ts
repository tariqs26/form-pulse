import { authMiddleware } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export default authMiddleware({
  publicRoutes: ["/"],
  afterAuth(auth, req, _) {
    // redirect from landing page to dashboard when logged in
    if (auth.userId && req.nextUrl.pathname === "/") {
      const url = new URL("/dashboard", req.url)
      return NextResponse.redirect(url)
    }
    return NextResponse.next()
  },
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
}
