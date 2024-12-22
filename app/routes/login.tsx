import { useNavigate } from '@remix-run/react'
import { LoginForm } from '~/components/auth/LoginForm'
import { useAuth } from '~/api/hooks/use-auth'
import { useEffect } from 'react'
import { useToast } from '~/components/ui/use-toast'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login, isLoading, error } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    if (error) {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: error instanceof Error ? error.message : 'An error occurred during login'
      })
    }
  }, [error, toast])

  const handleLogin = async (email: string, password: string) => {
    try {
      await login({ email, password })
      navigate('/dashboard')
    } catch (error) {
      // Error handling is done in the useEffect above
      console.error('Login failed:', error)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
    </div>
  )
}
