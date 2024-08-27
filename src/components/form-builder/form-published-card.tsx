import Link from "next/link"
import Confetti from "react-confetti"
import { MoveLeft, MoveRight } from "lucide-react"

import { toast } from "@/hooks/use-toast"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

type FormPublishedCardProps = Readonly<{
  shareUrl: string
  formId: number
}>

export const FormPublishedCard = ({
  shareUrl,
  formId,
}: FormPublishedCardProps) => (
  <>
    <Confetti
      width={window.innerWidth}
      height={window.innerHeight}
      numberOfPieces={250}
      recycle={false}
    />
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="max-w-md">
        <h1 className="mb-10 border-b pb-2 text-center text-3xl text-primary">
          ✨✨ Form Published ✨✨
        </h1>
        <h2 className="text-2xl">Share this form</h2>
        <h3 className="border-b pb-10 text-xl font-medium text-muted-foreground">
          Anyone with the link can view and submit the form
        </h3>
        <div className="my-4 flex w-full flex-col items-center gap-2 border-b pb-4">
          <Input readOnly value={shareUrl} className="w-full" />
          <Button
            className="mt-2 w-full"
            onClick={() => {
              navigator.clipboard.writeText(shareUrl)
              toast({
                title: "Success",
                description: "Link copied to clipboard",
              })
            }}
          >
            Copy Link
          </Button>
        </div>
        <div className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/dashboard" className="gap-2">
              <MoveLeft /> Back to Dashboard
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/dashboard/details/${formId}`} className="gap-2">
              Form Details <MoveRight />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  </>
)
