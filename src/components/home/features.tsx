import { AreaChart, FormInput, Replace } from "lucide-react"

export const Features = () => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
