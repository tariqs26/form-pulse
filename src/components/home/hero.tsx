import Link from "next/link"
import { siteConfig } from "@/config/site"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"

export const Hero = () => (
  <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
    <div>
      <h1 className="tracking-light mb-2 font-bold leading-tight text-primary">
        Elevate your
        <br />
        Form Building
        <br />
        Experience with
        <br />
        <span className="text-ring">{siteConfig.title}</span>
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
