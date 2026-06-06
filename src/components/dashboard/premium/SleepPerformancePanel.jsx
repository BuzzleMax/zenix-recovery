import { memo } from 'react'
import { motion } from 'framer-motion'
import { Moon, Bed } from 'lucide-react'
import Card from '@components/ui/Card'

const SleepPerformancePanel = memo(({ sleepData = {} }) => {
  const { totalSleep = 7.5, deepSleep = 1.8, remSleep = 1.5, sleepQuality = 8 } = sleepData

  const metrics = [
    {
      label: 'Total Sleep',
      value: `${totalSleep}h`,
      icon: Bed,
      color: 'purple',
      percentage: Math.min((totalSleep / 9) * 100, 100),
    },
    {
      label: 'Deep Sleep',
      value: `${deepSleep}h`,
      icon: Moon,
      color: 'cyan',
      percentage: Math.min((deepSleep / 2.5) * 100, 100),
    },
    {
      label: 'REM Sleep',
      value: `${remSleep}h`,
      icon: Moon,
      color: 'emerald',
      percentage: Math.min((remSleep / 2.5) * 100, 100),
    },
    {
      label: 'Sleep Quality',
      value: `${sleepQuality}/10`,
      icon: Moon,
      color: 'yellow-400',
      percentage: (sleepQuality / 10) * 100,
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="relative overflow-hidden">
        <Card.Header>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Moon className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-text">Sleep Performance</h3>
          </div>
        </Card.Header>

        <Card.Body>
          <div className="space-y-6">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <metric.icon size={16} className={`text-${metric.color}`} />
                    <span className="text-sm text-text/70">{metric.label}</span>
                  </div>
                  <span className="text-lg font-bold text-text">{metric.value}</span>
                </div>
                <div className="h-2 bg-background rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.percentage}%` }}
                    transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                    className={`h-full bg-gradient-to-r from-${metric.color} to-${metric.color} rounded-full`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  )
})

SleepPerformancePanel.displayName = 'SleepPerformancePanel'

export default SleepPerformancePanel
