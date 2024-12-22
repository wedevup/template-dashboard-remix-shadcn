import { useEffect } from 'react'
import { useNavigate } from '@remix-run/react'
import { useAuthStore } from '~/stores/auth-store'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: 'admin' | 'user'
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuthStore()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth/login')
      return
    }

    if (requiredRole && user?.role !== requiredRole) {
      navigate('/unauthorized')
    }
  }, [isAuthenticated, user, requiredRole, navigate])

  if (!isAuthenticated) {
    return null
  }

  if (requiredRole && user?.role !== requiredRole) {
    return null
  }

  return <>{children}</>
}
