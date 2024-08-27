import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { ArrowUpToLine } from "lucide-react"

import { publishForm } from "@/actions/form"
import { toast } from "@/hooks/use-toast"
import { catchAsync } from "@/lib/utils"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../ui/alert-dialog"
import { Button } from "../../ui/button"
import { Spinner } from "../../ui/spinner"

export const PublishFormButton = ({ formId }: Readonly<{ formId: number }>) => {
  const [loading, startTransition] = useTransition()
  const router = useRouter()

  const publish = async () => {
    const res = await catchAsync(publishForm(formId))

    if ("error" in res)
      toast({
        title: "Error",
        description: res.error,
        variant: "destructive",
      })
    else {
      toast({
        title: "Success",
        description: "Form published successfully",
      })
    }
    router.refresh()
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="logo-gradient gap-2 text-white hover:bg-gradient-to-l">
          <ArrowUpToLine className="h-4 w-4" />
          Publish
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Publish Form</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. After publishing you will not be able
            to edit this form.
            <br />
            <br />
            <span className="font-medium">
              By publishing this form you will make it available to the public
              and will be able to collect submissions.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault()
              startTransition(publish)
            }}
          >
            Publish{" "}
            {loading && (
              <Spinner className="ml-2 border-primary-foreground border-t-transparent" />
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
