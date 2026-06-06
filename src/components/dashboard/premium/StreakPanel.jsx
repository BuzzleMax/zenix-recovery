import { memo } from 'react'
import { motion } from 'framer-motion'
import { Flame, Trophy, Target } from 'lucide-react'
import Card from '@components/ui/Card'
import { useStreak } from '@hooks/useStreak'

const StreakPanel = memo(() => {
  const { currentStreak, longestStreak, loading, getStreakMessage, getStreakColor } = useStreak()

  const getMilestone = (streak) => {
    if (streak >= 100) return { label: '100 Days', icon: Trophy, color: 'purple' }
    if (streak >= 30) return { label: '30 Days', icon: Trophy, color: 'cyan' }
    if (streak >= 7) return { label: '7 Days', icon: Target, color: 'emerald' }
    return { label: '1 Day', icon: Flame, color: 'yellow-400' }
  }

  const milestone = getMilestone(currentStreak)
  const MilestoneIcon = milestone.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <Card className="relative overflow-hidden">
        {/* Animated glow */}
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
          className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-yellow-400/10 to-orange-500/10"
        />

        <div className="relative z-10">
          <Card.Header>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <Flame className="w-5 h-5 text-orange-400" />
                </div>
                <h3 className="text-lg font-semibold text-text">Current Streak</h3>
              </div>
              {longestStreak > 0 && (
                <div className="text-sm text-text/60">
                  Best: {longestStreak} days
                </div>
              )}
            </div>
          </Card.Header>

          <Card.Body>
            <div className="flex flex-col items-center justify-center py-6">
              {/* Streak Number */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="relative"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-orange-500/30 blur-3xl rounded-full"
                />
                <div className="relative">
                  <span className={`text-6xl font-bold ${getStreakColor()}`}>
                    {loading ? '--' : currentStreak}
                  </span>
                  <span className={`text-2xl font-bold ${getStreakColor()} ml-1`}>
                    {currentStreak === 1 ? 'day' : 'days'}
                  </span>
                </div>
              </motion.div>

              {/* Motivational Message */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`mt-4 text-lg font-medium ${getStreakColor()}`}
              >
                {getStreakMessage()}
              </motion.p>

              {/* Milestone Badge */}
              {currentStreak > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className={`mt-6 px-4 py-2 bg-${milestone.color}/10 border border-${milestone.color}/30 rounded-full flex items-center space-x-2`}
                >
                  <MilestoneIcon size={16} className={`text-${milestone.color}`} />
                  <span className={`text-sm font-medium text-${milestone.color}`}>
                    {milestone.label} Milestone
                  </span>
                </motion.div>
              )}

              {/* Progress to next milestone */}
              {currentStreak > 0 && currentStreak < 100 && (
                <div className="mt-6 w-full">
                  <div className="flex justify-between text-xs text-text/50 mb-2">
                    <span>Progress to next milestone</span>
                    <span>
                      {currentStreak < 7 ? `${7 - currentStreak} days to 7` : 
                       currentStreak < 30 ? `${30 - currentStreak} days to 30` : 
                       `${100 - currentStreak} days to 100`}
                    </span>
                  </div>
                  <div className="h-2 bg-background rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ 
                        width: `${currentStreak < 7 ? (currentStreak / 7) * 100 : 
                               currentStreak < 30 ? ((currentStreak - 7) / 23) * 100 : 
                               ((currentStreak - 30) / 70) * 100}%`
                      }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full"
                    />
                  </div>
                </div>
              )}
            </div>
          </Card.Body>
        </div>
      </Card>
    </motion.div>
  )
})

StreakPanel.displayName = 'StreakPanel'

export default StreakPanel
