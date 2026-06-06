import { supabase } from '@lib/supabase'

export const authService = {
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      // Map Supabase errors to user-friendly messages
      if (error.message.includes('Invalid login credentials')) {
        throw new Error('Invalid email or password')
      }
      if (error.message.includes('Email not confirmed')) {
        throw new Error('Please verify your email before signing in')
      }
      throw new Error(error.message)
    }

    return {
      user: data.user,
      session: data.session,
    }
  },

  async signUp(email, password, username) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    })

    if (error) {
      // Map Supabase errors to user-friendly messages
      if (error.message.includes('User already registered')) {
        throw new Error('An account with this email already exists')
      }
      if (error.message.includes('Password')) {
        throw new Error('Password must be at least 6 characters')
      }
      throw new Error(error.message)
    }

    // Create profile row after successful signup
    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: data.user.id,
            username,
            email,
            created_at: new Date().toISOString(),
          },
        ])

      if (profileError) {
        console.error('Error creating profile:', profileError)
        // Don't throw error - user is created, profile creation can be retried
      }
    }

    return {
      user: data.user,
      session: data.session,
    }
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()

    if (error) {
      throw new Error(error.message)
    }
  },

  async resetPassword(email) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) {
      throw new Error(error.message)
    }
  },

  async updatePassword(newPassword) {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) {
      throw new Error(error.message)
    }
  },

  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession()

    if (error) {
      throw new Error(error.message)
    }

    return session
  },
}
