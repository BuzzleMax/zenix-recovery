import { useState, useEffect } from 'react'
import { useAuth } from '@context/AuthContext'
import { supabase } from '@lib/supabase'

/**
 * Hook for fetching and managing recovery scores
 * @returns {Object} Recovery score data and loading state
 */
export const useRecoveryScore = () => {
  const { user } = useAuth()
  const [currentScore, setCurrentScore] = useState(null)
  const [weeklyScores, setWeeklyScores] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchRecoveryScores()
  }, [user])

  const fetchRecoveryScores = async () => {
    try {
      setLoading(true)
      setError(null)

      if (!user) return

      // Fetch current recovery score (most recent)
      const { data: currentData, error: currentError } = await supabase
        .from('recovery_logs')
        .select('recovery_score, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (currentError && currentError.code !== 'PGRST116') {
        throw currentError
      }

      if (currentData) {
        setCurrentScore(currentData.recovery_score)
      }

      // Fetch weekly recovery scores (last 7 days)
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()

      const { data: weeklyData, error: weeklyError } = await supabase
        .from('recovery_logs')
        .select('recovery_score, created_at')
        .eq('user_id', user.id)
        .gte('created_at', sevenDaysAgo)
        .order('created_at', { ascending: true })

      if (weeklyError) throw weeklyError

      if (weeklyData) {
        setWeeklyScores(weeklyData.map(log => log.recovery_score))
      }

    } catch (err) {
      setError(err.message)
      console.error('Error fetching recovery scores:', err)
    } finally {
      setLoading(false)
    }
  }

  const refetch = () => {
    fetchRecoveryScores()
  }

  return {
    currentScore,
    weeklyScores,
    loading,
    error,
    refetch,
  }
}
