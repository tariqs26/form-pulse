import { useDroppable, useDndMonitor } from "@dnd-kit/core"
import { useDesigner } from "@/hooks/use-designer"
import { formElements, type FormElementType } from "@/types/form-builder"
import { cn, generateId } from "@/lib/utils"
import { DesignerSideBar } from "./sidebar/designer-side-bar"
import { DesignerElementWrapper } from "./designer-element-wrapper"

export function Designer() {
  const {
    elements,
    addElement,
    removeElement,
    selectedElement,
    setSelectedElement,
  } = useDesigner()

  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  })

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
      <div className="flex h-full flex-1">
        <div
          className="w-full p-4"
          onClick={() => {
            if (selectedElement) setSelectedElement(null)
          }}
        >
          <div
            ref={droppable.setNodeRef}
            className={cn(
              "m-auto flex h-full max-w-4xl flex-1 flex-grow flex-col items-center justify-start overflow-y-auto rounded-xl bg-background",
              droppable.isOver && "ring-4",
            )}
          >
            {!elements.length &&
              (droppable.isOver ? (
                <div className="w-full p-4">
                  <div className="h-28 rounded-md bg-primary/20"></div>
                </div>
              ) : (
                <p className="flex flex-grow items-center text-3xl font-bold text-muted-foreground">
                  Drop here
                </p>
              ))}
            {elements.length > 0 && (
              <div className="flex w-full flex-col gap-2 p-4">
                {elements.map((element) => (
                  <DesignerElementWrapper key={element.id} {...element} />
                ))}
              </div>
            )}
          </div>
        </div>
        <DesignerSideBar />
      </div>
    </section>
  )
}
