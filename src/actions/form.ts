"use server"

import { revalidatePath } from "next/cache"
import { currentUser } from "@clerk/nextjs"

import db from "@/lib/db"
import { catchAsync } from "@/lib/utils"
import type { FormData } from "@/schemas/form"
import type { FormElementInstance } from "@/types/form-builder"

export const getUserOrThrow = async () => {
  const user = await currentUser()
  if (!user) throw Error("User not found")
  return user
}

export const createForm = catchAsync(async (data: FormData) => {
  const user = await getUserOrThrow()

  const form = await db.form.create({
    data: { ...data, userId: user.id },
  })

  revalidatePath("/dashboard")

  return {
    id: form.id,
    title: "Success",
    description: "Form created successfully",
  }
})

export const getUserFormStats = async () => {
  const user = await getUserOrThrow()

  const { _sum } = await db.form.aggregate({
    where: { userId: user.id },
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
  const user = await getUserOrThrow()

  return db.form.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: "desc" },
  })
}

export const getFormById = catchAsync(async (id: number) => {
  const user = await getUserOrThrow()

  return db.form.findUniqueOrThrow({
    where: { id, userId: user.id },
  })
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
  const user = await getUserOrThrow()

  return db.form.findUniqueOrThrow({
    where: { id, userId: user.id },
    include: { formSubmissions: true },
  })
})

export const updateFormContent = catchAsync(
  async (id: number, content: FormElementInstance[]) => {
    const user = await getUserOrThrow()

    await db.form.update({
      where: { id, userId: user.id },
      data: { content },
    })

    revalidatePath(`/dashboard/builder/${id}`)
    return {
      title: "Success",
      description: "Form saved successfully",
    }
  }
)

export const updateFormDetails = catchAsync(
  async (id: number, data: Pick<FormData, "name" | "description">) => {
    const user = await getUserOrThrow()

    await db.form.update({
      where: { id, userId: user.id },
      data,
    })

    revalidatePath(`/dashboard/builder/${id}`)
    return {
      title: "Success",
      description: "Form details updated successfully",
    }
  }
)

export const publishForm = catchAsync(async (id: number) => {
  const user = await getUserOrThrow()

  await db.form.update({
    where: { id, userId: user.id },
    data: { published: true },
  })

  return {
    title: "Success",
    description: "Form published successfully",
  }
})

export const submitForm = catchAsync(
  async (shareId: string, content: Record<string, any>) =>
    db.form.update({
      where: { shareId, published: true },
      data: {
        submissions: { increment: 1 },
        formSubmissions: { create: { content } },
      },
    })
)

export const deleteForm = catchAsync(async (id: number) => {
  const user = await getUserOrThrow()

  await db.form.delete({ where: { id, userId: user.id } })

  revalidatePath("/dashboard")
  return { title: "Success", description: "Form deleted successfully" }
})
