export default function DetailsLayout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col overflow-x-hidden flex-grow">
      {children}
    </div>
  )
}
