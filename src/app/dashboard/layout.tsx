import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"

export const metadata: Metadata = {
  title: "Dashboard",
}

export default function DashboardLayout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen min-w-full flex-col bg-background">
      <Navbar />
      <main className="flex flex-grow">{children}</main>
    </div>
  )
}
