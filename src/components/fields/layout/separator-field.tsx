"use client"

import { SeparatorHorizontal } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import type {
  FormElement,
  FormElementInstance,
  FormElementType,
} from "@/types/form-builder"

const type: FormElementType = "separatorField"

export const separatorFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
  }),
  designerButton: {
    icon: SeparatorHorizontal,
    label: "Separator Field",
  },
  designerComponent: DesignerComponent,
  propertiesComponent: PropertiesComponent,
  formComponent: FormComponent,
  validate: () => true,
}

function DesignerComponent(_: { elementInstance: FormElementInstance }) {
  return (
    <div className="grid w-full gap-2">
      <Label className="text-muted-foreground">Separator Field</Label>
      <Separator />
    </div>
  )
}

function PropertiesComponent(_: { elementInstance: FormElementInstance }) {
  return <p>No properties available for this element</p>
}

function FormComponent(_: { elementInstance: FormElementInstance }) {
  return <Separator />
}
