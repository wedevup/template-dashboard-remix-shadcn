import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import { authService } from '~/api/services/auth-service'

// Mock axios
vi.mock('axios', () => ({
  default: {
    post: vi.fn(),
    isAxiosError: vi.fn()
  }
}))

describe('AuthService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('login', () => {
    it('should successfully login with valid credentials', async () => {
      const mockResponse = {
        data: {
          token: 'test-token',
          user: {
            id: '1',
            email: 'test@example.com',
            name: 'Test User'
          }
        }
      }

      vi.mocked(axios.post).mockResolvedValueOnce(mockResponse)

      const result = await authService.login('test@example.com', 'password')

      expect(axios.post).toHaveBeenCalledWith('/api/auth/login', {
        email: 'test@example.com',
        password: 'password'
      })
      expect(result).toEqual(mockResponse.data)
    })

    it('should throw error with invalid credentials', async () => {
      const errorResponse = {
        response: {
          data: {
            message: 'Invalid credentials'
          },
          status: 401
        }
      }

      vi.mocked(axios.post).mockRejectedValueOnce(errorResponse)
      vi.mocked(axios.isAxiosError).mockReturnValueOnce(true)

      await expect(authService.login('wrong@example.com', 'wrongpass')).rejects.toEqual({
        message: 'Invalid credentials',
        status: 401
      })
    })

    it('should throw generic error when network fails', async () => {
      vi.mocked(axios.post).mockRejectedValueOnce(new Error())
      vi.mocked(axios.isAxiosError).mockReturnValueOnce(false)

      await expect(authService.login('test@example.com', 'password')).rejects.toThrow('Login failed')
    })
  })

  describe('logout', () => {
    it('should successfully logout', async () => {
      vi.mocked(axios.post).mockResolvedValueOnce({})

      await expect(authService.logout()).resolves.not.toThrow()
      expect(axios.post).toHaveBeenCalledWith('/api/auth/logout')
    })

    it('should throw error when logout fails', async () => {
      const errorResponse = {
        response: {
          data: {
            message: 'Logout failed'
          }
        }
      }

      vi.mocked(axios.post).mockRejectedValueOnce(errorResponse)
      vi.mocked(axios.isAxiosError).mockReturnValueOnce(true)

      await expect(authService.logout()).rejects.toThrow('Logout failed')
    })

    it('should throw generic error when network fails during logout', async () => {
      vi.mocked(axios.post).mockRejectedValueOnce(new Error())
      vi.mocked(axios.isAxiosError).mockReturnValueOnce(false)

      await expect(authService.logout()).rejects.toThrow('Logout failed')
    })
  })
})
