import Link from "next/link"
import { currentUser } from "@clerk/nextjs"
import { AreaChart, FormInput, Replace } from "lucide-react"

import { Logo } from "@/components/logo"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default async function Page() {
  const user = await currentUser()

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar user={user} />
      <main className="container flex flex-grow flex-col justify-center gap-12 py-10">
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  )
}

const Navbar = ({
  user,
}: Readonly<{ user: Awaited<ReturnType<typeof currentUser>> }>) => (
  <nav className="flex items-center justify-between border-b p-4">
    <Logo />
    <div className="flex items-center gap-2">
      <ThemeSwitcher />
      {user ? (
        <Button asChild>
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      ) : (
        <Button asChild>
          <Link href="/sign-in">Sign In</Link>
        </Button>
      )}
    </div>
  </nav>
)

const Hero = () => (
  <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
    <div>
      <h1 className="tracking-light mb-2 font-bold leading-tight text-primary">
        Elevate your
        <br />
        Form Building
        <br />
        Experience with
        <br />
        <span className="text-ring">FormPulse</span>
      </h1>
      <p className="mt-4 text-lg font-medium text-muted-foreground">
        Effortlessly create, customize, and analyze forms with our intuitive
        form builder.
      </p>
    </div>
    <div className="bg-graph grid place-items-center rounded-md p-8">
      <div className="flex max-w-60 flex-col gap-4 rounded-md bg-background p-4">
        <h3 className="animate-in">Your Form</h3>
        <Separator />
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Email</Label>
          <Input id="name" placeholder="" />
        </div>
        <Button
          asChild
          variant="secondary"
          className="animate-pulse bg-ring/80 text-white hover:animate-none hover:bg-ring/70"
        >
          <Link href="/sign-up">Get Started</Link>
        </Button>
      </div>
    </div>
  </div>
)

const Features = () => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
    <FeatureCard
      title="Drag-and-Drop Editor"
      description="Craft beautiful forms with our user-friendly drag-and-drop editor."
      icon={<Replace />}
    />
    <FeatureCard
      title="Powerful Form Features"
      description="Integrate a variety of input and layout fields to enhance user interaction and data collection."
      icon={<FormInput />}
    />
    <FeatureCard
      title="Analytics Dashboard"
      description="Gain valuable insights with our analytics dashboard, providing a comprehensive view of form stats and submissions."
      icon={<AreaChart />}
    />
  </div>
)

type FeatureCardProps = Readonly<{
  title: string
  description: string
  icon: React.ReactNode
}>

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => (
  <div className="flex flex-col rounded-md border bg-secondary p-6 shadow-sm transition-colors hover:bg-secondary/80">
    <div className="mb-2 text-ring">{icon}</div>
    <h5 className="text-lg font-semibold">{title}</h5>
    <p className="font-medium text-muted-foreground">{description}</p>
  </div>
)

const Footer = () => (
  <footer className="flex border-t p-4 text-muted-foreground">
    {new Date().getFullYear()} FormPulse. All rights reserved.
  </footer>
)
