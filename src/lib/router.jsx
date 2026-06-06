import { createHashRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { AuthProvider } from '@context/AuthContext'
import DashboardLayout from '@components/layout/DashboardLayout'
import ProtectedRoute from '@components/layout/ProtectedRoute'
import Skeleton from '@components/ui/Skeleton'

// Lazy load pages for code splitting
const Login = lazy(() => import('@pages/Login'))
const Signup = lazy(() => import('@pages/Signup'))
const Dashboard = lazy(() => import('@pages/Dashboard'))
const Analytics = lazy(() => import('@pages/Analytics'))

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center p-4">
    <div className="w-full max-w-md space-y-4">
      <Skeleton variant="card" className="h-64" />
    </div>
  </div>
)

console.log('Router: Creating hash router...')

export const router = createHashRouter([
  {
    path: '/login',
    element: (
      <Suspense fallback={<PageLoader />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '/signup',
    element: (
      <Suspense fallback={<PageLoader />}>
        <Signup />
      </Suspense>
    ),
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: 'recovery-logs',
        element: <div>Recovery Logs</div>,
      },
      {
        path: 'analytics',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Analytics />
          </Suspense>
        ),
      },
      {
        path: 'settings',
        element: <div>Settings</div>,
      },
    ],
  },
])
