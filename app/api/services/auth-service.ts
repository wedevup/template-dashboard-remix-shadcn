import axios from 'axios'

interface LoginResponse {
  token: string
  user: {
    id: string
    email: string
    name: string
  }
}

interface LoginError {
  message: string
  status: number
}

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await axios.post<LoginResponse>('/api/auth/login', {
        email,
        password
      })
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const loginError: LoginError = {
          message: error.response?.data?.message || 'Login failed',
          status: error.response?.status || 500
        }
        throw loginError
      }
      throw new Error('Login failed')
    }
  },

  async logout(): Promise<void> {
    try {
      await axios.post('/api/auth/logout')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Logout failed')
      }
      throw new Error('Logout failed')
    }
  }
}
