export default function AuthLayout({ children }: LayoutProps) {
  return (
    <div className="flex h-full items-center justify-center py-2">
      {children}
    </div>
  )
}
