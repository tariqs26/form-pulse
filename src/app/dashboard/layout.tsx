import { Navbar } from "@/components/dashboard/navbar"
import { DesignerProvider } from "@/components/providers/designer-provider"

export const metadata = {
  title: "Dashboard",
}

export default function DashboardLayout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen min-w-full flex-col bg-background">
      <Navbar />
      <main className="flex flex-grow">
        <DesignerProvider>{children}</DesignerProvider>
      </main>
    </div>
  )
}
