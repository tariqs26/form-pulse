import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod"

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const generateId = () =>
  Math.floor(Math.random() * 1000000000).toString(16)

const errorSchema = z.object({
  name: z.string().optional(),
  message: z.string().optional(),
  code: z.string().optional(),
})

export const catchAsync = async <T>(
  fn: Promise<T>
): Promise<T | { error: string }> => {
  try {
    return await fn
  } catch (error) {
    let message = "Something went wrong, please try again later"

    const { data } = errorSchema.safeParse(error)

    if (data !== undefined) {
      if (
        data.message?.includes(
          "Unique constraint failed on the fields: (`userId`,`name`)"
        )
      )
        message = "Form with the same name already exists"
      else if (
        data.message?.includes("Record to update not found") ||
        data.code === "P2025"
      )
        message = "Form not found"
    }

    return { error: message }
  }
}
