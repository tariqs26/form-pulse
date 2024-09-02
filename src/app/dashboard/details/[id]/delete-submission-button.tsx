"use client"

import { useTransition } from "react"
import type { FormSubmission } from "@prisma/client"
import { Trash2 } from "lucide-react"

import { deleteFormSubmission } from "@/actions/form"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "@/hooks/use-toast"

export const DeleteSubmissionButton = ({
  id,
  formId,
}: Readonly<Pick<FormSubmission, "id" | "formId">>) => {
  const [loading, startTransition] = useTransition()

  const deleteSubmission = async () => {
    const res = await deleteFormSubmission(formId, id)

    if ("error" in res)
      toast({
        title: "Error",
        description: res.error,
        variant: "destructive",
      })
    else toast(res)
  }

  return (
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
  )
}
