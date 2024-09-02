import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod"

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const generateId = () =>
  Math.floor(Math.random() * 1000000000).toString(16)

const errorSchema = z.object({
  code: z.string().optional(),
  name: z.string().optional(),
  message: z.string().optional(),
  meta: z
    .object({
      target: z.array(z.string()).optional(),
      modelName: z.string().optional(),
    })
    .optional(),
})

export const catchAsync = async <T>(
  action: Promise<T>
): Promise<T | { error: string; status: number }> => {
  try {
    return await action
  } catch (error) {
    let message = "Something went wrong, please try again later"
    let status = 500

    const { data } = errorSchema.safeParse(error)

    console.info("PARSED ERROR", data)

    if (data !== undefined) {
      if (
        data.code === "P2002" ||
        data.message?.includes(
          "Unique constraint failed on the fields: (`userId`,`name`)"
        )
      ) {
        status = 409
        message = "Form with the same name already exists"
      } else if (
        data.message?.includes("Record to update not found") ||
        data.code === "P2025"
      ) {
        status = 404
        message = "Form not found"
      }
    }

    return { error: message, status }
  }
}
