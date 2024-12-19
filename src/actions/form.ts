"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs/server"
import type { FormStatus } from "@prisma/client"

import db from "@/lib/db"
import { catchAsync } from "@/lib/utils"
import type { FormData } from "@/schemas/form"
import type { FormElementInstance } from "@/types/form-builder"

const NotAuthenticatedError = Error("User not authenticated")

export const createForm = catchAsync(async (data: FormData) => {
  const { userId } = await auth()
  if (!userId) throw NotAuthenticatedError

  const form = await db.form.create({ data: { ...data, userId } })

  revalidatePath("/dashboard")
  return {
    id: form.id,
    title: "Success",
    description: "Form created successfully",
  }
})

export const getUserFormStats = async () => {
  const { userId } = await auth()
  if (!userId) throw NotAuthenticatedError

  const { _sum } = await db.form.aggregate({
    where: { userId },
    _sum: { visits: true, submissions: true },
  })

  const visits = _sum.visits || 0
  const submissions = _sum.submissions || 0

  const submissionRate = visits ? (submissions / visits) * 100 : 0
  const bounceRate = 100 - submissionRate

  return {
    visits,
    submissions,
    submissionRate,
    bounceRate,
  }
}

export const getForms = async () => {
  const { userId } = await auth()
  if (!userId) throw NotAuthenticatedError

  return db.form.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
  })
}

export const getFormById = catchAsync(async (id: number) => {
  const { userId } = await auth()
  if (!userId) throw NotAuthenticatedError

  return db.form.findUniqueOrThrow({ where: { id, userId } })
})

export const getFormContentByShareId = catchAsync(async (shareId: string) => {
  const form = await db.form.update({
    where: { shareId },
    select: { content: true },
    data: { visits: { increment: 1 } },
  })

  return form.content as FormElementInstance[]
})

export const getFormWithSubmissions = catchAsync(async (id: number) => {
  const { userId } = await auth()
  if (!userId) throw NotAuthenticatedError

  return db.form.findUniqueOrThrow({
    where: { id, userId },
    include: { formSubmissions: true },
  })
})

export const updateFormContent = catchAsync(
  async (id: number, content: FormElementInstance[]) => {
    const { userId } = await auth()
    if (!userId) throw NotAuthenticatedError

    await db.form.update({ where: { id, userId }, data: { content } })

    revalidatePath(`/dashboard/builder/${id}`)
    return {
      title: "Success",
      description: "Form saved successfully",
    }
  }
)

export const updateFormDetails = catchAsync(
  async (id: number, data: Pick<FormData, "name" | "description">) => {
    const { userId } = await auth()
    if (!userId) throw NotAuthenticatedError

    await db.form.update({ where: { id, userId }, data })

    revalidatePath(`/dashboard/builder/${id}`)
    return {
      title: "Success",
      description: "Form details updated successfully",
    }
  }
)

export const updateFormStatus = catchAsync(
  async (id: number, status: FormStatus) => {
    const { userId } = await auth()
    if (!userId) throw NotAuthenticatedError

    await db.form.update({
      where: { id, userId },
      data: { status },
    })

    revalidatePath(`/dashboard/builder/${id}`)
    revalidatePath(`/dashboard/details/${id}`)
    return {
      title: "Success",
      description: `Form ${
        status === "PUBLISHED" ? "published" : "archived"
      } successfully`,
    }
  }
)

export const submitForm = catchAsync(
  async (shareId: string, content: Record<string, any>) =>
    db.form.update({
      where: { shareId, status: "PUBLISHED" },
      data: {
        submissions: { increment: 1 },
        formSubmissions: { create: { content } },
      },
    })
)

export const deleteForm = catchAsync(async (id: number) => {
  const { userId } = await auth()
  if (!userId) throw NotAuthenticatedError

  await db.form.delete({ where: { id, userId } })

  revalidatePath("/dashboard")
  return { title: "Success", description: "Form deleted successfully" }
})

export const deleteFormSubmission = catchAsync(
  async (formId: number, id: number) => {
    const { userId } = await auth()
    if (!userId) throw NotAuthenticatedError

    await db.$transaction([
      db.formSubmission.delete({
        where: { id, formId, form: { userId } },
      }),
      db.form.update({
        where: { id: formId, userId },
        data: { submissions: { decrement: 1 } },
      }),
    ])

    revalidatePath(`/dashboard/details/${formId}`)
    return { title: "Success", description: "Submission deleted successfully" }
  }
)
