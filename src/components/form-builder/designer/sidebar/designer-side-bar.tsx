import { useDesigner } from "@/hooks/use-designer"
import { FormPropertiesSidebar } from "./form-properties-sidebar"
import { FormElementsSidebar } from "./form-elements-sidebar"

export const DesignerSideBar = () => {
  const { selectedElement } = useDesigner()
  return (
    <aside className="flex w-full max-w-52 flex-col self-stretch overflow-y-auto border-l-2 border-muted bg-background p-4 md:max-w-72">
      {selectedElement ? <FormPropertiesSidebar /> : <FormElementsSidebar />}
    </aside>
  )
}
