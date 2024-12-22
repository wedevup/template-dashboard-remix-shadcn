import { json } from '@remix-run/node'
import type { ActionFunction } from '@remix-run/node'

export const action: ActionFunction = async ({ request }) => {
  if (request.method !== 'POST') {
    return json({ message: 'Method not allowed' }, { status: 405 })
  }

  const { email, password } = await request.json()

  // Mock successful login
  if (email === 'test@example.com' && password === 'password123') {
    return json({
      token: 'mock-jwt-token',
      user: {
        id: '1',
        email: 'test@example.com',
        name: 'Test User'
      }
    })
  }

  // Mock failed login
  return json(
    { message: 'Invalid credentials' },
    {
      status: 401
    }
  )
}
