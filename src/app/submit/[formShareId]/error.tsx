"use client"

import { FormError } from "@/components/form-error"

export default function Error(props: ErrorProps) {
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
