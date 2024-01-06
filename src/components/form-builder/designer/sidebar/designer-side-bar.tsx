import { useDesigner } from "@/hooks/use-designer"
import { FormPropertiesSidebar } from "./form-properties-sidebar"
import { FormElementsSidebar } from "./form-elements-sidebar"

export function DesignerSideBar() {
  const { selectedElement } = useDesigner()
  return (
    <aside className="flex self-stretch flex-col md:min-w-fit overflow-y-auto border-l-2 border-muted bg-background p-4">
      {selectedElement ? <FormPropertiesSidebar /> : <FormElementsSidebar />}
    </aside>
  )
}
