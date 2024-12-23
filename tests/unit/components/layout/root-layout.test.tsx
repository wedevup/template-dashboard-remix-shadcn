import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../../utils'
import { RootLayout } from '~/components/layout/root-layout'

// Mock the Navigation component since it's already tested separately
vi.mock('~/components/layout/navigation', () => ({
  Navigation: () => <div data-testid='mock-navigation'>Navigation</div>
}))

describe('RootLayout', () => {
  it('should render navigation and children', () => {
    const testContent = 'Test Content'

    render(
      <RootLayout>
        <div>{testContent}</div>
      </RootLayout>
    )

    // Check navigation is rendered
    expect(screen.getByTestId('mock-navigation')).toBeInTheDocument()

    // Check children are rendered
    expect(screen.getByText(testContent)).toBeInTheDocument()

    // Check container classes
    const container = screen.getByText(testContent).parentElement
    expect(container).toHaveClass('container', 'mx-auto', 'p-4')
  })
})
