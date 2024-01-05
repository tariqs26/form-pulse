import { useDesigner } from "@/hooks/use-designer"
import { Button } from "../../ui/button"
import { ScanEye } from "lucide-react"
import { Dialog, DialogTrigger, DialogContent } from "../../ui/dialog"
import { formElements } from "@/types/form-builder"
import { FormPreviewContainer } from "@/components/form-preview-container"

export function PreviewDialogButton() {
  const { elements } = useDesigner()
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <ScanEye className="h-4 w-4" />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-full max-h-screen max-w-full flex-grow flex-col gap-0 p-0">
        <header className="border-b px-4 py-2">
          <p className="text-lg font-bold">Form Preview</p>
          <p className="text-sm text-muted-foreground">
            This is how your form will look like to your users
          </p>
        </header>
        <section className="bg-graph flex flex-grow items-center justify-center overflow-y-auto p-4">
          <FormPreviewContainer>
            {elements.map((element) => {
              const FormComponent = formElements[element.type].formComponent
              return (
                <FormComponent key={element.id} elementInstance={element} />
              )
            })}
          </FormPreviewContainer>
        </section>
      </DialogContent>
    </Dialog>
  )
}
