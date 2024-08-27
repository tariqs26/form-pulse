import { cn } from "@/lib/utils"

export const Spinner = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "inline-block h-4 w-4 animate-spin rounded-full border-2 border-foreground border-t-transparent",
      className
    )}
    role="status"
    aria-label="loading"
  >
    <span className="sr-only">Loading...</span>
  </div>
)
