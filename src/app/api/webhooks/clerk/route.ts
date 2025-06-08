import { NextRequest } from "next/server"
import { verifyWebhook } from "@clerk/nextjs/webhooks"
import db from "@/lib/db"

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req)

    if (evt.type === "user.deleted") {
      try {
        await db.form.deleteMany({ where: { userId: evt.data.id } })
      } catch (error) {
        console.error("Error deleting forms for user:", evt.data.id, error)
      }
    }

    return new Response("Webhook received", { status: 200 })
  } catch (error) {
    console.error("Error verifying webhook:", error)
    return new Response("Error verifying webhook", { status: 400 })
  }
}
