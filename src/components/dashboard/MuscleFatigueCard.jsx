import { motion } from 'framer-motion'
import { Dumbbell, Activity } from 'lucide-react'
import Card from '@components/ui/Card'

const MuscleFatigueCard = () => {
  const muscleData = [
    { name: 'Chest', level: 65, color: 'from-red-500 to-orange-500' },
    { name: 'Shoulders', level: 45, color: 'from-yellow-500 to-yellow-400' },
    { name: 'Forearms', level: 30, color: 'from-emerald to-emerald/80' },
    { name: 'Back', level: 55, color: 'from-cyan to-cyan/80' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl" />
        
        <Card.Header>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-text">Muscle Fatigue</h3>
            </div>
            <Activity className="w-5 h-5 text-text/40" />
          </div>
        </Card.Header>

        <Card.Body>
          <div className="space-y-4">
            {muscleData.map((muscle, index) => (
              <motion.div
                key={muscle.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-text/60">{muscle.name}</span>
                  <span className={`text-sm font-semibold ${
                    muscle.level >= 70 ? 'text-red-400' :
                    muscle.level >= 50 ? 'text-yellow-400' :
                    'text-emerald'
                  }`}>
                    {muscle.level}%
                  </span>
                </div>
                <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${muscle.level}%` }}
                    transition={{ duration: 1, delay: 0.4 + index * 0.1 }}
                    className={`h-full bg-gradient-to-r ${muscle.color} rounded-full`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  )
}

export default MuscleFatigueCard
