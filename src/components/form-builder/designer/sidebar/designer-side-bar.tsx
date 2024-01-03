import { useDesigner } from "@/hooks/use-designer"
import { FormPropertiesSidebar } from "./form-properties-sidebar"
import { FormElementsSidebar } from "./form-elements-sidebar"

export function DesignerSideBar() {
  const { selectedElement } = useDesigner()
  return (
    <aside className="flex h-full w-96 max-w-96 flex-grow flex-col gap-2 overflow-y-auto rounded-l-lg border-l-2 border-muted bg-background p-4">
      {selectedElement ? <FormPropertiesSidebar /> : <FormElementsSidebar />}
    </aside>
  )
}
