"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { formSchema, FormData } from "@/schemas/form"
import { createForm } from "@/actions/form"
import { catchAsync } from "@/lib/utils"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { Loader } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export function CreateForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const router = useRouter()

  async function onSubmit(data: FormData) {
    const res = await catchAsync(createForm(data), "Form")

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
        <Button className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <Loader className="animate-spin" />
          ) : (
            "Save"
          )}
        </Button>
      </form>
    </Form>
  )
}
