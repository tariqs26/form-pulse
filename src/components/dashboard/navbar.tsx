import { UserButton } from "@clerk/nextjs"
import { Logo } from "../logo"
import { ThemeSwitcher } from "../theme-switcher"

export function Navbar() {
  return (
    <nav className="flex h-16 items-center justify-between border-b border-border px-4 py-2">
      <Logo />
      <section className="flex items-center gap-4">
        <ThemeSwitcher />
        <UserButton afterSignOutUrl="/sign-in" />
      </section>
    </nav>
  )
}
