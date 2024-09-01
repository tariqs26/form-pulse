import { z } from "zod"
import { getFormContentByShareId } from "@/actions/form"
import { catchAsync } from "@/lib/utils"
import { FormSubmit } from "@/components/submit/form-submit"

type Props = Readonly<{ params: { formShareId: string } }>

export default async function SubmitPage({ params }: Props) {
  const { data, error } = z.string().uuid().safeParse(params.formShareId)

  if (error) throw new Error("Invalid form share link")

  const formContent = await catchAsync(getFormContentByShareId(data))

  if ("error" in formContent) throw new Error(formContent.error)

  return (
    <FormSubmit formContent={formContent} formShareId={params.formShareId} />
  )
}
