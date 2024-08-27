"use client"

import { FormError } from "@/components/form-error"

export default function SubmitErrorPage(props: ErrorProps) {
  return (
    <FormError
      {...props}
      link={{
        href: "/",
        text: "Back to home",
      }}
    />
  )
}
