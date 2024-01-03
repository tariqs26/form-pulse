"use client"

import { type Form } from "@prisma/client"
import { DndContext } from "@dnd-kit/core"
import { useFormBuilderSensors } from "@/hooks/use-form-builder-sensors"
import { useUpdateElementsToFormContent } from "@/hooks/use-update-elements-to-form-content"
import { Spinner } from "../ui/spinner"
import { FormPublishedCard } from "./form-published-card"
import { FormBuilderHeader } from "./header/form-builder-header"
import { Designer } from "./designer/designer"
import { DragOverlayWrapper } from "./drag-overlay-wrapper"

type FormBuilderProps = {
  form: Form
}

export function FormBuilder({ form }: FormBuilderProps) {
  const sensors = useFormBuilderSensors()
  const loading = useUpdateElementsToFormContent(form)

  if (loading)
    return (
      <div className="flex flex-grow items-center justify-center">
        <Spinner className="h-12 w-12" />
      </div>
    )

  const shareUrl = `${window.location.origin}/submit/${form.shareId}`

  if (form.published)
    return <FormPublishedCard shareUrl={shareUrl} formId={form.id} />

  return (
    <DndContext sensors={sensors}>
      <main className="flex flex-grow flex-col">
        <FormBuilderHeader {...form} />
        <Designer />
      </main>
      <DragOverlayWrapper />
    </DndContext>
  )
}
