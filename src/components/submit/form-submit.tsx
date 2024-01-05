"use client"

import { FormElementInstance, formElements } from "@/types/form-builder"
import { FormPreviewContainer } from "../form-preview-container"
import { Button } from "../ui/button"
import { MousePointerClick, Loader } from "lucide-react"
import { useRef, useCallback, useState, useTransition } from "react"
import { toast } from "@/hooks/use-toast"
import { catchAsync } from "@/lib/utils"
import { submitForm } from "@/actions/form"

type FormSubmitProps = {
  formContent: FormElementInstance[]
  formShareId: string
}

export function FormSubmit({ formContent, formShareId }: FormSubmitProps) {
  const formValues = useRef<Record<string, string>>({})
  const formErrors = useRef<Record<string, boolean>>({})
  const [key, setKey] = useState(new Date().getTime())

  const [submitted, setSubmitted] = useState(false)

  const [loading, startTransition] = useTransition()

  const validateForm: () => boolean = useCallback(() => {
    for (const field of formContent) {
      const currentValue = formValues.current[field.id] ?? ""
      const valid = formElements[field.type].validate(field, currentValue)

      if (!valid) formErrors.current[field.id] = true
    }
    if (Object.keys(formErrors.current).length > 0) return false

    return true
  }, [formContent])

  const submitValue = (id: string, value: string) => {
    formValues.current[id] = value
  }

  const onSubmit = async () => {
    formErrors.current = {}
    const valid = validateForm()
    if (!valid) {
      setKey(new Date().getTime())
      toast({
        title: "Error",
        description: "Please check the form for errors",
        variant: "destructive",
      })
      return
    }

    const res = await catchAsync(
      submitForm(formShareId, formValues.current),
      "Form Submission",
    )

    if ("error" in res)
      toast({
        title: "Error",
        description: res.error,
        variant: "destructive",
      })
    else {
      setSubmitted(true)
      toast({
        title: "Success",
        description: "Form submitted successfully",
      })
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-grow items-center justify-center p-8">
        <FormPreviewContainer
          key={key}
          className="self-center border shadow-sm shadow-ring"
        >
          <h3>Form submitted</h3>
          <p className="text-muted-foreground">
            Thank you for submitting the form, you can close this page now
          </p>
        </FormPreviewContainer>
      </div>
    )
  }

  return (
    <div className="flex flex-grow items-center justify-center p-8">
      <FormPreviewContainer
        key={key}
        className="self-center border shadow-sm shadow-ring"
      >
        {formContent.map((element) => {
          const FormComponent = formElements[element.type].formComponent
          return (
            <FormComponent
              key={element.id}
              elementInstance={element}
              submitValue={submitValue}
              isInvalid={formErrors.current[element.id]}
              defaultValue={formValues.current[element.id]}
            />
          )
        })}
        <Button
          className="mt-4"
          onClick={() => startTransition(onSubmit)}
          disabled={loading}
        >
          {loading ? (
            <Loader className="animate-spin" />
          ) : (
            <>
              <MousePointerClick className="mr-2 h-4 w-4" />
              Submit
            </>
          )}
        </Button>
      </FormPreviewContainer>
    </div>
  )
}
