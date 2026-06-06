import { motion } from 'framer-motion'
import { Calendar, TrendingUp, Clock, Target } from 'lucide-react'
import Card from '@components/ui/Card'

const QuickStatsCard = () => {
  const stats = [
    {
      label: "Today's Logs",
      value: '3',
      icon: Calendar,
      color: 'from-emerald to-emerald/80',
      bgColor: 'bg-emerald/20',
      textColor: 'text-emerald',
    },
    {
      label: 'Weekly Average',
      value: '4.2',
      icon: TrendingUp,
      color: 'from-cyan to-cyan/80',
      bgColor: 'bg-cyan/20',
      textColor: 'text-cyan',
    },
    {
      label: 'Active Time',
      value: '2h 15m',
      icon: Clock,
      color: 'from-purple-500 to-purple-400',
      bgColor: 'bg-purple-500/20',
      textColor: 'text-purple-400',
    },
    {
      label: 'Goals Met',
      value: '5/7',
      icon: Target,
      color: 'from-yellow-500 to-yellow-400',
      bgColor: 'bg-yellow-500/20',
      textColor: 'text-yellow-400',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan/20 rounded-full blur-3xl" />
        
        <Card.Header>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-cyan/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-cyan" />
            </div>
            <h3 className="text-lg font-semibold text-text">Quick Stats</h3>
          </div>
        </Card.Header>

        <Card.Body>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-background/50 rounded-lg p-4 border border-border hover:border-border/80 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className={`w-8 h-8 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                    <stat.icon className={`w-4 h-4 ${stat.textColor}`} />
                  </div>
                </div>
                <p className="text-2xl font-bold text-text mb-1">{stat.value}</p>
                <p className="text-xs text-text/60">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  )
}

export default QuickStatsCard
