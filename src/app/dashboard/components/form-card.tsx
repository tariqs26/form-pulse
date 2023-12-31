import Link from "next/link"
import { formatDistance } from "date-fns"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { View, CalendarRange, ArrowRight, Edit } from "lucide-react"

import type { Form } from "@prisma/client"

type FormCardProps = {
  form: Form
}

export function FormCard({ form }: FormCardProps) {
  return (
    <Card key={form.id} className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          <span className="truncate">{form.name}</span>
          {form.published ? (
            <Badge>Published</Badge>
          ) : (
            <Badge variant="destructive">Draft</Badge>
          )}
        </CardTitle>
        <CardDescription>
          {" "}
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true,
          })}
          {form.published && (
            <section className="flex items-center gap-2">
              <CalendarRange className="text-muted-foreground" />
              {form.submissions}
              <View className="text-muted-foreground" />
              {form.visits}
            </section>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-5 truncate text-sm text-muted-foreground">
        {form.description || "No description"}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button asChild className="mt-2 gap-2">
          {!form.published ? (
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
