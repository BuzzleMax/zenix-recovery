import { memo } from 'react'
import { motion } from 'framer-motion'
import { Dumbbell } from 'lucide-react'
import Card from '@components/ui/Card'

const MuscleRecoveryPanel = memo(({ fatigueData = {} }) => {
  const { chest = 30, shoulders = 40, forearms = 25, back = 35 } = fatigueData

  const metrics = [
    { label: 'Chest', value: chest, color: 'red' },
    { label: 'Shoulders', value: shoulders, color: 'yellow-400' },
    { label: 'Forearms', value: forearms, color: 'emerald' },
    { label: 'Back', value: back, color: 'cyan' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="relative overflow-hidden">
        <Card.Header>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-emerald" />
            </div>
            <h3 className="text-lg font-semibold text-text">Muscle Recovery</h3>
          </div>
        </Card.Header>

        <Card.Body>
          <div className="space-y-5">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text/70">{metric.label}</span>
                  <span className="text-lg font-bold text-text">{metric.value}%</span>
                </div>
                <div className="h-2 bg-background rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.value}%` }}
                    transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                    className={`h-full bg-${metric.color} rounded-full`}
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

MuscleRecoveryPanel.displayName = 'MuscleRecoveryPanel'

export default MuscleRecoveryPanel
