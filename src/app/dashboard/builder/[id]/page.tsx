import { getFormById } from "@/actions/form"
import { FormBuilder } from "@/components/form-builder/form-builder"
import { FormError } from "@/components/form-error"

export const metadata = { title: "Form Builder" }

export default async function BuilderPage({
  params,
}: Readonly<{ params: { id: string } }>) {
  const form = await getFormById(params.id)

  if ("error" in form) return <FormError {...form} />

  return <FormBuilder form={form} />
}
