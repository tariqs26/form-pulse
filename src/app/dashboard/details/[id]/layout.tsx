export default function DetailsLayout({ children }: LayoutProps) {
  return (
    <div className="mx-auto flex flex-col overflow-x-hidden">
      {children}
    </div>
  )
}
