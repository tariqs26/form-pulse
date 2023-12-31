import Link from "next/link"
import { siteMetadata } from "@/lib/seo"

export function Logo() {
  return (
    <Link
      href="/"
      className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-3xl font-semibold text-transparent"
    >
      {siteMetadata.title}
    </Link>
  )
}
