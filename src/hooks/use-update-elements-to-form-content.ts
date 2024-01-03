import { useState, useEffect } from "react"
import { Form } from "@prisma/client"
import { useDesigner } from "./use-designer"
import type { FormElementInstance } from "@/types/form-builder"

export function useUpdateElementsToFormContent(form: Form) {
  const { setElements } = useDesigner()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!loading) return
    if (form.content && Array.isArray(form.content)) {
      const content = form.content as FormElementInstance[]
      setElements(content)
    }
    const loadingTimeout = setTimeout(() => setLoading(false), 200)
    return () => clearTimeout(loadingTimeout)
  }, [form, setElements, loading, setLoading])

  return loading
}
