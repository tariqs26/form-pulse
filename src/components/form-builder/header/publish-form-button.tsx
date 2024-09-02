import { useTransition } from "react"
import { ArrowUpToLine } from "lucide-react"
import type { Form } from "@prisma/client"

import { updateFormStatus } from "@/actions/form"
import { toast } from "@/hooks/use-toast"
import { type FormElementInstance, inputFields } from "@/types/form-builder"

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

export const PublishFormButton = ({
  id,
  content,
}: Readonly<Pick<Form, "id" | "content">>) => {
  const [loading, startTransition] = useTransition()

  const hasInput = (content as FormElementInstance[]).some((element) =>
    inputFields.some((field) => field === element.type)
  )

  const publish = async () => {
    const res = !hasInput
      ? { error: "Form must have at least one input field to be published" }
      : await updateFormStatus(id, "PUBLISHED")

    if ("error" in res)
      toast({
        title: "Error",
        description: res.error,
        variant: "destructive",
      })
    else toast(res)
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
            {loading && <Spinner className="mr-2" />}
            Publish
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
