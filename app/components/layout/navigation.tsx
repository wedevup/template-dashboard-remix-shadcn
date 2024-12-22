import * as React from 'react'
import { Link } from '@remix-run/react'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { useAuthStore } from '~/stores/auth-store'
import { cn } from '~/lib/utils'

export function Navigation() {
  const { isAuthenticated, user, logout } = useAuthStore()

  const publicLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' }
  ]

  const privateLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/profile', label: 'Profile' },
    ...(user?.role === 'admin' ? [{ href: '/admin', label: 'Admin' }] : [])
  ]

  return (
    <NavigationMenu.Root className='relative z-10 flex w-full justify-between bg-background'>
      <NavigationMenu.List className='flex items-center space-x-4 p-4'>
        {publicLinks.map(link => (
          <NavigationMenu.Item key={link.href}>
            <Link
              to={link.href}
              className={cn('text-sm font-medium transition-colors hover:text-primary', 'text-foreground/60')}>
              {link.label}
            </Link>
          </NavigationMenu.Item>
        ))}

        {isAuthenticated &&
          privateLinks.map(link => (
            <NavigationMenu.Item key={link.href}>
              <Link
                to={link.href}
                className={cn('text-sm font-medium transition-colors hover:text-primary', 'text-foreground/60')}>
                {link.label}
              </Link>
            </NavigationMenu.Item>
          ))}
      </NavigationMenu.List>

      <div className='flex items-center space-x-4 p-4'>
        {isAuthenticated ? (
          <>
            <span className='text-sm text-foreground/60'>Welcome, {user?.name}</span>
            <button onClick={() => logout()} className='text-sm font-medium text-foreground/60 hover:text-primary'>
              Logout
            </button>
          </>
        ) : (
          <Link to='/auth/login' className='text-sm font-medium text-foreground/60 hover:text-primary'>
            Login
          </Link>
        )}
      </div>
    </NavigationMenu.Root>
  )
}
