import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

type StatCardProps = {
  stat: {
    title: string
    icon: React.ReactNode
    helperText: string
    value: string | number | undefined
    className: string
  }
  loading: boolean
}

export function StatCard({ stat, loading }: StatCardProps) {
  return (
    <Card key={stat.title} className={stat.className + " shadow-sm"}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {stat.title}
        </CardTitle>
        {stat.icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading ? (
            <Skeleton>
              <span className="opacity-0">0</span>
            </Skeleton>
          ) : (
            stat.value
          )}
        </div>
        <p className="pt-1 text-xs text-muted-foreground">{stat.helperText}</p>
      </CardContent>
    </Card>
  )
}
