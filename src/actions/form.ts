"use server"

import { revalidatePath } from "next/cache"
import { currentUser } from "@clerk/nextjs"
import db from "@/lib/db"
import type { FormData } from "@/schemas/form"
import type { FormElementInstance } from "@/types/form-builder"

export const getUserOrThrow = async () => {
  const user = await currentUser()
  if (!user) throw Error("User not found")
  return user
}

export const createForm = async (data: FormData) => {
  const user = await getUserOrThrow()

  const form = await db.form.create({
    data: { ...data, userId: user.id },
  })

  return {
    id: form.id,
    title: "Success",
    description: "Form created successfully",
  }
}
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

export const getFormById = async (id: number) => {
  const user = await getUserOrThrow()

  return db.form.findUniqueOrThrow({
    where: { id, userId: user.id },
  })
}

export const getFormContentByShareId = async (shareId: string) => {
  const form = await db.form.update({
    where: { shareId },
    select: { content: true },
    data: { visits: { increment: 1 } },
  })

  return form.content as FormElementInstance[]
}

export const getFormWithSubmissions = async (id: number) => {
  const user = await getUserOrThrow()

  return db.form.findUniqueOrThrow({
    where: { id, userId: user.id },
    include: { formSubmissions: true },
  })
}

export const updateFormContent = async (
  id: number,
  content: FormElementInstance[],
) => {
  const user = await getUserOrThrow()

  const form = await db.form.update({
    where: { id, userId: user.id },
    data: { content },
  })

  revalidatePath(`/dashboard/builder/${id}`)

  return form
}

export const publishForm = async (id: number) => {
  const user = await getUserOrThrow()

  return db.form.update({
    where: { id, userId: user.id },
    data: { published: true },
  })
}

export const submitForm = async (
  shareId: string,
  content: Record<string, any>,
) =>
  db.form.update({
    where: { shareId, published: true },
    data: {
      submissions: { increment: 1 },
      formSubmissions: { create: { content } },
    },
  })
export const deleteForm = async (id: number) => {
  const user = await getUserOrThrow()

  return db.form.delete({ where: { id, userId: user.id } })
}
