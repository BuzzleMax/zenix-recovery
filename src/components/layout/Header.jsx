import { motion } from 'framer-motion'
import { useAuth } from '@context/AuthContext'
import { useRecoveryScore } from '@hooks/useRecoveryScore'
import { getRecoveryCategory } from '@utils/recoveryScore'
import { Menu, Bell, TrendingUp, User } from 'lucide-react'

const Header = ({ onMenuClick }) => {
  const { user } = useAuth()
  const { currentScore, loading } = useRecoveryScore()
  const recoveryScore = currentScore || 85
  const category = getRecoveryCategory(recoveryScore)

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-panel border-b border-border px-6 py-4"
    >
      <div className="flex items-center justify-between">
        {/* Left side - Mobile menu & Greeting */}
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-background/50 transition-colors"
          >
            <Menu className="w-6 h-6 text-text" />
          </button>

          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold text-text">
              {getGreeting()},{' '}
              <span className="text-emerald">
                {user?.email?.split('@')[0] || 'Athlete'}
              </span>
            </h2>
            <p className="text-sm text-text/60">Ready to track your recovery?</p>
          </motion.div>
        </div>

        {/* Right side - Recovery Score & Actions */}
        <div className="flex items-center space-x-4">
          {/* Recovery Score */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="hidden md:flex items-center space-x-3 bg-background/50 px-4 py-2 rounded-lg border border-border"
          >
            <TrendingUp className={`w-5 h-5 ${category.textColor}`} />
            <div>
              <p className="text-xs text-text/60">Recovery Score</p>
              <p className={`text-lg font-bold ${category.textColor}`}>
                {loading ? '--' : recoveryScore}%
              </p>
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 rounded-lg hover:bg-background/50 transition-colors"
          >
            <Bell className="w-6 h-6 text-text" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-emerald rounded-full" />
          </motion.button>

          {/* User Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="w-10 h-10 bg-gradient-to-br from-cyan to-emerald rounded-full flex items-center justify-center"
          >
            <User className="w-5 h-5 text-background" />
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header
