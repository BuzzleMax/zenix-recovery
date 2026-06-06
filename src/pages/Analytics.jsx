import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@context/AuthContext'
import { supabase } from '@lib/supabase'
import Card from '@components/ui/Card'
import RecoveryTrendChart from '@components/charts/premium/RecoveryTrendChart'
import CNSChart from '@components/charts/premium/CNSChart'
import SleepTrendChart from '@components/charts/SleepTrendChart'
import FatigueTrendChart from '@components/charts/FatigueTrendChart'
import { TrendingUp, Moon, Activity, Brain, Calendar } from 'lucide-react'

const Analytics = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('weekly')
  const [weeklyData, setWeeklyData] = useState(null)
  const [monthlyData, setMonthlyData] = useState(null)
  const [sleepData, setSleepData] = useState(null)
  const [fatigueData, setFatigueData] = useState(null)
  const [cnsData, setCnsData] = useState(null)

  useEffect(() => {
    fetchAnalyticsData()
  }, [user, timeRange])

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true)

      const days = timeRange === 'weekly' ? 7 : timeRange === 'monthly' ? 30 : 90
      const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

      // Fetch sleep logs
      const { data: sleepLogs } = await supabase
        .from('sleep_logs')
        .select('*')
        .eq('user_id', user.id)
        .gte('log_date', startDate)
        .order('log_date', { ascending: true })

      // Fetch fatigue logs
      const { data: fatigueLogs } = await supabase
        .from('fatigue_logs')
        .select('*')
        .eq('user_id', user.id)
        .gte('log_date', startDate)
        .order('log_date', { ascending: true })

      // Fetch CNS logs
      const { data: cnsLogs } = await supabase
        .from('cns_logs')
        .select('*')
        .eq('user_id', user.id)
        .gte('log_date', startDate)
        .order('log_date', { ascending: true })

      // Process sleep data
      if (sleepLogs && sleepLogs.length > 0) {
        const sleepHours = sleepLogs.map(log => log.total_sleep_minutes / 60)
        setSleepData(sleepHours)
      }

      // Process fatigue data
      if (fatigueLogs && fatigueLogs.length > 0) {
        setFatigueData({
          chest: fatigueLogs.map(log => log.chest_fatigue),
          shoulders: fatigueLogs.map(log => log.shoulders_fatigue),
          forearms: fatigueLogs.map(log => log.forearms_fatigue),
          back: fatigueLogs.map(log => log.back_fatigue),
        })
      }

      // Process CNS data
      if (cnsLogs && cnsLogs.length > 0) {
        setCnsData({
          cnsFatigue: cnsLogs.map(log => log.cns_fatigue),
          gripFatigue: cnsLogs.map(log => log.grip_fatigue),
          isometricStrain: cnsLogs.map(log => log.isometric_strain),
        })
      }

      // Placeholder recovery data
      setWeeklyData([75, 82, 78, 85, 88, 80, 85])
      setMonthlyData([78, 82, 85, 88])

    } catch (error) {
      console.error('Error fetching analytics data:', error)
    } finally {
      setLoading(false)
    }
  }

  const timeRanges = [
    { value: 'weekly', label: '7 Days' },
    { value: 'monthly', label: '30 Days' },
    { value: 'quarterly', label: '90 Days' },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-text">Loading analytics...</div>
      </div>
    )
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
          <h1 className="text-3xl font-bold text-text mb-2">Analytics</h1>
          <p className="text-text/60">Track your recovery trends over time</p>
        </div>
        <div className="flex items-center space-x-2 bg-panel border border-border rounded-lg p-1">
          {timeRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => setTimeRange(range.value)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                timeRange === range.value
                  ? 'bg-emerald text-background'
                  : 'text-text/60 hover:text-text hover:bg-background/50'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Recovery Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recovery Trend */}
        <Card>
          <Card.Header>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-emerald" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text">Recovery Trend</h3>
                <p className="text-sm text-text/60">Recovery score over time</p>
              </div>
            </div>
          </Card.Header>
          <Card.Body>
            <RecoveryTrendChart timeRange={timeRange} />
          </Card.Body>
        </Card>

        {/* CNS Status */}
        <Card>
          <Card.Header>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text">CNS Status</h3>
                <p className="text-sm text-text/60">CNS, Grip, and Isometric metrics</p>
              </div>
            </div>
          </Card.Header>
          <Card.Body>
            <CNSChart timeRange={timeRange} />
          </Card.Body>
        </Card>
      </div>

      {/* Sleep and Fatigue Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sleep Trend */}
        <Card>
          <Card.Header>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Moon className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text">Sleep Trends</h3>
                <p className="text-sm text-text/60">Total vs Deep Sleep</p>
              </div>
            </div>
          </Card.Header>
          <Card.Body>
            <SleepTrendChart data={sleepData} />
          </Card.Body>
        </Card>

        {/* Fatigue Trend */}
        <Card>
          <Card.Header>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text">Muscle Fatigue</h3>
                <p className="text-sm text-text/60">By body part</p>
              </div>
            </div>
          </Card.Header>
          <Card.Body>
            <FatigueTrendChart data={fatigueData} />
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}

export default Analytics
