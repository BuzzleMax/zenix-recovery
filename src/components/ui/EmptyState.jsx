import { motion } from 'framer-motion'
import { Activity, Plus } from 'lucide-react'

const EmptyState = ({ icon: Icon = Activity, title, description, action, actionLabel }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="w-16 h-16 bg-background/50 border border-border rounded-full flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-text/40" />
      </div>
      <h3 className="text-xl font-semibold text-text mb-2">{title}</h3>
      <p className="text-text/60 text-center max-w-sm mb-6">{description}</p>
      {action && (
        <button
          onClick={action}
          className="bg-gradient-to-r from-emerald to-cyan text-background font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-all flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>{actionLabel}</span>
        </button>
      )}
    </motion.div>
  )
}

export default EmptyState
