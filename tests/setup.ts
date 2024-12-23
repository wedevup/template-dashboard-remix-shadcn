import '@testing-library/jest-dom'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import { queryClient } from '~/api/config/query-client'

// Automatically cleanup after each test
afterEach(() => {
  cleanup()
  queryClient.clear()
})
