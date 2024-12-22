import type { LinksFunction } from '@remix-run/node'
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from './api/config/query-client'
import { Toaster } from './components/ui/toaster'
import './tailwind.css'

export const links: LinksFunction = () => []

export default function App() {
  return (
    <html lang='en' className='h-full'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body className='h-full bg-background'>
        <QueryClientProvider client={queryClient}>
          <Outlet />
          <Toaster />
          {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
          <ScrollRestoration />
          <Scripts />
        </QueryClientProvider>
      </body>
    </html>
  )
}
