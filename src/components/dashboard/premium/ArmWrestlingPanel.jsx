import { memo } from 'react'
import { motion } from 'framer-motion'
import { Armchair, Target, Zap } from 'lucide-react'
import Card from '@components/ui/Card'

const ArmWrestlingPanel = memo(({ armwrestlingData = {} }) => {
  const { sidePressureFatigue = 35, forearmRecovery = 70, trainingLoad = 60 } = armwrestlingData

  const metrics = [
    {
      label: 'Side Pressure Fatigue',
      value: sidePressureFatigue,
      icon: Armchair,
      color: 'red',
      description: 'Side pressure recovery',
    },
    {
      label: 'Forearm Recovery',
      value: forearmRecovery,
      icon: Target,
      color: 'emerald',
      description: 'Forearm recovery percentage',
    },
    {
      label: 'Training Load',
      value: trainingLoad,
      icon: Zap,
      color: 'yellow-400',
      description: 'Current training intensity',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="relative overflow-hidden">
        <Card.Header>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
              <Armchair className="w-5 h-5 text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-text">Arm Wrestling Recovery</h3>
          </div>
        </Card.Header>

        <Card.Body>
          <div className="space-y-6">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <metric.icon size={18} className={`text-${metric.color}`} />
                    <div>
                      <p className="text-sm font-medium text-text">{metric.label}</p>
                      <p className="text-xs text-text/50">{metric.description}</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-text">{metric.value}%</span>
                </div>
                <div className="h-3 bg-background rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.value}%` }}
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

ArmWrestlingPanel.displayName = 'ArmWrestlingPanel'

export default ArmWrestlingPanel
