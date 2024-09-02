import { z } from "zod"
import { getFormContentByShareId } from "@/actions/form"
import { catchAsync } from "@/lib/utils"
import { FormError } from "@/components/form-error"
import { FormSubmit } from "@/components/submit/form-submit"

type Props = Readonly<{ params: { formShareId: string } }>

export default async function SubmitPage({ params }: Props) {
  const { data, error } = z.string().uuid().safeParse(params.formShareId)

  const link = {
    href: "/",
    text: "Back to home",
  }

  if (error)
    return (
      <FormError error="Invalid form share link" status={400} link={link} />
    )

  const formContent = await catchAsync(getFormContentByShareId(data))

  if ("error" in formContent) return <FormError link={link} {...formContent} />

  return (
    <FormSubmit formContent={formContent} formShareId={params.formShareId} />
  )
}
