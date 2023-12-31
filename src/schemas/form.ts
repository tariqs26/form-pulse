import * as Z from "zod"

export const formSchema = Z.object({
  name: Z.string().min(4),
  description: Z.string().optional(),
})

export type FormData = Z.infer<typeof formSchema>
