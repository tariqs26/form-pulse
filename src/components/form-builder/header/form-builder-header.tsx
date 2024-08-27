import type { Form } from "@prisma/client"
import { PreviewDialogButton } from "./preview-dialog-button"
import { SaveFormButton } from "./save-form-button"
import { PublishFormButton } from "./publish-form-button"

export const FormBuilderHeader = (form: Readonly<Form>) => (
  <header className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-b-2 p-4">
    <h4 className="truncate font-medium">
      Form:<span className="ml-2 text-muted-foreground">{form.name}</span>
    </h4>
    <div className="flex flex-wrap items-center gap-2">
      <PreviewDialogButton />
      {!form.published && (
        <>
          <SaveFormButton formId={form.id} />
          <PublishFormButton formId={form.id} />
        </>
      )}
    </div>
  </header>
)
