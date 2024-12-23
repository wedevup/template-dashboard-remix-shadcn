import { vi, expect, describe, it, beforeEach } from 'vitest'
import { render, screen, waitFor } from '../../utils'
import userEvent from '@testing-library/user-event'
import LoginPage from '~/routes/login'
import { useAuth } from '~/api/hooks/use-auth'
import { useToast } from '~/components/ui/use-toast'
import { useNavigate } from '@remix-run/react'

// Mock the hooks
vi.mock('@remix-run/react', () => ({
  useNavigate: vi.fn()
}))

vi.mock('~/api/hooks/use-auth', () => ({
  useAuth: vi.fn()
}))

vi.mock('~/components/ui/use-toast', () => ({
  useToast: vi.fn()
}))

describe('LoginPage', () => {
  const mockNavigate = vi.fn()
  const mockLogin = vi.fn()
  const mockToast = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    // Mock navigate
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)

    // Mock useAuth hook
    vi.mocked(useAuth).mockReturnValue({
      login: mockLogin,
      logout: vi.fn(),
      isLoading: false,
      error: null
    })

    // Mock useToast hook
    vi.mocked(useToast).mockReturnValue({
      toast: mockToast,
      dismiss: vi.fn(),
      toasts: []
    })
  })

  it('should render login form', () => {
    render(<LoginPage />)

    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  it('should handle successful login', async () => {
    mockLogin.mockResolvedValueOnce({})
    const user = userEvent.setup()

    render(<LoginPage />)

    // Fill and submit form
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /login/i })

    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      })
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard')
    })
  })

  it('should show error toast on login failure', async () => {
    const testError = new Error('Invalid credentials')
    mockLogin.mockRejectedValueOnce(testError)
    const user = userEvent.setup()

    // Initial render with no error
    const { rerender } = render(<LoginPage />)

    // Fill and submit form
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /login/i })

    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'wrong-password')
    await user.click(submitButton)

    // Wait for the error to be thrown
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'wrong-password'
      })
    })

    // Rerender with error state
    vi.mocked(useAuth).mockReturnValue({
      login: mockLogin,
      logout: vi.fn(),
      isLoading: false,
      error: testError
    })

    rerender(<LoginPage />)

    // Now the useEffect should fire with the error
    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Invalid credentials'
      })
    })
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('should show loading state during login', async () => {
    // Set up loading state first
    vi.mocked(useAuth).mockReturnValue({
      login: mockLogin,
      logout: vi.fn(),
      isLoading: true,
      error: null
    })

    // Then render
    render(<LoginPage />)

    // Check loading state
    expect(screen.getByRole('button', { name: /logging in\.\.\./i })).toBeDisabled()
    expect(screen.getByLabelText(/email/i)).toBeDisabled()
    expect(screen.getByLabelText(/password/i)).toBeDisabled()
  })
})
