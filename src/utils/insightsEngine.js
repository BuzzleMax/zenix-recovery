/**
 * AI Insights Engine
 * 
 * Generates intelligent athlete feedback based on recovery metrics.
 * Analyzes trends and provides actionable recommendations.
 */

/**
 * Generate insights based on recovery data
 * @param {Object} currentData - Current recovery metrics
 * @param {Array} historicalData - Array of historical recovery logs
 * @returns {Array} Array of insight objects
 */
export const generateInsights = (currentData, historicalData = []) => {
  const insights = []

  if (!currentData) return insights

  // Sleep Insights
  if (currentData.sleepData) {
    const { totalSleepHours, deepSleepHours, remSleepHours } = currentData.sleepData

    if (totalSleepHours < 7) {
      insights.push({
        type: 'warning',
        category: 'sleep',
        title: 'Sleep Duration Below Optimal',
        message: `Your total sleep of ${totalSleepHours.toFixed(1)}h is below the recommended 7-9 hours. Aim for at least 7 hours for optimal recovery.`,
        priority: 'high',
      })
    } else if (totalSleepHours >= 7 && totalSleepHours <= 9) {
      insights.push({
        type: 'success',
        category: 'sleep',
        title: 'Optimal Sleep Duration',
        message: `Great job! Your sleep duration of ${totalSleepHours.toFixed(1)}h is within the optimal range.`,
        priority: 'low',
      })
    }

    const deepSleepPercentage = (deepSleepHours / totalSleepHours) * 100
    if (deepSleepPercentage < 15) {
      insights.push({
        type: 'warning',
        category: 'sleep',
        title: 'Low Deep Sleep',
        message: `Deep sleep is only ${deepSleepPercentage.toFixed(0)}% of total sleep. Consider optimizing your sleep environment and avoiding screens before bed.`,
        priority: 'medium',
      })
    }

    // Historical comparison
    if (historicalData.length >= 7) {
      const lastWeekSleep = historicalData.slice(0, 7).map(log => log.total_sleep_minutes / 60)
      const avgLastWeek = lastWeekSleep.reduce((a, b) => a + b, 0) / lastWeekSleep.length
      const change = ((totalSleepHours - avgLastWeek) / avgLastWeek) * 100

      if (change > 10) {
        insights.push({
          type: 'success',
          category: 'sleep',
          title: 'Sleep Improved',
          message: `Sleep duration increased by ${change.toFixed(0)}% compared to last week. Keep up the great work!`,
          priority: 'medium',
        })
      } else if (change < -10) {
        insights.push({
          type: 'warning',
          category: 'sleep',
          title: 'Sleep Decreased',
          message: `Sleep duration decreased by ${Math.abs(change).toFixed(0)}% compared to last week. Review your sleep schedule.`,
          priority: 'medium',
        })
      }
    }
  }

  // Muscle Fatigue Insights
  if (currentData.fatigueData) {
    const { chest, shoulders, forearms, back } = currentData.fatigueData
    const avgFatigue = (chest + shoulders + forearms + back) / 4

    if (avgFatigue > 60) {
      insights.push({
        type: 'warning',
        category: 'muscle',
        title: 'High Muscle Fatigue',
        message: `Average muscle fatigue is ${avgFatigue.toFixed(0)}%. Consider reducing training intensity or adding recovery days.`,
        priority: 'high',
      })
    }

    if (forearms > 50) {
      insights.push({
        type: 'warning',
        category: 'muscle',
        title: 'Elevated Forearm Fatigue',
        message: `Forearm fatigue remains elevated at ${forearms}%. Focus on forearm stretching and recovery techniques.`,
        priority: 'medium',
      })
    }

    if (shoulders > 50) {
      insights.push({
        type: 'warning',
        category: 'muscle',
        title: 'Shoulder Fatigue High',
        message: `Shoulder fatigue is ${shoulders}%. Consider shoulder mobility work and reduced overhead pressing.`,
        priority: 'medium',
      })
    }
  }

  // CNS Insights
  if (currentData.cnsData) {
    const { cnsFatigue, gripFatigue, isometricStrain } = currentData.cnsData

    if (cnsFatigue > 50) {
      insights.push({
        type: 'warning',
        category: 'cns',
        title: 'High CNS Fatigue',
        message: `CNS fatigue is elevated at ${cnsFatigue}%. Your nervous system needs recovery. Consider reducing high-intensity training.`,
        priority: 'high',
      })
    }

    if (gripFatigue > 60) {
      insights.push({
        type: 'warning',
        category: 'cns',
        title: 'Grip Fatigue Elevated',
        message: `Grip fatigue is ${gripFatigue}%. Focus on grip recovery exercises and reduce heavy grip work.`,
        priority: 'medium',
      })
    }

    if (isometricStrain > 70) {
      insights.push({
        type: 'warning',
        category: 'cns',
        title: 'High Isometric Strain',
        message: `Isometric strain is ${isometricStrain}%. Reduce static holds and focus on dynamic movements.`,
        priority: 'medium',
      })
    }
  }

  // Arm Wrestling Insights
  if (currentData.armwrestlingData) {
    const { sidePressureFatigue, forearmRecovery, trainingLoad } = currentData.armwrestlingData

    if (sidePressureFatigue > 50) {
      insights.push({
        type: 'warning',
        category: 'armwrestling',
        title: 'Side Pressure Fatigue High',
        message: `Side pressure fatigue is ${sidePressureFatigue}%. Recovery score suggests reducing high-intensity side pressure work.`,
        priority: 'high',
      })
    }

    if (forearmRecovery < 50) {
      insights.push({
        type: 'warning',
        category: 'armwrestling',
        title: 'Low Forearm Recovery',
        message: `Forearm recovery is only ${forearmRecovery}%. Prioritize forearm recovery protocols before next training session.`,
        priority: 'high',
      })
    }

    if (trainingLoad > 80) {
      insights.push({
        type: 'warning',
        category: 'armwrestling',
        title: 'High Training Load',
        message: `Training load is ${trainingLoad}%. Consider a deload week to prevent overtraining.`,
        priority: 'medium',
      })
    }
  }

  // Recovery Score Insights
  if (currentData.recoveryScore !== undefined) {
    const score = currentData.recoveryScore

    if (score >= 90) {
      insights.push({
        type: 'success',
        category: 'recovery',
        title: 'Peak Recovery',
        message: `Excellent recovery score of ${score}. You're performing at peak levels. Maintain your current routine.`,
        priority: 'low',
      })
    } else if (score >= 75) {
      insights.push({
        type: 'success',
        category: 'recovery',
        title: 'Good Recovery',
        message: `Recovery score of ${score} is good. Continue with your current training and recovery protocols.`,
        priority: 'low',
      })
    } else if (score >= 60) {
      insights.push({
        type: 'warning',
        category: 'recovery',
        title: 'Moderate Recovery',
        message: `Recovery score of ${score} is moderate. Consider increasing rest and focusing on sleep quality.`,
        priority: 'medium',
      })
    } else {
      insights.push({
        type: 'error',
        category: 'recovery',
        title: 'Poor Recovery',
        message: `Recovery score of ${score} needs attention. Prioritize rest, nutrition, and reduce training intensity.`,
        priority: 'high',
      })
    }
  }

  // Sort insights by priority and return top 5
  const priorityOrder = { high: 0, medium: 1, low: 2 }
  insights.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])

  return insights.slice(0, 5)
}

/**
 * Get insight icon based on type
 */
export const getInsightIcon = (type) => {
  const icons = {
    success: '✓',
    warning: '⚠',
    error: '✕',
    info: 'ℹ',
  }
  return icons[type] || icons.info
}

/**
 * Get insight color based on type
 */
export const getInsightColor = (type) => {
  const colors = {
    success: 'emerald',
    warning: 'yellow-400',
    error: 'red-400',
    info: 'cyan',
  }
  return colors[type] || colors.info
}
