type LayoutProps = Readonly<{
  children: React.ReactNode
}>

type ErrorProps = Readonly<{
  error: Error & { digest?: string }
  reset: () => void
}>
