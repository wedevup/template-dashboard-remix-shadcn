import { vi, expect, describe, it, beforeEach } from 'vitest'
import { render } from '../../../utils'
import { ProtectedRoute } from '~/components/auth/protected-route'
import { useAuthStore } from '~/stores/auth-store'
import { Navigate } from '@remix-run/react'

// Create a mock function for Navigate
const MockNavigate = vi.fn()

// Mock the Navigate component
vi.mock('@remix-run/react', () => ({
  Navigate: (props: { to: string }) => {
    MockNavigate(props)
    return null
  }
}))

// Mock the useAuthStore hook
vi.mock('~/stores/auth-store', () => ({
  useAuthStore: vi.fn()
}))

describe('ProtectedRoute', () => {
  // Access the mocked useAuthStore
  const mockedUseAuthStore = useAuthStore as unknown as vi.Mock

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render children when authenticated', () => {
    // Mock authenticated state by executing the selector with isAuthenticated: true
    mockedUseAuthStore.mockImplementation(selector => selector({ isAuthenticated: true } as any))

    const { container } = render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    )

    expect(container).toHaveTextContent('Protected Content')
    expect(MockNavigate).not.toHaveBeenCalled()
  })

  it('should not render children and redirect when not authenticated', () => {
    // Mock unauthenticated state by executing the selector with isAuthenticated: false
    mockedUseAuthStore.mockImplementation(selector => selector({ isAuthenticated: false } as any))

    const { container } = render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    )

    expect(container).not.toHaveTextContent('Protected Content')
    expect(MockNavigate).toHaveBeenCalledWith({ to: '/login' })
  })
})
