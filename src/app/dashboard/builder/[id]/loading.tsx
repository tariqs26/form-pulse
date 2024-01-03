import { Spinner } from "@/components/ui/spinner"

export default function BuilderLoading() {
  return (
    <div className="flex flex-grow items-center justify-center">
      <Spinner className="h-12 w-12" />
    </div>
  )
}
