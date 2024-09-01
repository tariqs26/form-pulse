import Link from "next/link"
import type { Form } from "@prisma/client"
import { formatDistance } from "date-fns"
import { CalendarRange, Edit, View } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { DeleteFormButton } from "./delete-form-button"

export const FormCard = (form: Readonly<Form>) => (
  <Card
    key={form.id}
    className="flex flex-col overflow-hidden rounded-md border shadow-sm"
  >
    <CardHeader className="pb-2">
      <CardTitle className="flex items-center justify-between gap-2">
        <span className="truncate">{form.name}</span>
        {form.published ? (
          <Badge>Published</Badge>
        ) : (
          <Badge variant="secondary">Draft</Badge>
        )}
      </CardTitle>
    </CardHeader>
    <CardContent className="flex-grow truncate text-muted-foreground">
      {form.description || "No description"}
    </CardContent>
    <CardFooter
      className={cn(
        "flex items-center justify-end",
        form.published && "justify-between"
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
      <div className="flex flex-wrap gap-2">
        <Button
          asChild
          className="h-9 gap-2"
          variant={form.published ? "default" : "secondary"}
        >
          {form.published ? (
            <Link href={`/dashboard/details/${form.id}`}>
              <View size={16} /> View
            </Link>
          ) : (
            <Link href={`/dashboard/builder/${form.id}`}>
              <Edit size={16} /> Edit
            </Link>
          )}
        </Button>
        <DeleteFormButton formId={form.id} />
      </div>
    </CardFooter>
    <CardFooter className="border-red-500 bg-muted py-2 text-sm text-muted-foreground">
      Updated{" "}
      {formatDistance(form.updatedAt, new Date(), {
        addSuffix: true,
      })}
    </CardFooter>
  </Card>
)
