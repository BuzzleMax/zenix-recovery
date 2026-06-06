import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import Card from '@components/ui/Card'
import { useRecoveryScore } from '@hooks/useRecoveryScore'
import { getRecoveryCategory } from '@utils/recoveryScore'

const RecoveryScoreCard = () => {
  const { currentScore, loading } = useRecoveryScore()
  const recoveryScore = currentScore || 85
  const category = getRecoveryCategory(recoveryScore)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="relative overflow-hidden">
        {/* Animated glow effect */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-gradient-to-br from-emerald/20 via-cyan/20 to-emerald/20"
        />
        
        <div className="relative z-10">
          <Card.Header>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-emerald/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald" />
                </div>
                <h3 className="text-lg font-semibold text-text">Recovery Score</h3>
              </div>
            </div>
          </Card.Header>

          <Card.Body>
            <div className="flex flex-col items-center justify-center py-8">
              {/* Large percentage display with glow */}
              <div className="relative">
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-emerald/30 blur-3xl rounded-full"
                />
                <div className="relative">
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
                    className="text-7xl font-bold bg-gradient-to-r from-emerald via-cyan to-emerald bg-clip-text text-transparent"
                  >
                    {loading ? '--' : recoveryScore}
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-4xl font-bold text-emerald ml-1"
                  >
                    %
                  </motion.span>
                </div>
              </div>

              {/* Status indicator */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className={`mt-4 px-4 py-2 bg-${category.color}/10 border border-${category.color}/30 rounded-full`}
              >
                <span className={`${category.textColor} font-medium`}>{category.label} Recovery</span>
              </motion.div>

              {/* Progress ring indicator */}
              <div className="mt-6 flex items-center space-x-2">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      className={`w-2 h-2 rounded-full bg-${category.color}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-text/60">Based on your logs</span>
              </div>
            </div>
          </Card.Body>
        </div>
      </Card>
    </motion.div>
  )
}

export default RecoveryScoreCard
