import { motion } from 'framer-motion'
import { Moon, BedDouble } from 'lucide-react'
import Card from '@components/ui/Card'

const SleepCard = () => {
  const sleepData = {
    totalSleep: '7h 30m',
    deepSleep: '2h 15m',
    remSleep: '1h 45m',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />
        
        <Card.Header>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Moon className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-text">Sleep Quality</h3>
            </div>
            <BedDouble className="w-5 h-5 text-text/40" />
          </div>
        </Card.Header>

        <Card.Body>
          <div className="space-y-4">
            {/* Total Sleep */}
            <div className="flex items-center justify-between">
              <span className="text-text/60">Total Sleep</span>
              <span className="text-2xl font-bold text-text">{sleepData.totalSleep}</span>
            </div>

            {/* Progress bar for total sleep */}
            <div className="w-full h-2 bg-background rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '94%' }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full"
              />
            </div>

            {/* Deep Sleep & REM Sleep */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-background/50 rounded-lg p-3 border border-border">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  <span className="text-xs text-text/60">Deep Sleep</span>
                </div>
                <p className="text-lg font-semibold text-text">{sleepData.deepSleep}</p>
                <p className="text-xs text-emerald">30% of total</p>
              </div>

              <div className="bg-background/50 rounded-lg p-3 border border-border">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="w-2 h-2 bg-cyan rounded-full" />
                  <span className="text-xs text-text/60">REM Sleep</span>
                </div>
                <p className="text-lg font-semibold text-text">{sleepData.remSleep}</p>
                <p className="text-xs text-emerald">23% of total</p>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  )
}

export default SleepCard
