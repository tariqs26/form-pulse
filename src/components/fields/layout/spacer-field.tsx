"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlignVerticalSpaceAround } from "lucide-react"
import { z } from "zod"

import { useDesigner } from "@/hooks/use-designer"
import type {
  FormElement,
  FormElementInstance,
  FormElementType,
} from "@/types/form-builder"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

const type: FormElementType = "spacerField"

const extraAttributes = {
  height: 20,
}

const propertiesSchema = z.object({
  height: z.number().min(5).max(200),
})

type Properties = z.infer<typeof propertiesSchema>

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes
}

export const spacerFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButton: {
    icon: AlignVerticalSpaceAround,
    label: "Spacer Field",
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

  const { height } = element.extraAttributes
  return (
    <div className="grid w-full place-items-center gap-2">
      <Label className="text-muted-foreground">Spacer Field: {height}px</Label>
      <AlignVerticalSpaceAround className="size-6" />
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

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
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
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Height {form.watch("height")}px</FormLabel>
              <FormControl className="pt-2">
                <Slider
                  defaultValue={[field.value]}
                  min={5}
                  max={200}
                  step={1}
                  onValueChange={(value) => field.onChange(value[0])}
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
  const { height } = element.extraAttributes
  return <div style={{ height, width: "100%" }} />
}
