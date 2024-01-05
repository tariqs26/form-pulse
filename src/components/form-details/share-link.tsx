"use client"

import { Button } from "../ui/button"
import { useMounted } from "@/hooks/use-mounted"
import { Input } from "../ui/input"
import { Share } from "lucide-react"
import { toast } from "@/hooks/use-toast"

type ShareLinkProps = {
  shareId: string
}

export function ShareLink({ shareId }: ShareLinkProps) {
  const mounted = useMounted()

  if (!mounted) return null

  const shareUrl = `${window.location.origin}/submit/${shareId}`
  return (
    <div className="flex flex-grow items-center gap-4">
      <Input value={shareUrl} readOnly />
      <Button
        className="min-w-44 max-w-full flex-grow"
        onClick={() => {
          navigator.clipboard.writeText(shareUrl)
          toast({
            title: "Copied",
            description: "Link copied to clipboard.",
          })
        }}
      >
        <Share className="mr-2 h-4 w-4" />
        Share Link
      </Button>
    </div>
  )
}
