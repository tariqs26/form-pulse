"use client"

import { Trash2 } from "lucide-react"
import { useTransition } from "react"

import { deleteFormSubmission } from "@/actions/form"
import type {
  FormElementInstance,
  UserFormSubmission,
} from "@/types/form-builder"

import { toast } from "@/hooks/use-toast"
import { FormPreviewDialog } from "../form-preview-dialog"
import { Button } from "../ui/button"
import { Spinner } from "../ui/spinner"

export type RowActionProps = Readonly<{
  elements: FormElementInstance[]
  submission: UserFormSubmission
}>

export const RowActions = ({ elements, submission }: RowActionProps) => {
  const [loading, startTransition] = useTransition()

  const deleteSubmission = async () => {
    const res = await deleteFormSubmission(submission.formId, submission.id)

    if ("error" in res)
      toast({ title: "Error", description: res.error, variant: "destructive" })
    else toast(res)
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <FormPreviewDialog elements={elements} submission={submission} />
      <Button
        size="icon"
        variant="destructive"
        className="size-8"
        disabled={loading}
        onClick={() => {
          startTransition(deleteSubmission)
        }}
      >
        {loading ? <Spinner className="size-5" /> : <Trash2 size={20} />}
      </Button>
    </div>
  )
}
