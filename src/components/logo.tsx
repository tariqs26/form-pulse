import Link from "next/link"
import { siteMetadata } from "@/lib/seo"

export const Logo = () => (
  <Link href="/" className="text-2xl font-semibold text-primary">
    {siteMetadata.title}
  </Link>
)
