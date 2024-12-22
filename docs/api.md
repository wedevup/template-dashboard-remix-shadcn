# API Documentation

## Base URL

`/api/v1`

## Authentication

All authenticated endpoints require a valid JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### POST /auth/login

Login with email and password.

```typescript
Request: {
  email: string
  password: string
}

Response: {
  token: string
  user: {
    id: string
    email: string
    name: string
    role: 'admin' | 'user'
  }
}
```

#### POST /auth/register

Register a new user.

```typescript
Request: {
  email: string
  password: string
  name: string
}

Response: {
  token: string
  user: {
    id: string
    email: string
    name: string
    role: 'user'
  }
}
```

### Users

#### GET /users/me

Get current user profile.

```typescript
Response: {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
  settings: {
    theme: 'light' | 'dark'
    notifications: boolean
  }
}
```

#### PUT /users/me

Update current user profile.

```typescript
Request:
{
  name?: string
  settings?: {
    theme?: 'light' | 'dark'
    notifications?: boolean
  }
}

Response:
{
  id: string
  email: string
  name: string
  settings: {
    theme: 'light' | 'dark'
    notifications: boolean
  }
}
```

### Dashboard

#### GET /dashboard/stats

Get dashboard statistics.

```typescript
Response: {
  totalUsers: number
  activeUsers: number
  dailyActiveUsers: number
  metrics: {
    daily: Array<{
      date: string
      value: number
    }>
    weekly: Array<{
      date: string
      value: number
    }>
  }
}
```

## Error Responses

All endpoints return consistent error responses:

```typescript
{
  error: {
    code: string
    message: string
    details?: any
  }
}
```

Common error codes:

- `AUTH_REQUIRED`: Authentication required
- `INVALID_CREDENTIALS`: Invalid login credentials
- `VALIDATION_ERROR`: Invalid request data
- `NOT_FOUND`: Resource not found
- `FORBIDDEN`: Permission denied
- `INTERNAL_ERROR`: Server error

## Rate Limiting

- 100 requests per minute for authenticated users
- 20 requests per minute for unauthenticated users
- Rate limit headers included in responses:
  ```
  X-RateLimit-Limit: 100
  X-RateLimit-Remaining: 99
  X-RateLimit-Reset: 1640995200
  ```
