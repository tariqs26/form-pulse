import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Prisma } from "@prisma/client"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function canInstanceCheck(value: unknown): boolean {
  return (
    typeof value === "object" &&
    value !== null &&
    "prototype" in value &&
    typeof value.prototype == "function"
  )
}

export async function catchAsync<T>(
  fn: Promise<T>,
  model: string | undefined = undefined,
): Promise<T | { error: string }> {
  try {
    return await fn
  } catch (error) {
    let message
    if (error instanceof Error) message = error.message

    if (
      canInstanceCheck(error) &&
      error instanceof Prisma.PrismaClientKnownRequestError &&
      model
    ) {
      switch (error.code) {
        case "P2001":
          message = `${model && model + " with "}${(
            error.meta?.target as unknown[]
          ).at(-1)} not found`
          break
        case "P2002":
          message = `${model && model + " with "}${
            (error.meta?.target as unknown[])[0]
          } already exists`
          break
        case "P2023":
          message = `Invalid ${model && model + " "}id`
          break
      }
    }

    return { error: message || "Something went wrong, please try again later" }
  }
}
