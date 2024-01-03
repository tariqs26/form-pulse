"use client"

import Link from "next/link"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-grow flex-col items-center justify-center gap-6">
      <h2>Error</h2>
      <p className="text-lg text-muted-foreground">{error.message}</p>
      <div className="space-x-4">
        <Button asChild>
          <Link href="/dashboard">Back to dashboard</Link>
        </Button>
        <Button variant="secondary" onClick={reset}>
          Try Again
        </Button>
      </div>
    </div>
  )
}
