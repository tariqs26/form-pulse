import { Suspense } from "react"

import { getForms, getUserFormStats } from "@/actions/form"
import { CreateFormDialog } from "@/components/dashboard/create-form-dialog"
import { FormCard } from "@/components/dashboard/form-card"
import { StatsCards } from "@/components/stats-cards"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardPage() {
  return (
    <section className="container py-4">
      <Suspense fallback={<StatsCards loading />}>
        <StatsCardsWrapper />
      </Suspense>
      <Separator className="my-6" />
      <h2 className="col-span-2">Your Forms</h2>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <CreateFormDialog />
        <Suspense
          fallback={[1, 2, 3, 4].map((num) => (
            <Skeleton
              key={num}
              className="h-48 w-full border border-primary/20"
            />
          ))}
        >
          <FormCards />
        </Suspense>
      </div>
    </section>
  )
}

async function StatsCardsWrapper() {
  const stats = await getUserFormStats()
  return <StatsCards data={stats} />
}

async function FormCards() {
  const forms = await getForms()

  return (
    <>
      {forms.map((form) => (
        <FormCard key={form.id} {...form} />
      ))}
    </>
  )
}
