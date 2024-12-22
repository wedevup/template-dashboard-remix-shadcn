import { Button } from '~/components/ui/button'
import { ProtectedRoute } from '~/components/auth/protected-route'
import { useAuthStore } from '~/stores/auth-store'

export default function DashboardPage() {
  const logout = useAuthStore(state => state.logout)
  const user = useAuthStore(state => state.user)

  return (
    <ProtectedRoute>
      <div className='min-h-screen p-8'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-2xl font-bold'>Dashboard</h1>
          <div className='flex items-center gap-4'>
            <span>Welcome, {user?.name}</span>
            <Button variant='outline' onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
        <p>This is your dashboard. More content coming soon!</p>
      </div>
    </ProtectedRoute>
  )
}
