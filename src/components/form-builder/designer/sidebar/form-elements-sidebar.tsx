import { formElements } from "@/types/form-builder"
import { SideBarButton } from "./side-bar-button"
import { Separator } from "@/components/ui/separator"

export const FormElementsSidebar = () => (
  <>
    <h5 className="font-medium text-muted-foreground">
      Drag and drop elements
    </h5>
    <Separator className="my-2 h-[1px] bg-border" />
    <div className="grid grid-cols-1 place-items-center gap-2 md:grid-cols-2">
      <h6 className="col-span-1 my-2 place-self-start text-sm font-medium text-muted-foreground md:col-span-2">
        Layout elements
      </h6>
      <SideBarButton formElement={formElements.titleField} />
      <SideBarButton formElement={formElements.subTitleField} />
      <SideBarButton formElement={formElements.paragraphField} />
      <SideBarButton formElement={formElements.separatorField} />
      <SideBarButton formElement={formElements.spacerField} />
      <h6 className="col-span-1 my-2 place-self-start text-sm font-medium text-muted-foreground md:col-span-2">
        Form elements
      </h6>
      <SideBarButton formElement={formElements.textField} />
      <SideBarButton formElement={formElements.textAreaField} />
      <SideBarButton formElement={formElements.numberField} />
      <SideBarButton formElement={formElements.dateField} />
      <SideBarButton formElement={formElements.selectField} />
      <SideBarButton formElement={formElements.checkboxField} />
    </div>
  </>
)
