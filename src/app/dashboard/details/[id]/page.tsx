import Link from "next/link"
import type { Form, FormSubmission } from "@prisma/client"
import { format, formatDistance } from "date-fns"
import { LayoutDashboard } from "lucide-react"
import { z } from "zod"

import { getFormWithSubmissions } from "@/actions/form"
import type {
  Field,
  FormElementInstance,
  UserFormSubmission,
} from "@/types/form-builder"
import { inputFields } from "@/types/form-builder"

import { ShareLink } from "@/components/form-details/share-link"
import { VisitButton } from "@/components/form-details/visit-button"
import { FormError } from "@/components/form-error"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { StatsCards } from "../../page"
import { RowActions } from "./row-actions"

export const metadata = {
  title: "Form Details",
}

export default async function DetailsPage({
  params,
}: Readonly<{ params: { id: string } }>) {
  const { data, error } = z.coerce.number().safeParse(params.id)

  if (error) return <FormError error="Invalid form ID" status={400} />

  const form = await getFormWithSubmissions(data)

  if ("error" in form) return <FormError {...form} />

  const visits = form.visits
  const submissions = form.submissions

  const submissionRate = visits ? (submissions / visits) * 100 : 0
  const bounceRate = 100 - submissionRate

  return (
    <section className="pb-10">
      <div className="container space-y-4 border-b py-8">
        <Button asChild variant="secondary">
          <Link href="/dashboard">
            <LayoutDashboard className="mr-2" size={20} />
            Back to dashboard
          </Link>
        </Button>
        <div className="flex items-center justify-between gap-2">
          <h1 className="truncate">{form.name}</h1>
          <VisitButton shareId={form.shareId} />
        </div>
        <div className="flex items-center justify-between gap-2">
          <ShareLink shareId={form.shareId} />
        </div>
        {form.description && (
          <p className="text-muted-foreground">{form.description}</p>
        )}
      </div>
      <div className="container">
        <StatsCards
          loading={false}
          data={{ visits, submissions, submissionRate, bounceRate }}
        />
      </div>
      <div className="container pt-10">
        <h2 className="mb-4">Submissions</h2>
        {form.submissions > 0 ? (
          <SubmissionsTable form={form} />
        ) : (
          <p className="text-muted-foreground">
            No submissions yet. Share your form to start receiving submissions.
          </p>
        )}
      </div>
    </section>
  )
}

type SubmissionsTableProps = Readonly<{
  form: Form & { formSubmissions: FormSubmission[] }
}>

async function SubmissionsTable({ form }: SubmissionsTableProps) {
  const formElements = form.content as FormElementInstance[]

  type Column = {
    id: string
    label: string
    required: boolean
    type: Field
  }

  const columns: Column[] = []

  for (const element of formElements)
    if (inputFields.some((field) => field === element.type))
      columns.push({
        id: element.id,
        label: element.extraAttributes?.label,
        required: element.extraAttributes?.required,
        type: element.type,
      })

  const rows: UserFormSubmission[] = form.formSubmissions.map((submission) => ({
    ...submission,
    content: submission.content as Record<string, any>,
  }))

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.id}>{column.label}</TableHead>
            ))}
            <TableHead className="text-right">Submitted</TableHead>
            <TableHead className="w-[90px] text-right text-muted-foreground">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              {columns.map((column) => (
                <RowCell
                  key={column.id}
                  type={column.type}
                  value={row.content[column.id]}
                />
              ))}
              <TableCell className="text-right text-muted-foreground">
                {formatDistance(row.createdAt, new Date(), {
                  addSuffix: true,
                })}
              </TableCell>
              <TableCell className="flex justify-end">
                <RowActions submission={row} elements={formElements} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

type RowCellProps = Readonly<{ type: Field; value?: string }>

const RowCell = ({ type, value }: RowCellProps) => {
  let node: React.ReactNode = value

  switch (type) {
    case "date": {
      if (!value) break
      const date = new Date(value).toLocaleDateString()
      node = <Badge variant="outline">{format(date, "dd/MM/yyyyy")}</Badge>
      break
    }
    case "checkbox":
      node = <Checkbox checked={value === "true"} disabled />
      break
  }

  return <TableCell>{node}</TableCell>
}
