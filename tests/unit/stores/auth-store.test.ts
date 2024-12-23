import { describe, it, expect, beforeEach } from 'vitest'
import { useAuthStore } from '~/stores/auth-store'

describe('AuthStore', () => {
  beforeEach(() => {
    // Clear the store before each test
    useAuthStore.setState({ user: null, token: null })
  })

  it('should initialize with null user and token', () => {
    const state = useAuthStore.getState()
    expect(state.user).toBeNull()
    expect(state.token).toBeNull()
  })

  it('should set user', () => {
    const testUser = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User'
    }

    useAuthStore.getState().setUser(testUser)

    const state = useAuthStore.getState()
    expect(state.user).toEqual(testUser)
  })

  it('should set token', () => {
    const testToken = 'test-token'

    useAuthStore.getState().setToken(testToken)

    const state = useAuthStore.getState()
    expect(state.token).toBe(testToken)
  })

  it('should clear user', () => {
    // First set a user
    const testUser = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User'
    }
    useAuthStore.getState().setUser(testUser)

    // Then clear it
    useAuthStore.getState().setUser(null)

    const state = useAuthStore.getState()
    expect(state.user).toBeNull()
  })

  it('should clear token', () => {
    // First set a token
    useAuthStore.getState().setToken('test-token')

    // Then clear it
    useAuthStore.getState().setToken(null)

    const state = useAuthStore.getState()
    expect(state.token).toBeNull()
  })
})
