import { Navigate } from '@remix-run/react'
import { useAuthStore } from '~/stores/auth-store'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to='/login' />
  }

  return <>{children}</>
}
