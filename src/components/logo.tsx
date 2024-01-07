import Link from "next/link"
import { siteMetadata } from "@/lib/seo"

export function Logo() {
  return (
    <Link href="/" className="text-2xl font-semibold text-primary">
      {siteMetadata.title}
    </Link>
  )
}
