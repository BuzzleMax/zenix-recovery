import { memo } from 'react'
import { motion } from 'framer-motion'
import { Lightbulb, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react'
import Card from '@components/ui/Card'
import { generateInsights, getInsightIcon, getInsightColor } from '@utils/insightsEngine'

const InsightsPanel = memo(({ currentData, historicalData = [] }) => {
  const insights = generateInsights(currentData, historicalData)

  const getIconComponent = (type) => {
    switch (type) {
      case 'success':
        return CheckCircle
      case 'warning':
        return AlertTriangle
      case 'error':
        return AlertTriangle
      default:
        return Lightbulb
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <Card className="relative overflow-hidden">
        <Card.Header>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-400/20 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
            </div>
            <h3 className="text-lg font-semibold text-text">AI Insights</h3>
          </div>
        </Card.Header>

        <Card.Body>
          {insights.length === 0 ? (
            <div className="text-center py-8">
              <Lightbulb className="w-12 h-12 text-text/20 mx-auto mb-3" />
              <p className="text-text/50">Log more data to generate insights</p>
            </div>
          ) : (
            <div className="space-y-4">
              {insights.map((insight, index) => {
    const IconComponent = getIconComponent(insight.type)
    const color = getInsightColor(insight.type)

    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 + index * 0.1 }}
        className={`p-4 rounded-xl bg-${color}/10 border border-${color}/30`}
      >
        <div className="flex items-start space-x-3">
          <div className={`w-8 h-8 bg-${color}/20 rounded-lg flex items-center justify-center flex-shrink-0`}>
            <IconComponent size={18} className={`text-${color}`} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-text mb-1">{insight.title}</p>
            <p className="text-sm text-text/70">{insight.message}</p>
          </div>
          {insight.priority === 'high' && (
            <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full">
              Urgent
            </span>
          )}
        </div>
      </motion.div>
    )
  })}
            </div>
          )}
        </Card.Body>
      </Card>
    </motion.div>
  )
})

InsightsPanel.displayName = 'InsightsPanel'

export default InsightsPanel
