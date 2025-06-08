import { Activity, CalendarRange, MousePointerClick, View } from "lucide-react"

import { getUserFormStats } from "@/actions/form"
import { StatCard } from "./dashboard/stat-card"

type StatsCardsProps = Readonly<{
  data?: Awaited<ReturnType<typeof getUserFormStats>>
  loading?: boolean
}>

export const StatsCards = ({ data, loading }: StatsCardsProps) => {
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
