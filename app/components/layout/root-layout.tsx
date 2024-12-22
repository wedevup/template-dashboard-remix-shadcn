import { Navigation } from './navigation'

interface RootLayoutProps {
  children: React.ReactNode
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className='min-h-screen bg-background'>
      <Navigation />
      <main className='container mx-auto p-4'>{children}</main>
    </div>
  )
}
