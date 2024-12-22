import { useMutation } from '@tanstack/react-query'
import { authService } from '../services/auth-service'
import { useAuthStore } from '~/stores/auth-store'

export function useAuth() {
  const setUser = useAuthStore(state => state.setUser)
  const setToken = useAuthStore(state => state.setToken)

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const response = await authService.login(email, password)
      return response
    },
    onSuccess: data => {
      setUser(data.user)
      setToken(data.token)
    }
  })

  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      setUser(null)
      setToken(null)
    }
  })

  return {
    login: loginMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    isLoading: loginMutation.isPending || logoutMutation.isPending,
    error: loginMutation.error || logoutMutation.error
  }
}
