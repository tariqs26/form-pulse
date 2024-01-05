import { cn } from "@/lib/utils"

type FormPreviewContainerProps = React.HTMLAttributes<HTMLDivElement>

export function FormPreviewContainer({
  className,
  ...props
}: FormPreviewContainerProps) {
  return (
    <div
      className={cn(
        "flex max-w-[620px] flex-grow flex-col gap-4 self-stretch overflow-y-auto rounded-xl bg-background p-6",
        className,
      )}
      {...props}
    />
  )
}
