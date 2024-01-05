import { getFormContentByShareId } from "@/actions/form"
import { FormSubmit } from "@/components/submit/form-submit"

type Props = {
  params: {
    formShareId: string
  }
}

export default async function SubmitPage({ params }: Props) {
  const formContent = await getFormContentByShareId(params.formShareId)
  return (
    <FormSubmit formContent={formContent} formShareId={params.formShareId} />
  )
}
