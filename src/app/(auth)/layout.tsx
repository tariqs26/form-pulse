export default function AuthLayout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center py-2">
      {children}
    </div>
  )
}
