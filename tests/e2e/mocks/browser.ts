import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)

// Start the worker
worker.start({
  onUnhandledRequest: 'bypass' // Don't warn about unhandled requests
})
