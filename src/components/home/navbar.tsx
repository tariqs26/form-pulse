import Link from "next/link"
import { Show } from "@clerk/nextjs"

import { Logo } from "../logo"
import { ThemeSwitcher } from "../theme-switcher"
import { Button } from "../ui/button"

export const Navbar = () => (
  <nav className="flex items-center justify-between border-b p-4">
    <Logo />
    <div className="flex items-center gap-2">
      <ThemeSwitcher />
      <Show when="signed-in">
        <Button asChild>
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      </Show>
      <Show when="signed-out">
        <Button asChild>
          <Link href="/sign-in">Sign In</Link>
        </Button>
      </Show>
    </div>
  </nav>
)
