import { Prisma } from "@prisma/client"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const generateId = () =>
  Math.floor(Math.random() * 1000000000).toString(16)

const canInstanceCheck = (value: unknown) =>
  typeof value === "object" &&
  value !== null &&
  "prototype" in value &&
  typeof value.prototype === "function"

export const catchAsync = async <T>(
  fn: Promise<T>,
  model: string | undefined = undefined,
): Promise<T | { error: string }> => {
  try {
    return await fn
  } catch (error) {
    let message: string | undefined
    if (error instanceof Error) message = error.message

    if (
      canInstanceCheck(error) &&
      error instanceof Prisma.PrismaClientKnownRequestError &&
      model
    ) {
      switch (error.code) {
        case "P2001":
          message = `${model && `${model} with `}${(
            error.meta?.target as unknown[]
          ).at(-1)} not found`
          break
        case "P2002":
          message = `${model && `${model} with `}${
            (error.meta?.target as unknown[])[0]
          } already exists`
          break
        case "P2023":
          message = `Invalid ${model && `${model} `}id`
          break
      }
    }

    return { error: message || "Something went wrong, please try again later" }
  }
}
