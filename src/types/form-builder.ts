import { checkboxFormElement } from "@/components/fields/input/checkbox"
import { dateFormElement } from "@/components/fields/input/date"
import { numberFormElement } from "@/components/fields/input/number"
import { selectFormElement } from "@/components/fields/input/select"
import { textFormElement } from "@/components/fields/input/text"
import { textareaFormElement } from "@/components/fields/input/textarea"

import { paragraphFormElement } from "@/components/fields/layout/paragraph"
import { separatorFormElement } from "@/components/fields/layout/separator"
import { spacerFormElement } from "@/components/fields/layout/spacer"
import { subTitleFormElement } from "@/components/fields/layout/sub-title"
import { titleFormElement } from "@/components/fields/layout/title"

export type Field =
  // Input
  | "checkbox"
  | "date"
  | "number"
  | "select"
  | "text"
  | "textarea"
  // Layout
  | "paragraph"
  | "separator"
  | "spacer"
  | "subTitle"
  | "title"

export type FormElementInstance = {
  id: string
  type: Field
  extraAttributes?: Record<string, any>
}

export type SubmitValue = (key: string, value: string) => void

export type FormElement = {
  type: Field
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

export const formElements: Record<Field, FormElement> = {
  paragraph: paragraphFormElement,
  separator: separatorFormElement,
  spacer: spacerFormElement,
  subTitle: subTitleFormElement,
  title: titleFormElement,
  checkbox: checkboxFormElement,
  date: dateFormElement,
  number: numberFormElement,
  select: selectFormElement,
  text: textFormElement,
  textarea: textareaFormElement,
}
