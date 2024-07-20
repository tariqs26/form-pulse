import Link from "next/link"
import { siteMetadata } from "@/lib/seo"

export const Logo = () => (
  <Link href="/" className="text-xl font-bold text-primary md:text-2xl">
    {siteMetadata.title}.
  </Link>
)
