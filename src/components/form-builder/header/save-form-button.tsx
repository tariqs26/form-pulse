import { useTransition } from "react"
import { useDesigner } from "@/hooks/use-designer"
import { toast } from "@/hooks/use-toast"
import { catchAsync } from "@/lib/utils"
import { updateFormContent } from "@/actions/form"
import { Button } from "../../ui/button"
import { Save } from "lucide-react"
import { Spinner } from "../../ui/spinner"

export const SaveFormButton = ({ formId }: { formId: number }) => {
  const { elements } = useDesigner()
  const [loading, startTransition] = useTransition()

  const updateForm = async () => {
    const res = await catchAsync(updateFormContent(formId, elements))
    if ("error" in res)
      toast({
        title: "Error",
        description: res.error,
        variant: "destructive",
      })
    else
      toast({
        title: "Success",
        description: "Form saved successfully",
      })
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
