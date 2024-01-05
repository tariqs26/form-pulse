"use client"

import type {
  FormElementType,
  FormElement,
  FormElementInstance,
} from "@/types/form-builder"
import { SeparatorHorizontal } from "lucide-react"
import { Label } from "../../ui/label"
import { Separator } from "../../ui/separator"

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
