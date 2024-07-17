import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useDesigner } from "@/hooks/use-designer"
import { formElements } from "@/types/form-builder"

export const FormPropertiesSidebar = () => {
  const { selectedElement, setSelectedElement } = useDesigner()

  if (!selectedElement) return null
  const PropertiesForm = formElements[selectedElement.type].propertiesComponent
  return (
    <>
      <div className="flex items-center justify-between">
        <h5 className="font-medium text-muted-foreground">
          Element Properties
        </h5>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setSelectedElement(null)}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      <PropertiesForm elementInstance={selectedElement} />
    </>
  )
}
