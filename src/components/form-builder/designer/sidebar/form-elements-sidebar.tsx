import { formElements } from "@/types/form-builder"
import { SideBarButton } from "./side-bar-button"

export function FormElementsSidebar() {
  return (
    <>
      <h5 className="font-medium text-muted-foreground">Elements</h5>
      {Object.entries(formElements).map(([key, value]) => (
        <SideBarButton key={key} formElement={value} />
      ))}
    </>
  )
}
