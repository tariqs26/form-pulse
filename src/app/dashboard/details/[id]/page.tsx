import { getFormWithSubmissions } from "@/actions/form"
import { ShareLink } from "@/components/form-details/share-link"
import { VisitButton } from "@/components/form-details/visit-button"
import { StatsCards } from "../../page"
import { FormElementInstance, FormElementType } from "@/types/form-builder"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatDistance } from "date-fns"

type Props = {
  params: {
    id: string
  }
}

export default async function DetailsPage({ params }: Props) {
  const form = await getFormWithSubmissions(+params.id)

  const visits = form.visits
  const submissions = form.submissions

  const submissionRate = visits ? (submissions / visits) * 100 : 0
  const bounceRate = 100 - submissionRate

  return (
    <section className="border-b py-10">
      <div className="container flex justify-between">
        <h1 className="truncate">{form.name}</h1>
        <VisitButton shareId={form.shareId} />
      </div>
      <div className="border-b py-4">
        <div className="container flex items-center justify-between gap-2">
          <ShareLink shareId={form.shareId} />
        </div>
      </div>
      <div className="container">
        <StatsCards
          loading={false}
          data={{ visits, submissions, submissionRate, bounceRate }}
        />
      </div>
      <div className="container pt-10">
        <SubmissionsTable form={form} />
      </div>
    </section>
  )
}

async function SubmissionsTable({
  form,
}: {
  form: Awaited<ReturnType<typeof getFormWithSubmissions>>
}) {
  const formElements = form.content as FormElementInstance[]

  type Row = {
    [key: string]: string
  } & {
    submittedAt: Date
  }

  const columns: {
    id: string
    label: string
    required: boolean
    type: FormElementType
  }[] = []

  for (const element of formElements) {
    switch (element.type) {
      case "textField":
        columns.push({
          id: element.id,
          label: element.extraAttributes?.label,
          required: element.extraAttributes?.required,
          type: element.type,
        })
        break
    }
  }

  const rows: Row[] = []
  form.formSubmissions.forEach((submission) => {
    const content = submission.content as Object
    rows.push({ ...content, submittedAt: submission.createdAt } as Row)
  })

  return (
    <>
      <h2 className="mb-4">Submissions</h2>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.id}>{column.label}</TableHead>
              ))}
              <TableHead className="text-right text-muted-foreground">
                Submitted At
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <RowCell
                    key={column.id}
                    type={column.type}
                    value={row[column.id]}
                  />
                ))}
                <TableCell className="text-right text-muted-foreground">
                  {formatDistance(row.submittedAt, new Date(), {
                    addSuffix: true,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

function RowCell({ type, value }: { type: FormElementType; value: string }) {
  switch (type) {
    case "textField":
      return <TableCell>{value}</TableCell>
  }
}
