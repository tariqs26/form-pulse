import Link from "next/link"
import { Button } from "./ui/button"

type FormErrorProps = Readonly<
  ErrorProps & {
    link?: {
      href: string
      text: string
    }
  }
>

export const FormError = ({
  error,
  reset,
  link = {
    href: "/dashboard",
    text: "Back to dashboard",
  },
}: FormErrorProps) => (
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
