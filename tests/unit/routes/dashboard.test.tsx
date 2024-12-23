import { describe, it, expect } from 'vitest'
import { render, screen } from '../../utils'
import DashboardPage from '~/routes/dashboard'

describe('DashboardPage', () => {
  it('should render dashboard content', () => {
    render(<DashboardPage />)

    // Check heading is present
    expect(screen.getByRole('heading', { name: /welcome to dashboard/i })).toBeInTheDocument()

    // Check container classes
    const container = screen.getByRole('heading').parentElement
    expect(container).toHaveClass('min-h-screen', 'flex', 'items-center', 'justify-center', 'bg-gray-50')
  })
})
