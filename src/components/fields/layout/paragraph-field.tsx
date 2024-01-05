"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useDesigner } from "@/hooks/use-designer"
import type {
  FormElementType,
  FormElement,
  FormElementInstance,
} from "@/types/form-builder"

import { Text } from "lucide-react"
import { Label } from "../../ui/label"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form"
import { Textarea } from "../../ui/textarea"

const type: FormElementType = "paragraphField"

const extraAttributes = {
  text: "Text here",
}

const propertiesSchema = z.object({
  text: z.string().min(2).max(500),
})

type Properties = z.infer<typeof propertiesSchema>

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes
}

export const paragraphFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButton: {
    icon: Text,
    label: "Paragraph Field",
  },
  designerComponent: DesignerComponent,
  propertiesComponent: PropertiesComponent,
  formComponent: FormComponent,
  validate: () => true,
}

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance
}) {
  const element = elementInstance as CustomInstance

  const { text } = element.extraAttributes
  return (
    <div className="grid gap-2">
      <Label className="text-muted-foreground">Paragraph Field</Label>
      <p>{text}</p>
    </div>
  )
}

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance
}) {
  const element = elementInstance as CustomInstance
  const { updateElement } = useDesigner()
  const form = useForm<Properties>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: element.extraAttributes,
  })

  useEffect(() => {
    form.reset(element.extraAttributes)
  }, [element, form])

  function applyChanges(data: Properties) {
    updateElement(element.id, {
      ...element,
      extraAttributes: data,
    })
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter") e.currentTarget.blur()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => e.preventDefault()}
        onBlur={form.handleSubmit(applyChanges)}
      >
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text</FormLabel>
              <FormControl>
                <Textarea {...field} onKeyDown={onKeyDown} rows={5} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance
}) {
  const element = elementInstance as CustomInstance
  const { text } = element.extraAttributes
  return <p>{text}</p>
}
