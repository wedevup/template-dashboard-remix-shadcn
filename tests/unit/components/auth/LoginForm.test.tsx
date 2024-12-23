import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '../../../utils'
import { LoginForm } from '~/components/auth/LoginForm'
import userEvent from '@testing-library/user-event'

describe('LoginForm', () => {
  it('renders login form elements', () => {
    render(<LoginForm onSubmit={async () => {}} />)

    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  it('shows loading state when isLoading is true', () => {
    render(<LoginForm onSubmit={async () => {}} isLoading={true} />)

    expect(screen.getByRole('button', { name: /logging in/i })).toBeDisabled()
    expect(screen.getByLabelText(/email/i)).toBeDisabled()
    expect(screen.getByLabelText(/password/i)).toBeDisabled()
  })

  it('calls onSubmit with form data when submitted', async () => {
    const mockSubmit = vi.fn().mockResolvedValue(undefined)
    const user = userEvent.setup()

    render(<LoginForm onSubmit={mockSubmit} />)

    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /login/i }))

    expect(mockSubmit).toHaveBeenCalledWith('test@example.com', 'password123')
  })

  it('requires email and password fields', async () => {
    const mockSubmit = vi.fn()
    render(<LoginForm onSubmit={mockSubmit} />)

    fireEvent.click(screen.getByRole('button', { name: /login/i }))

    expect(mockSubmit).not.toHaveBeenCalled()
    expect(screen.getByLabelText(/email/i)).toBeInvalid()
  })
})
