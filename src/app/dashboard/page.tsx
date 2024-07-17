import { Suspense } from "react"
import { Activity, CalendarRange, MousePointerClick, View } from "lucide-react"

import { getForms, getUserFormStats } from "@/actions/form"
import { CreateFormButton } from "@/components/dashboard/create-form-button"
import { FormCard } from "@/components/dashboard/form-card"
import { StatCard } from "@/components/dashboard/stat-card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardPage() {
  return (
    <section className="container py-4">
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className="my-6" />
      <h2 className="col-span-2">Your Forms</h2>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <CreateFormButton />
        <Suspense fallback={<FormCardsSkeleton />}>
          <FormCards />
        </Suspense>
      </div>
    </section>
  )
}

async function CardStatsWrapper() {
  const stats = await getUserFormStats()
  return <StatsCards data={stats} loading={false} />
}

type StatsCardsProps = {
  data?: Awaited<ReturnType<typeof getUserFormStats>>
  loading: boolean
}

export function StatsCards(props: StatsCardsProps) {
  const { data, loading } = props

  const stats = [
    {
      title: "Total Submissions",
      icon: <CalendarRange className="text-blue-600" />,
      helperText: "All time form submissions",
      value: data?.submissions,
      className: "shadow-blue-600",
    },
    {
      title: "Total Visits",
      icon: <View className="text-green-600" />,
      helperText: "All time form visits",
      value: data?.visits,
      className: "shadow-green-600",
    },
    {
      title: "Submission Rate",
      icon: <MousePointerClick className="text-orange-600" />,
      helperText: "Visits that resulted in a submission",
      value: `${data?.submissionRate.toFixed(2)}%`,
      className: "shadow-orange-600",
    },
    {
      title: "Bounce Rate",
      icon: <Activity className="text-red-600" />,
      helperText: "Visits that leave without interacting",
      value: `${data?.bounceRate.toFixed(2)}%`,
      className: "shadow-red-600",
    },
  ]

  return (
    <section className="grid grid-cols-1 gap-4 pt-8 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} stat={stat} loading={loading} />
      ))}
    </section>
  )
}

function FormCardsSkeleton() {
  return (
    <>
      {[1, 2, 3, 4].map((num, i) => (
        <Skeleton key={num} className="h-48 w-full border border-primary/20" />
      ))}
    </>
  )
}

async function FormCards() {
  const forms = await getForms()

  return (
    <>
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  )
}
