import { http, HttpResponse } from 'msw'

export const handlers = [
  http.post('/api/auth/login', async ({ request }) => {
    const { email, password } = await request.json()

    // Mock successful login
    if (email === 'test@example.com' && password === 'password123') {
      return HttpResponse.json({
        token: 'mock-jwt-token',
        user: {
          id: '1',
          email: 'test@example.com',
          name: 'Test User'
        }
      })
    }

    // Mock failed login
    return new HttpResponse(null, {
      status: 401,
      statusText: 'Unauthorized'
    })
  })
]
