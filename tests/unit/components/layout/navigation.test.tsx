import { vi, expect, describe, it, beforeEach } from 'vitest'
import { render, screen } from '../../../utils'
import { Navigation } from '~/components/layout/navigation'
import { useAuthStore } from '~/stores/auth-store'

// Mock the useAuthStore hook
vi.mock('~/stores/auth-store', () => ({
  useAuthStore: vi.fn()
}))

describe('Navigation', () => {
  const mockedUseAuthStore = useAuthStore as unknown as vi.Mock

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render public links when not authenticated', () => {
    // Mock unauthenticated state
    mockedUseAuthStore.mockReturnValue({
      isAuthenticated: false,
      user: null,
      logout: vi.fn()
    })

    render(<Navigation />)

    // Check public links are present
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()

    // Check login link is present
    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument()

    // Check private links are not present
    expect(screen.queryByRole('link', { name: /dashboard/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /profile/i })).not.toBeInTheDocument()
  })

  it('should render private links when authenticated', () => {
    // Mock authenticated state
    mockedUseAuthStore.mockReturnValue({
      isAuthenticated: true,
      user: { name: 'Test User' },
      logout: vi.fn()
    })

    render(<Navigation />)

    // Check public links are still present
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()

    // Check private links are present
    expect(screen.getByRole('link', { name: /dashboard/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /profile/i })).toBeInTheDocument()

    // Check welcome message and logout are present
    expect(screen.getByText(/welcome, test user/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument()

    // Check login link is not present
    expect(screen.queryByRole('link', { name: /login/i })).not.toBeInTheDocument()
  })

  it('should show admin link only for admin users', () => {
    // Mock authenticated admin state
    mockedUseAuthStore.mockReturnValue({
      isAuthenticated: true,
      user: { name: 'Admin User', role: 'admin' },
      logout: vi.fn()
    })

    render(<Navigation />)

    // Check admin link is present
    expect(screen.getByRole('link', { name: /admin/i })).toBeInTheDocument()
  })

  it('should call logout when logout button is clicked', async () => {
    const mockLogout = vi.fn()

    // Mock authenticated state with logout function
    mockedUseAuthStore.mockReturnValue({
      isAuthenticated: true,
      user: { name: 'Test User' },
      logout: mockLogout
    })

    render(<Navigation />)

    // Click logout button
    const logoutButton = screen.getByRole('button', { name: /logout/i })
    logoutButton.click()

    // Check logout was called
    expect(mockLogout).toHaveBeenCalled()
  })
})
