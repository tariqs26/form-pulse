"use server"

import db from "@/lib/db"
import { FormData } from "@/schemas/form"
import { currentUser } from "@clerk/nextjs"

async function getUserOrThrow() {
  const user = await currentUser()
  if (!user) throw Error("User not found")
  return user
}

export async function getUserFormStats() {
  const user = await getUserOrThrow()

  const { _sum } = await db.form.aggregate({
    where: {
      userId: user.id,
    },
    _sum: {
      visits: true,
      submissions: true,
    },
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

export async function createForm(data: FormData) {
  const user = await getUserOrThrow()

  await db.form.create({
    data: {
      ...data,
      userId: user.id,
    },
  })

  return {
    title: "Success",
    description: "Form created successfully",
  }
}
