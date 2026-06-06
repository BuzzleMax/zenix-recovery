import { useState, useEffect } from 'react'
import { useAuth } from '@context/AuthContext'
import { supabase } from '@lib/supabase'

/**
 * Hook for calculating and managing user streaks
 */
export const useStreak = () => {
  const { user } = useAuth()
  const [currentStreak, setCurrentStreak] = useState(0)
  const [longestStreak, setLongestStreak] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStreakData()
  }, [user])

  const fetchStreakData = async () => {
    try {
      setLoading(true)
      if (!user) return

      // Fetch all recovery logs
      const { data: logs, error } = await supabase
        .from('recovery_logs')
        .select('created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      if (!logs || logs.length === 0) {
        setCurrentStreak(0)
        setLongestStreak(0)
        return
      }

      // Calculate current streak
      let streak = 0
      let currentDate = new Date()
      currentDate.setHours(0, 0, 0, 0)

      const uniqueDates = new Set(
        logs.map(log => new Date(log.created_at).toDateString())
      )

      for (let i = 0; i < 365; i++) {
        const checkDate = new Date(currentDate)
        checkDate.setDate(checkDate.getDate() - i)

        if (uniqueDates.has(checkDate.toDateString())) {
          streak++
        } else if (i === 0) {
          // Today not logged, check yesterday
          continue
        } else {
          break
        }
      }

      setCurrentStreak(streak)

      // Calculate longest streak
      let maxStreak = 0
      let tempStreak = 0
      const sortedDates = Array.from(uniqueDates).sort((a, b) => new Date(a) - new Date(b))

      for (let i = 0; i < sortedDates.length; i++) {
        const currentDate = new Date(sortedDates[i])
        const prevDate = i > 0 ? new Date(sortedDates[i - 1]) : null

        if (prevDate) {
          const diffDays = Math.floor((currentDate - prevDate) / (1000 * 60 * 60 * 24))
          if (diffDays === 1) {
            tempStreak++
          } else {
            maxStreak = Math.max(maxStreak, tempStreak)
            tempStreak = 1
          }
        } else {
          tempStreak = 1
        }
      }

      maxStreak = Math.max(maxStreak, tempStreak)
      setLongestStreak(maxStreak)

    } catch (error) {
      console.error('Error fetching streak data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStreakMessage = () => {
    if (currentStreak === 0) return 'Start logging to build your streak!'
    if (currentStreak === 1) return '1 day streak! Keep going!'
    if (currentStreak < 7) return `${currentStreak} day streak! Building momentum.`
    if (currentStreak < 30) return `${currentStreak} day streak! Great consistency!`
    if (currentStreak < 100) return `${currentStreak} day streak! Elite level!`
    return `${currentStreak} day streak! Legendary!`
  }

  const getStreakColor = () => {
    if (currentStreak < 7) return 'text-yellow-400'
    if (currentStreak < 30) return 'text-emerald'
    if (currentStreak < 100) return 'text-cyan'
    return 'text-purple-400'
  }

  return {
    currentStreak,
    longestStreak,
    loading,
    getStreakMessage,
    getStreakColor,
    refetch: fetchStreakData,
  }
}
