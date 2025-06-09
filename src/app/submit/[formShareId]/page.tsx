import { getFormContentByShareId } from "@/actions/form"
import { FormError } from "@/components/form-error"
import { FormSubmit } from "@/components/submit/form-submit"

type Props = Readonly<{ params: { formShareId: string } }>

const link = { href: "/", text: "Back to home" }

export default async function SubmitPage({ params }: Props) {
  const formContent = await getFormContentByShareId(params.formShareId)

  if ("error" in formContent) return <FormError link={link} {...formContent} />

  return (
    <FormSubmit formContent={formContent} formShareId={params.formShareId} />
  )
}
