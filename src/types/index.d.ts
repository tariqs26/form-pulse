type LayoutProps = {
  children: React.ReactNode
}

type ErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}
