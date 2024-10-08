"use client"

import { useMemo, useState } from "react"
import type { FormElementInstance } from "@/types/form-builder"
import { DesignerContext } from "../context/designer-context"

export const DesignerProvider = ({ children }: LayoutProps) => {
  const [elements, setElements] = useState<FormElementInstance[]>([])
  const [selectedElement, setSelectedElement] =
    useState<FormElementInstance | null>(null)

  const addElement = (index: number, element: FormElementInstance) => {
    setElements((elements) => {
      const newElements = [...elements]
      newElements.splice(index, 0, element)
      return newElements
    })
  }

  const updateElement = (
    elementId: string,
    updatedElement: FormElementInstance
  ) => {
    setElements((elements) =>
      elements.map((element) =>
        element.id === elementId ? updatedElement : element
      )
    )
  }

  const removeElement = (elementId: string) => {
    setElements((elements) =>
      elements.filter((element) => element.id !== elementId)
    )
  }

  const value = useMemo(
    () => ({
      elements,
      setElements,
      addElement,
      updateElement,
      removeElement,
      selectedElement,
      setSelectedElement,
    }),
    [elements, selectedElement]
  )

  return (
    <DesignerContext.Provider value={value}>
      {children}
    </DesignerContext.Provider>
  )
}
