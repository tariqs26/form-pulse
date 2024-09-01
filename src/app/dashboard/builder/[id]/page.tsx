import { z } from "zod"
import { getFormById } from "@/actions/form"
import { catchAsync } from "@/lib/utils"
import { FormBuilder } from "@/components/form-builder/form-builder"

export default async function BuilderPage({
  params,
}: Readonly<{ params: { id: string } }>) {
  const { data, error } = z.coerce.number().safeParse(params.id)

  if (error) throw new Error("Invalid form id")

  const form = await catchAsync(getFormById(data))

  if ("error" in form) throw new Error(form.error)

  return <FormBuilder form={form} />
}
