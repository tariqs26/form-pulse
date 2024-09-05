import Link from "next/link"
import type { Form } from "@prisma/client"
import { ChevronRight } from "lucide-react"

import { useDesigner } from "@/hooks/use-designer"
import { FormPreviewDialog } from "@/components/form-preview-dialog"
import { SaveFormButton } from "./save-form-button"
import { PublishFormButton } from "./publish-form-button"
import { EditFormDetailsDialog } from "./edit-form-details-dialog"

export const FormBuilderHeader = (form: Readonly<Form>) => {
  const { elements } = useDesigner()

  return (
    <header className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-b-2 p-4">
      <div className="flex items-center truncate text-lg font-medium text-muted-foreground">
        <Link href="/dashboard" className="text-foreground hover:underline">
          Dashboard
        </Link>
        <ChevronRight size={20} />
        {form.name}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {form.status === "DRAFT" && <EditFormDetailsDialog {...form} />}
        <FormPreviewDialog elements={elements} />
        {form.status === "DRAFT" && (
          <>
            <SaveFormButton {...form} />
            <PublishFormButton {...form} />
          </>
        )}
      </div>
    </header>
  )
}
