import { Spinner } from "./ui/spinner"

export const FormLoader = () => (
  <div className="flex flex-grow items-center justify-center">
    <Spinner className="h-12 w-12" />
  </div>
)
