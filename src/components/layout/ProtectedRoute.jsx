import { Navigate } from 'react-router-dom'
import { useAuth } from '@context/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()

  console.log('ProtectedRoute: isAuthenticated:', isAuthenticated, 'loading:', loading)

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-text">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    console.log('ProtectedRoute: Redirecting to login')
    return <Navigate to="/login" replace />
  }

  console.log('ProtectedRoute: Rendering protected content')
  return children
}

export default ProtectedRoute
