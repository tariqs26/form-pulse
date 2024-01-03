import { textFieldFormElement } from "@/components/fields/text-field"

export type FormElementType = "textField"

type FormComponent = React.FC<{
  elementInstance: FormElementInstance
}>

export type FormElement = {
  type: FormElementType

  construct: (id: string) => FormElementInstance

  designerButton: {
    icon: React.ElementType
    label: string
  }

  designerComponent: FormComponent
  propertiesComponent: FormComponent
  formComponent: FormComponent
}

export type FormElementInstance = {
  id: string
  type: FormElementType
  extraAttributes?: Record<string, any>
}

export type FormElements = {
  [key in FormElementType]: FormElement
}

export const formElements: FormElements = {
  textField: textFieldFormElement,
}
