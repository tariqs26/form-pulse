import { getFormById } from "@/actions/form"
import { FormBuilder } from "@/components/form-builder/form-builder"
import { FormError } from "@/components/form-error"

export const metadata = { title: "Form Builder" }

export default async function BuilderPage(
  props: Readonly<{ params: Promise<{ id: string }> }>
) {
  const params = await props.params
  const form = await getFormById(params.id)

  if ("error" in form) return <FormError {...form} />

  return <FormBuilder form={form} />
}
