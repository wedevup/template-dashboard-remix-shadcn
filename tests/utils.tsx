import { ReactElement } from 'react'
import { render as testingLibraryRender, screen, fireEvent, waitFor } from '@testing-library/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '~/api/config/query-client'
import { MemoryRouter } from 'react-router-dom'

// Custom render function that includes providers
export function render(ui: ReactElement, { route = '/' } = {}) {
  return testingLibraryRender(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </QueryClientProvider>
  )
}

// Wrapper for hooks that need providers
export function wrapper({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{children}</MemoryRouter>
    </QueryClientProvider>
  )
}

// Re-export commonly used testing utilities
export { screen, fireEvent, waitFor }
