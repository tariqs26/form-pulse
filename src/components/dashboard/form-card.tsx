import type { Form } from "@prisma/client"
import Link from "next/link"
import { formatDistance } from "date-fns"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { View, CalendarRange, ArrowRight, Edit } from "lucide-react"
import { cn } from "@/lib/utils"

type FormCardProps = {
  form: Form
}

export function FormCard({ form }: FormCardProps) {
  return (
    <Card key={form.id} className="flex flex-col border shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          <span className="truncate">{form.name}</span>
          {form.published ? (
            <Badge>Published</Badge>
          ) : (
            <Badge variant="destructive">Draft</Badge>
          )}
        </CardTitle>
        <div className="text-sm text-muted-foreground">
          {formatDistance(form.updatedAt, new Date(), {
            addSuffix: true,
          })}
        </div>
      </CardHeader>
      <CardContent className="flex-grow truncate text-muted-foreground">
        {form.description || "No description"}
      </CardContent>
      <CardFooter
        className={cn(
          "flex items-center justify-end",
          form.published && "justify-between",
        )}
      >
        {form.published && (
          <section className="flex items-center gap-2">
            <CalendarRange className="text-muted-foreground" />
            {form.submissions}
            <View className="text-muted-foreground" />
            {form.visits}
          </section>
        )}
        <Button asChild className="gap-2">
          {form.published ? (
            <Link href={`/dashboard/forms/${form.id}`}>
              View Form <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <Link href={`/dashboard/builder/${form.id}`}>
              Edit Form <Edit className="h-4 w-4" />
            </Link>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
