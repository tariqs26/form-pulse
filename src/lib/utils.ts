import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const generateId = () =>
  Math.floor(Math.random() * 1000000000).toString(16)

const hasErrorMessage = (error: unknown): error is { message: string } =>
  typeof error === "object" &&
  error !== null &&
  "message" in error &&
  typeof error.message === "string"

export const catchAsync = async <T>(
  fn: Promise<T>
): Promise<T | { error: string }> => {
  try {
    return await fn
  } catch (error) {
    console.error(error)

    let message = "Something went wrong, please try again later"

    if (
      hasErrorMessage(error) &&
      error.message.includes(
        "Unique constraint failed on the fields: (`userId`,`name`)"
      )
    ) {
      message = "Form with the same name already exists"
    }

    return { error: message }
  }
}
