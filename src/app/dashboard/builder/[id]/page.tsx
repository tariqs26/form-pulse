import { z } from "zod"
import { getFormById } from "@/actions/form"
import { catchAsync } from "@/lib/utils"
import { FormBuilder } from "@/components/form-builder/form-builder"
import { FormError } from "@/components/form-error"

export const metadata = {
  title: "Form Builder",
}

export default async function BuilderPage({
  params,
}: Readonly<{ params: { id: string } }>) {
  const { data, error } = z.coerce.number().safeParse(params.id)

  if (error) return <FormError error="Invalid form ID" status={400} />

  const form = await catchAsync(getFormById(data))

  if ("error" in form) return <FormError {...form} />

  return <FormBuilder form={form} />
}
