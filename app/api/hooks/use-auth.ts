import { useMutation } from '@tanstack/react-query'
import { authService } from '../services/auth-service'
import { useAuthStore } from '~/stores/auth-store'

export function useAuth() {
  const setUser = useAuthStore(state => state.setUser)
  const setToken = useAuthStore(state => state.setToken)

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      try {
        const response = await authService.login(email, password)
        if (!response?.user) {
          throw new Error('Login failed')
        }
        setUser(response.user)
        setToken(response.token)
        return response
      } catch (error) {
        setUser(null)
        setToken(null)
        // Rethrow the original error to match test expectations
        throw error
      }
    }
  })

  const logoutMutation = useMutation({
    mutationFn: async () => {
      try {
        await authService.logout()
        setUser(null)
        setToken(null)
      } catch (error) {
        // Still clear the state on error
        setUser(null)
        setToken(null)
        // Rethrow the original error to match test expectations
        throw error
      }
    }
  })

  return {
    login: loginMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    isLoading: loginMutation.isPending || logoutMutation.isPending,
    error: loginMutation.error || logoutMutation.error
  }
}
