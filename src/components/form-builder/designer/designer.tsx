import { useDndMonitor } from "@dnd-kit/core"
import { useDesigner } from "@/hooks/use-designer"
import { formElements, type FormElementType } from "@/types/form-builder"
import { generateId } from "@/lib/utils"
import { DesignerSideBar } from "./sidebar/designer-side-bar"
import { DropArea } from "./designer-drop-area"

export function Designer() {
  const {
    elements,
    addElement,
    removeElement,
    selectedElement,
    setSelectedElement,
  } = useDesigner()

  useDndMonitor({
    onDragEnd: (event) => {
      const { active, over } = event

      if (!active || !over) return

      const isDesignerButton = active.data?.current?.isDesignerButton

      const isDroppingOverDesignerDropArea =
        over.data?.current?.isDesignerDropArea

      const isDroppingDesignerButtonOverDesignerDropArea =
        isDesignerButton && isDroppingOverDesignerDropArea

      // Case 1
      if (isDroppingDesignerButtonOverDesignerDropArea) {
        const type = active.data?.current?.type as FormElementType
        const newElement = formElements[type].construct(generateId())

        addElement(elements.length, newElement)
        return
      }

      const isDroppingOverDesignerElementTopHalf =
        over?.data?.current?.isTopHalfDesignerElement

      const isDroppingOverDesignerElementBottomHalf =
        over?.data?.current?.isBottomHalfDesignerElement

      const isDroppingOverDesignerElement =
        isDroppingOverDesignerElementTopHalf ||
        isDroppingOverDesignerElementBottomHalf

      const isDroppingDesignerButtonOverDesignerElement =
        isDesignerButton && isDroppingOverDesignerElement

      if (isDroppingDesignerButtonOverDesignerElement) {
        const type = active.data?.current?.type as FormElementType
        const elementId = over.data?.current?.elementId
        const elementIndex = elements.findIndex(
          (element) => element.id === elementId,
        )

        if (elementIndex === -1) return

        const newElement = formElements[type].construct(generateId())

        const newIndex = isDroppingOverDesignerElementTopHalf
          ? elementIndex
          : elementIndex + 1

        addElement(newIndex, newElement)
        return
      }

      const isDesignerElement = active.data?.current?.isDesignerElement

      const isDroppingDesignerElementOverDesignerElement =
        isDesignerElement && isDroppingOverDesignerElement

      if (isDroppingDesignerElementOverDesignerElement) {
        const elementId = active.data?.current?.elementId
        const element = elements.find((element) => element.id === elementId)

        if (!element) return

        const overElementId = over.data?.current?.elementId
        const overElementIndex = elements.findIndex(
          (element) => element.id === overElementId,
        )

        if (overElementIndex === -1) return

        const newIndex = isDroppingOverDesignerElementTopHalf
          ? overElementIndex
          : overElementIndex + 1

        removeElement(elementId)
        addElement(newIndex, element)
      }
    },
  })

  return (
    <section className="bg-graph relative flex h-52 flex-grow items-center justify-center overflow-y-auto">
      <div className="flex h-full flex-1 overflow-x-auto">
        <div
          className="w-full overflow-x-auto p-4"
          onClick={() => {
            if (selectedElement) setSelectedElement(null)
          }}
        >
          <DropArea elements={elements} />
        </div>
        <DesignerSideBar />
      </div>
    </section>
  )
}
