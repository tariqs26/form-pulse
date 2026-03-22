import { getFormContentByShareId } from "@/actions/form"
import { FormError } from "@/components/form-error"
import { FormSubmit } from "@/components/submit/form-submit"

const link = { href: "/", text: "Back to home" }

export default async function SubmitPage(
  props: Readonly<{ params: Promise<{ shareId: string }> }>
) {
  const params = await props.params
  const formContent = await getFormContentByShareId(params.shareId)

  if ("error" in formContent) return <FormError link={link} {...formContent} />

  return <FormSubmit formContent={formContent} shareId={params.shareId} />
}
