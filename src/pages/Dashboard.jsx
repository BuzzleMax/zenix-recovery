import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import RecoveryHero from '@components/dashboard/RecoveryHero'
import SleepPerformancePanel from '@components/dashboard/premium/SleepPerformancePanel'
import MuscleRecoveryPanel from '@components/dashboard/premium/MuscleRecoveryPanel'
import CNSStatusPanel from '@components/dashboard/premium/CNSStatusPanel'
import ArmWrestlingPanel from '@components/dashboard/premium/ArmWrestlingPanel'
import InsightsPanel from '@components/dashboard/premium/InsightsPanel'
import StreakPanel from '@components/dashboard/premium/StreakPanel'
import RecoverySlideOver from '@components/dashboard/premium/RecoverySlideOver'
import { useRecoveryScore } from '@hooks/useRecoveryScore'
import { useAuth } from '@context/AuthContext'
import { supabase } from '@lib/supabase'
import Skeleton from '@components/ui/Skeleton'

const Dashboard = () => {
  const { user } = useAuth()
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [currentData, setCurrentData] = useState(null)
  const [historicalData, setHistoricalData] = useState([])
  const { currentScore, refetch } = useRecoveryScore()

  useEffect(() => {
    fetchDashboardData()
  }, [user])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      if (!user) return

      // Fetch recent recovery logs for insights
      const { data: logs } = await supabase
        .from('recovery_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(30)

      if (logs) {
        setHistoricalData(logs)
        
        // Get most recent data
        if (logs.length > 0) {
          const recent = logs[0]
          setCurrentData({
            recoveryScore: recent.recovery_score,
            cnsData: {
              cnsFatigue: recent.cns_fatigue,
              gripFatigue: recent.grip_fatigue,
              isometricStrain: recent.isometric_strain,
            },
            armwrestlingData: {
              sidePressureFatigue: recent.armwrestling_side_pressure,
            },
          })
        }
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSlideOverClose = () => {
    setIsSlideOverOpen(false)
    refetch() // Refresh recovery score after logging
    fetchDashboardData() // Refresh dashboard data
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-text mb-2">Dashboard</h1>
          <p className="text-text/60">Track your recovery journey</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsSlideOverOpen(true)}
          className="bg-gradient-to-r from-emerald to-cyan text-background font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-all flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Log Recovery</span>
        </motion.button>
      </motion.div>

      {loading ? (
        <div className="space-y-6">
          <Skeleton variant="card" className="h-64" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} variant="card" className="h-48" />
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Recovery Hero Section */}
          <RecoveryHero />

          {/* Streak Panel */}
          <StreakPanel />

          {/* Performance Panels Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SleepPerformancePanel />
            <MuscleRecoveryPanel />
            <CNSStatusPanel />
            <ArmWrestlingPanel />
          </div>

          {/* Insights Panel */}
          <InsightsPanel currentData={currentData} historicalData={historicalData} />
        </>
      )}

      {/* Recovery Slide-over */}
      <RecoverySlideOver
        isOpen={isSlideOverOpen}
        onClose={handleSlideOverClose}
      />
    </div>
  )
}

export default Dashboard
