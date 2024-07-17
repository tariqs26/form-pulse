"use server"

import { revalidatePath } from "next/cache"
import db from "@/lib/db"
import { FormData } from "@/schemas/form"
import { currentUser } from "@clerk/nextjs"
import type { FormElementInstance } from "@/types/form-builder"

async function getUserOrThrow() {
  const user = await currentUser()
  if (!user) throw Error("User not found")
  return user
}

export async function createForm(data: FormData) {
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
export async function getUserFormStats() {
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

export async function getForms() {
  const user = await getUserOrThrow()

  return db.form.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: "desc" },
  })
}

export async function getFormById(id: number) {
  const user = await getUserOrThrow()

  return db.form.findUniqueOrThrow({
    where: { id, userId: user.id },
  })
}

export async function getFormContentByShareId(shareId: string) {
  const form = await db.form.update({
    where: { shareId },
    select: { content: true },
    data: { visits: { increment: 1 } },
  })

  return form.content as FormElementInstance[]
}

export async function getFormWithSubmissions(id: number) {
  const user = await getUserOrThrow()

  return db.form.findUniqueOrThrow({
    where: { id, userId: user.id },
    include: { formSubmissions: true },
  })
}

export async function updateFormContent(
  id: number,
  content: FormElementInstance[],
) {
  const user = await getUserOrThrow()

  const form = await db.form.update({
    where: { id, userId: user.id },
    data: { content },
  })

  revalidatePath(`/dashboard/builder/${id}`)

  return form
}

export async function publishForm(id: number) {
  const user = await getUserOrThrow()

  return db.form.update({
    where: { id, userId: user.id },
    data: { published: true },
  })
}

export async function submitForm(
  shareId: string,
  content: Record<string, any>,
) {
  return db.form.update({
    where: { shareId, published: true },
    data: {
      submissions: { increment: 1 },
      formSubmissions: { create: { content } },
    },
  })
}

export async function deleteForm(id: number) {
  const user = await getUserOrThrow()

  return db.form.delete({
    where: { id, userId: user.id },
  })
}
