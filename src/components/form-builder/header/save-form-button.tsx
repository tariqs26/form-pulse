import { useTransition } from "react"
import { Save } from "lucide-react"

import { updateFormContent } from "@/actions/form"
import { useDesigner } from "@/hooks/use-designer"
import { toast } from "@/hooks/use-toast"

import { Button } from "../../ui/button"
import { Spinner } from "../../ui/spinner"

export const SaveFormButton = ({ formId }: Readonly<{ formId: number }>) => {
  const { elements } = useDesigner()
  const [loading, startTransition] = useTransition()

  const updateForm = async () => {
    const res = await updateFormContent(formId, elements)
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
      variant="outline"
      className="gap-2"
      disabled={loading}
      onClick={() => {
        startTransition(updateForm)
      }}
    >
      <Save className="h-4 w-4" />
      Save
      {loading && <Spinner />}
    </Button>
  )
}
