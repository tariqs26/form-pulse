import Link from "next/link"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export function FormError({
  error,
  reset,
  link = {
    href: "/dashboard",
    text: "Back to dashboard",
  },
}: ErrorProps & {
  link?: {
    href: string
    text: string
  }
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-grow items-center justify-center p-4">
      <div className="flex max-w-lg flex-col items-center gap-6">
        <h2>Error</h2>
        <p className="text-lg text-muted-foreground">{error.message}</p>
        <div className="space-x-4">
          <Button asChild>
            <Link href={link.href}>{link.text}</Link>
          </Button>
          <Button variant="secondary" onClick={reset}>
            Try Again
          </Button>
        </div>
      </div>
    </div>
  )
}
