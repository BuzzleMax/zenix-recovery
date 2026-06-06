import { memo } from 'react'
import { motion } from 'framer-motion'
import { useRecoveryScore } from '@hooks/useRecoveryScore'
import { getRecoveryStatus } from '@utils/recoveryEngine'
import { Clock } from 'lucide-react'

const RecoveryHero = memo(() => {
  const { currentScore, loading } = useRecoveryScore()
  const score = currentScore || 0
  const { status, color, textColor } = getRecoveryStatus(score)
  const circumference = 2 * Math.PI * 120
  const strokeDashoffset = circumference - (score / 100) * circumference

  const lastUpdate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative bg-panel border border-border rounded-2xl p-8 overflow-hidden"
    >
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
        className="absolute inset-0 bg-gradient-to-br from-emerald/10 via-cyan/10 to-emerald/10"
      />

      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Recovery Ring */}
          <div className="relative">
            <svg className="w-64 h-64 transform -rotate-90">
              {/* Background circle */}
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="#161B26"
                strokeWidth="12"
                fill="none"
              />
              {/* Progress circle */}
              <motion.circle
                cx="128"
                cy="128"
                r="120"
                stroke={`url(#gradient-${color})`}
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                style={{ strokeDasharray: circumference }}
              />
              {/* Gradient definition */}
              <defs>
                <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00FF9D" />
                  <stop offset="100%" stopColor="#00D9FF" />
                </linearGradient>
              </defs>
            </svg>

            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
                className="text-5xl font-bold bg-gradient-to-r from-emerald via-cyan to-emerald bg-clip-text text-transparent"
              >
                {loading ? '--' : score}
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-sm text-text/60 mt-1"
              >
                RECOVERY SCORE
              </motion.span>
            </div>
          </div>

          {/* Status and Info */}
          <div className="flex-1 space-y-6">
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center space-x-2"
            >
              <div className={`w-3 h-3 rounded-full bg-${color} animate-pulse`} />
              <span className={`text-2xl font-bold ${textColor}`}>{status} Recovery</span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-text/70 text-lg"
            >
              {score >= 90 && 'You are performing at peak levels. Maintain your current recovery routine.'}
              {score >= 75 && score < 90 && 'Good recovery status. Continue with your current training and recovery protocols.'}
              {score >= 60 && score < 75 && 'Moderate recovery. Consider increasing rest and focusing on sleep quality.'}
              {score < 60 && 'Recovery needs attention. Prioritize rest, nutrition, and reduce training intensity.'}
            </motion.p>

            {/* Last Update */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center space-x-2 text-text/50 text-sm"
            >
              <Clock size={16} />
              <span>Last updated: {lastUpdate}</span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
})

RecoveryHero.displayName = 'RecoveryHero'

export default RecoveryHero
