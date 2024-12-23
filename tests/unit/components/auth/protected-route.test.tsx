import { vi, expect, describe, it, beforeEach } from 'vitest'
import { render } from '../../../utils'
import { ProtectedRoute } from '~/components/auth/protected-route'
import { useAuthStore } from '~/stores/auth-store'

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
    // Mock authenticated state
    mockedUseAuthStore.mockReturnValue(true)

    const { container } = render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    )

    expect(container).toHaveTextContent('Protected Content')
    expect(MockNavigate).not.toHaveBeenCalled()
  })

  it('should not render children and redirect when not authenticated', () => {
    // Mock unauthenticated state
    mockedUseAuthStore.mockReturnValue(false)

    const { container } = render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    )

    expect(container).not.toHaveTextContent('Protected Content')
    expect(MockNavigate).toHaveBeenCalledWith({ to: '/login' })
  })
})
