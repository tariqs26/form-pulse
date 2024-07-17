import { useState } from "react"
import { useDndMonitor, DragOverlay, type Active } from "@dnd-kit/core"
import { useDesigner } from "@/hooks/use-designer"
import { formElements, type FormElementType } from "@/types/form-builder"
import { SideBarButtonDragOverlay } from "./designer/sidebar/side-bar-button"

/**
 * This component is responsible for rendering the drag overlay of the currently dragged item.
 */
export const DragOverlayWrapper = () => {
  const { elements } = useDesigner()
  const [draggedItem, setDraggedItem] = useState<Active | null>(null)
  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active)
    },
    onDragCancel: () => {
      setDraggedItem(null)
    },
    onDragEnd: () => {
      setDraggedItem(null)
    },
  })

  if (!draggedItem) return null

  let node = <div>No drag overlay</div>

  const isSideBarButton = draggedItem.data?.current?.isDesignerButton

  if (isSideBarButton) {
    const type = draggedItem.data?.current?.type as FormElementType
    node = <SideBarButtonDragOverlay formElement={formElements[type]} />
  }

  const isDesignerElement = draggedItem.data?.current?.isDesignerElement

  if (isDesignerElement) {
    const elementId = draggedItem.data?.current?.elementId
    const element = elements.find((element) => element.id === elementId)
    if (!element) node = <div>Element not found</div>
    else {
      const DesignerElementComponent =
        formElements[element.type].designerComponent

      node = (
        <div className="pointer-events-none flex w-full rounded-md border-border bg-accent/40 px-4 py-2 opacity-80">
          <DesignerElementComponent elementInstance={element} />
        </div>
      )
    }
  }

  return <DragOverlay>{node}</DragOverlay>
}
