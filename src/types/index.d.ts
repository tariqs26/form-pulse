type LayoutProps = Readonly<{
  children: React.ReactNode
}>

type ErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}
