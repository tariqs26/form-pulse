"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import { useMounted } from "@/hooks/use-mounted"

type VisitButtonProps = {
  shareId: string
}

export function VisitButton({ shareId }: VisitButtonProps) {
  const mounted = useMounted()

  if (!mounted) return null

  const shareUrl = `${window.location.origin}/submit/${shareId}`
  return (
    <Button asChild className="w-44">
      <Link href={shareUrl} target="_blank" rel="noopener noreferrer">
        Visit
      </Link>
    </Button>
  )
}
