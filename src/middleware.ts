import { authMiddleware } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export default authMiddleware({
  publicRoutes: ["/", "/submit"],
  afterAuth(auth, req, _) {
    // Redirect to dashboard if user is signed in

    const isAuthRoute =
      req.nextUrl.pathname.startsWith("/sign-in") ||
      req.nextUrl.pathname.startsWith("/sign-up")

    if (auth.userId !== null && isAuthRoute) {
      const url = new URL("/dashboard", req.url)
      return NextResponse.redirect(url)
    }

    const isProtectedRoute = req.nextUrl.pathname.startsWith("/dashboard")

    if (auth.userId === null && isProtectedRoute) {
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
