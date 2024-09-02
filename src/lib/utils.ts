import { Prisma } from "@prisma/client"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const generateId = () =>
  Math.floor(Math.random() * 1000000000).toString(16)

export const catchAsync =
  <Parameters extends unknown[], Output>(
    action: (...args: Parameters) => Promise<Output>
  ): ((
    ...args: Parameters
  ) => Promise<Output | { error: string; status: number }>) =>
  async (...args) => {
    try {
      return await action(...args)
    } catch (error) {
      console.error(error)

      let message = "Something went wrong, please try again later"
      let status = 500

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          status = 409
          message = "Form with the same name already exists"
        } else if (error.code === "P2025") {
          status = 404
          message = "Form not found"
        }
      }

      return { error: message, status }
    }
  }
