"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { Form as DbForm } from "@prisma/client"

import { createForm, updateFormDetails } from "@/actions/form"
import { type FormData, formSchema } from "@/schemas/form"

import { toast } from "@/hooks/use-toast"
import { Button } from "./ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import { Spinner } from "./ui/spinner"
import { Textarea } from "./ui/textarea"

type DetailsFromProps =
  | { defaultValues: Readonly<DbForm>; closeModal: () => void }
  | { defaultValues?: never; closeModal?: never }

export const DetailsForm = ({
  defaultValues,
  closeModal,
}: DetailsFromProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const router = useRouter()

  const onSubmit = async (data: FormData) => {
    if (defaultValues) {
      const res = await updateFormDetails(defaultValues.id, data)

      if ("error" in res)
        toast({
          title: "Error",
          description: res.error,
          variant: "destructive",
        })
      else {
        toast(res)
        closeModal()
      }
      return
    }

    const res = await createForm(data)

    if ("error" in res)
      toast({
        title: "Error",
        description: res.error,
        variant: "destructive",
      })
    else {
      toast({ title: res.title, description: res.description })
      router.push(`/dashboard/builder/${res.id}`)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea rows={3} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full"
          disabled={form.formState.isSubmitting || !form.formState.isDirty}
        >
          {form.formState.isSubmitting ? <Spinner /> : "Save"}
        </Button>
      </form>
    </Form>
  )
}
