import { subTitleFieldFormElement } from "@/components/fields/layout/sub-title-field"
import { paragraphFieldFormElement } from "@/components/fields/layout/paragraph-field"
import { separatorFieldFormElement } from "@/components/fields/layout/separator-field"
import { spacerFieldFormElement } from "@/components/fields/layout/spacer-field"
import { titleFieldFormElement } from "@/components/fields/layout/title-field"
import { textFieldFormElement } from "@/components/fields/form/text-field"
import { textAreaFieldFormElement } from "@/components/fields/form/text-area-field"
import { numberFieldFormElement } from "@/components/fields/form/number-field"
import { dateFieldFormElement } from "@/components/fields/form/date-field"
import { selectFieldFormElement } from "@/components/fields/form/select-field"
import { checkboxFieldFormElement } from "@/components/fields/form/checkbox-field"

export type FormElementType =
  // Layout
  | "titleField"
  | "subTitleField"
  | "paragraphField"
  | "separatorField"
  | "spacerField"
  // Form
  | "textField"
  | "textAreaField"
  | "numberField"
  | "dateField"
  | "selectField"
  | "checkboxField"

export type SubmitValue = (key: string, value: string) => void

export type FormElement = {
  type: FormElementType
  construct: (id: string) => FormElementInstance
  designerButton: { icon: React.ElementType; label: string }
  designerComponent: React.FC<FormElementInstance>
  propertiesComponent: React.FC<FormElementInstance>
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

export const formElements: Record<FormElementType, FormElement> = {
  titleField: titleFieldFormElement,
  subTitleField: subTitleFieldFormElement,
  paragraphField: paragraphFieldFormElement,
  separatorField: separatorFieldFormElement,
  spacerField: spacerFieldFormElement,

  textField: textFieldFormElement,
  textAreaField: textAreaFieldFormElement,
  numberField: numberFieldFormElement,
  dateField: dateFieldFormElement,
  selectField: selectFieldFormElement,
  checkboxField: checkboxFieldFormElement,
}
