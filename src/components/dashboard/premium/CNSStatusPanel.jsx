import { memo } from 'react'
import { motion } from 'framer-motion'
import { Brain, Hand } from 'lucide-react'
import Card from '@components/ui/Card'

const CNSStatusPanel = memo(({ cnsData = {} }) => {
  const { cnsFatigue = 20, gripFatigue = 25, isometricStrain = 30 } = cnsData

  const metrics = [
    {
      label: 'CNS Fatigue',
      value: cnsFatigue,
      icon: Brain,
      color: 'purple',
      description: 'Central nervous system recovery',
    },
    {
      label: 'Grip Fatigue',
      value: gripFatigue,
      icon: Hand,
      color: 'cyan',
      description: 'Grip strength recovery',
    },
    {
      label: 'Isometric Strain',
      value: isometricStrain,
      icon: Hand,
      color: 'emerald',
      description: 'Isometric tension level',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="relative overflow-hidden">
        <Card.Header>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-text">CNS Status</h3>
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

CNSStatusPanel.displayName = 'CNSStatusPanel'

export default CNSStatusPanel
