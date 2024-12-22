import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  name: string
}

interface AuthState {
  token: string | null
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      token: null,
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        // In a real app, this would make an API call
        // For now, we'll just simulate a successful login with mock data
        if (email && password) {
          const mockUser = {
            id: '1',
            email,
            name: 'Test User'
          }
          set({
            token: 'mock-jwt-token',
            user: mockUser,
            isAuthenticated: true
          })
        }
      },

      logout: () => {
        set({
          token: null,
          user: null,
          isAuthenticated: false
        })
      }
    }),
    {
      name: 'auth-storage'
    }
  )
)
