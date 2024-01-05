import { textFieldFormElement } from "@/components/fields/layout/text-field"
import { subTitleFieldFormElement } from "@/components/fields/layout/sub-title-field"
import { paragraphFieldFormElement } from "@/components/fields/layout/paragraph-field"
import { separatorFieldFormElement } from "@/components/fields/layout/separator-field"
import { spacerFieldFormElement } from "@/components/fields/layout/spacer-field"
import { titleFieldFormElement } from "@/components/fields/form/title-field"

export type FormElementType =
  | "titleField"
  | "subTitleField"
  | "paragraphField"
  | "separatorField"
  | "spacerField"
  | "textField"

export type SubmitValue = (key: string, value: string) => void

export type FormElement = {
  type: FormElementType

  construct: (id: string) => FormElementInstance

  designerButton: {
    icon: React.ElementType
    label: string
  }

  designerComponent: React.FC<{
    elementInstance: FormElementInstance
  }>

  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance
  }>

  formComponent: React.FC<{
    elementInstance: FormElementInstance
    submitValue?: SubmitValue
    defaultValue?: string
    isInvalid?: boolean
  }>

  validate(formElement: FormElementInstance, currentValue: string): boolean
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
  titleField: titleFieldFormElement,
  subTitleField: subTitleFieldFormElement,
  paragraphField: paragraphFieldFormElement,
  separatorField: separatorFieldFormElement,
  spacerField: spacerFieldFormElement,
}
