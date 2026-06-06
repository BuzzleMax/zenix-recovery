import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '@lib/supabase'
import { authService } from '@services/authService'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    console.log('AuthContext: Initializing auth...')
    
    // Check if Supabase is available
    if (!supabase) {
      console.error('AuthContext: Supabase client not available')
      setError('Supabase not configured')
      setLoading(false)
      return
    }

    // Check for existing session on mount
    const initializeAuth = async () => {
      try {
        console.log('AuthContext: Getting session...')
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) throw error
        
        console.log('AuthContext: Session retrieved:', !!session)
        setSession(session)
        setUser(session?.user ?? null)
      } catch (err) {
        console.error('AuthContext: Error initializing auth:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('AuthContext: Auth state changed:', event, !!session)
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email, password) => {
    try {
      setError(null)
      setLoading(true)
      
      const data = await authService.signIn(email, password)
      
      setSession(data.session)
      setUser(data.user)
      
      return { success: true, data }
    } catch (err) {
      console.error('AuthContext: Sign in error:', err)
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email, password, username) => {
    try {
      setError(null)
      setLoading(true)
      
      const data = await authService.signUp(email, password, username)
      
      setSession(data.session)
      setUser(data.user)
      
      return { success: true, data }
    } catch (err) {
      console.error('AuthContext: Sign up error:', err)
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setError(null)
      setLoading(true)
      
      await authService.signOut()
      
      setSession(null)
      setUser(null)
      
      return { success: true }
    } catch (err) {
      console.error('AuthContext: Sign out error:', err)
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    session,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  
  return context
}
