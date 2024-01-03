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

import { ALargeSmall } from "lucide-react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Switch } from "../ui/switch"

const type: FormElementType = "textField"

const extraAttributes = {
  label: "Text Field",
  placeHolder: "Value here...",
  helperText: "Helper text",
  required: false,
}

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  placeHolder: z.string().max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
})

type Properties = z.infer<typeof propertiesSchema>

export const textFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButton: {
    icon: ALargeSmall,
    label: "Text Field",
  },
  designerComponent: DesignerComponent,
  propertiesComponent: PropertiesComponent,
  formComponent: FormComponent,
}

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes
}

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance
}) {
  const element = elementInstance as CustomInstance

  const { label, helperText, required, placeHolder } = element.extraAttributes
  return (
    <div className="grid gap-2">
      <Label>
        {label}
        {required && "*"}
      </Label>
      <Input readOnly disabled placeholder={placeHolder} />
      {helperText && (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      )}
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

  function onKeyDown(
    e: React.KeyboardEvent<HTMLInputElement | HTMLButtonElement>,
  ) {
    if (e.key === "Enter") e.currentTarget.blur()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => e.preventDefault()}
        onBlur={form.handleSubmit(applyChanges)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input {...field} onKeyDown={onKeyDown} />
              </FormControl>
              <FormDescription>
                The label of the text field. It will be displayed above the
                field.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="placeHolder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Placeholder</FormLabel>
              <FormControl>
                <Input {...field} onKeyDown={onKeyDown} />
              </FormControl>
              <FormDescription>
                The placeholder of the text field. It will be displayed inside
                the field.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="helperText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Helper Text</FormLabel>
              <FormControl>
                <Input {...field} onKeyDown={onKeyDown} />
              </FormControl>
              <FormDescription>
                The helper text of the text field. It will be displayed below
                the field.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="required"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-md border px-3 py-2">
              <div>
                <FormLabel>Required</FormLabel>
                <FormDescription>
                  Whether the text field is required or not.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  onKeyDown={onKeyDown}
                />
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

  const { label, helperText, required, placeHolder } = element.extraAttributes
  return (
    <div className="grid gap-2">
      <Label>
        {label}
        {required && "*"}
      </Label>
      <Input placeholder={placeHolder} />
      {helperText && (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      )}
    </div>
  )
}
