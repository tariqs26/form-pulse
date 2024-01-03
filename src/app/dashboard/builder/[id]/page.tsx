import { getFormById } from "@/actions/form"
import { FormBuilder } from "@/components/form-builder/form-builder"

type Props = {
  params: {
    id: string
  }
}

export default async function BuilderPage({ params }: Props) {
  const form = await getFormById(+params.id)

  return <FormBuilder form={form} />
}
