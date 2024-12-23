import { act, renderHook } from '@testing-library/react'
import { useToast } from '~/components/ui/use-toast'
import { render, screen, waitFor } from '../utils'
import { Toaster } from '~/components/ui/toaster'
import { describe, it, expect } from 'vitest'

describe('Toast Component', () => {
  it('should show and dismiss a toast', async () => {
    // Render the Toaster component
    render(<Toaster />)

    // Create a toast using the hook
    const { result } = renderHook(() => useToast(), {
      wrapper: ({ children }) => <>{children}</>
    })

    // Show a toast
    act(() => {
      result.current.toast({
        title: 'Test Toast',
        description: 'This is a test toast message'
      })
    })

    // Verify toast is shown
    expect(await screen.findByText('Test Toast')).toBeInTheDocument()
    expect(screen.getByText('This is a test toast message')).toBeInTheDocument()

    // Dismiss the toast
    act(() => {
      result.current.dismiss()
    })

    // Verify toast is removed
    await waitFor(() => {
      expect(screen.queryByText('Test Toast')).not.toBeInTheDocument()
    })
  })

  it('should show a destructive toast variant', async () => {
    render(<Toaster />)

    const { result } = renderHook(() => useToast(), {
      wrapper: ({ children }) => <>{children}</>
    })

    // Show a destructive toast
    act(() => {
      result.current.toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong'
      })
    })

    // Verify destructive toast is shown
    const toastElement = await screen.findByText('Error')
    expect(toastElement).toBeInTheDocument()
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()

    // Verify it has the destructive class
    const toastContainer = toastElement.closest('.destructive')
    expect(toastContainer).toBeInTheDocument()
  })

  it('should handle multiple toasts', async () => {
    render(<Toaster />)

    const { result } = renderHook(() => useToast(), {
      wrapper: ({ children }) => <>{children}</>
    })

    // Show multiple toasts
    act(() => {
      result.current.toast({ title: 'Toast 1', description: 'First toast' })
      result.current.toast({ title: 'Toast 2', description: 'Second toast' })
    })

    // Due to TOAST_LIMIT = 1, only the most recent toast should be visible
    await waitFor(() => {
      expect(screen.queryByText('Toast 1')).not.toBeInTheDocument()
      expect(screen.getByText('Toast 2')).toBeInTheDocument()
    })
  })
})
