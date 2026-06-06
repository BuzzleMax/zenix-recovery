/**
 * Recovery Score Calculation Engine
 * 
 * Formula Explanation:
 * The recovery score is calculated based on four key factors:
 * 
 * 1. Sleep Quality (40% weight):
 *    - Total Sleep: Optimal is 7-9 hours (score 0-100)
 *    - Deep Sleep: Should be 20-25% of total sleep (score 0-100)
 *    - REM Sleep: Should be 20-25% of total sleep (score 0-100)
 * 
 * 2. Muscle Fatigue (60% weight):
 *    - Inverse relationship: Lower fatigue = higher recovery
 *    - Average fatigue across all muscle groups (score 0-100)
 * 
 * Final Score Formula:
 * Recovery Score = (Sleep Quality Score * 0.4) + (Muscle Recovery Score * 0.6)
 * 
 * Scoring Ranges:
 * - 90-100: Excellent Recovery
 * - 75-89: Good Recovery
 * - 60-74: Moderate Recovery
 * - 40-59: Poor Recovery
 * - 0-39: Critical Recovery Needed
 */

/**
 * Calculate sleep quality score (0-100)
 * @param {number} totalSleepHours - Total sleep in hours
 * @param {number} deepSleepHours - Deep sleep in hours
 * @param {number} remSleepHours - REM sleep in hours
 * @returns {number} Sleep quality score (0-100)
 */
export const calculateSleepQualityScore = (totalSleepHours, deepSleepHours, remSleepHours) => {
  if (!totalSleepHours || totalSleepHours <= 0) return 0

  // Total Sleep Score (optimal: 7-9 hours)
  let totalSleepScore = 0
  if (totalSleepHours >= 7 && totalSleepHours <= 9) {
    totalSleepScore = 100
  } else if (totalSleepHours >= 6 && totalSleepHours < 7) {
    totalSleepScore = 80
  } else if (totalSleepHours >= 5 && totalSleepHours < 6) {
    totalSleepScore = 60
  } else if (totalSleepHours >= 9 && totalSleepHours <= 10) {
    totalSleepScore = 90
  } else if (totalSleepHours > 10) {
    totalSleepScore = 70 // Oversleeping can be detrimental
  } else {
    totalSleepScore = 30
  }

  // Deep Sleep Score (optimal: 20-25% of total sleep)
  let deepSleepPercentage = totalSleepHours > 0 ? (deepSleepHours / totalSleepHours) * 100 : 0
  let deepSleepScore = 0
  if (deepSleepPercentage >= 20 && deepSleepPercentage <= 25) {
    deepSleepScore = 100
  } else if (deepSleepPercentage >= 15 && deepSleepPercentage < 20) {
    deepSleepScore = 80
  } else if (deepSleepPercentage >= 25 && deepSleepPercentage <= 30) {
    deepSleepScore = 80
  } else if (deepSleepPercentage >= 10 && deepSleepPercentage < 15) {
    deepSleepScore = 50
  } else if (deepSleepPercentage > 30) {
    deepSleepScore = 60
  } else {
    deepSleepScore = 20
  }

  // REM Sleep Score (optimal: 20-25% of total sleep)
  let remSleepPercentage = totalSleepHours > 0 ? (remSleepHours / totalSleepHours) * 100 : 0
  let remSleepScore = 0
  if (remSleepPercentage >= 20 && remSleepPercentage <= 25) {
    remSleepScore = 100
  } else if (remSleepPercentage >= 15 && remSleepPercentage < 20) {
    remSleepScore = 80
  } else if (remSleepPercentage >= 25 && remSleepPercentage <= 30) {
    remSleepScore = 80
  } else if (remSleepPercentage >= 10 && remSleepPercentage < 15) {
    remSleepScore = 50
  } else if (remSleepPercentage > 30) {
    remSleepScore = 60
  } else {
    remSleepScore = 20
  }

  // Weighted average for sleep quality
  const sleepQualityScore = (totalSleepScore * 0.4) + (deepSleepScore * 0.3) + (remSleepScore * 0.3)

  return Math.round(sleepQualityScore)
}

/**
 * Calculate muscle recovery score (0-100)
 * @param {Object} fatigue - Object with fatigue values for each muscle group
 * @param {number} fatigue.chest - Chest fatigue (0-100)
 * @param {number} fatigue.shoulders - Shoulder fatigue (0-100)
 * @param {number} fatigue.forearms - Forearm fatigue (0-100)
 * @param {number} fatigue.back - Back fatigue (0-100)
 * @returns {number} Muscle recovery score (0-100)
 */
export const calculateMuscleRecoveryScore = (fatigue) => {
  if (!fatigue) return 50 // Default to moderate if no data

  const { chest = 0, shoulders = 0, forearms = 0, back = 0 } = fatigue

  // Calculate average fatigue
  const averageFatigue = (chest + shoulders + forearms + back) / 4

  // Inverse relationship: Lower fatigue = Higher recovery score
  let muscleRecoveryScore = 100 - averageFatigue

  // Ensure score is within bounds
  muscleRecoveryScore = Math.max(0, Math.min(100, muscleRecoveryScore))

  return Math.round(muscleRecoveryScore)
}

/**
 * Calculate overall recovery score (0-100)
 * @param {Object} sleepData - Sleep metrics
 * @param {number} sleepData.totalSleepHours - Total sleep in hours
 * @param {number} sleepData.deepSleepHours - Deep sleep in hours
 * @param {number} sleepData.remSleepHours - REM sleep in hours
 * @param {Object} fatigueData - Muscle fatigue metrics
 * @param {number} fatigueData.chest - Chest fatigue (0-100)
 * @param {number} fatigueData.shoulders - Shoulder fatigue (0-100)
 * @param {number} fatigueData.forearms - Forearm fatigue (0-100)
 * @param {number} fatigueData.back - Back fatigue (0-100)
 * @returns {number} Overall recovery score (0-100)
 */
export const calculateRecoveryScore = (sleepData, fatigueData) => {
  const sleepQualityScore = calculateSleepQualityScore(
    sleepData?.totalSleepHours,
    sleepData?.deepSleepHours,
    sleepData?.remSleepHours
  )

  const muscleRecoveryScore = calculateMuscleRecoveryScore(fatigueData)

  // Weighted average: Sleep (40%) + Muscle Recovery (60%)
  const overallScore = (sleepQualityScore * 0.4) + (muscleRecoveryScore * 0.6)

  return Math.round(overallScore)
}

/**
 * Get recovery score category
 * @param {number} score - Recovery score (0-100)
 * @returns {Object} Category with label and color
 */
export const getRecoveryCategory = (score) => {
  if (score >= 90) {
    return { label: 'Excellent', color: 'emerald', textColor: 'text-emerald' }
  } else if (score >= 75) {
    return { label: 'Good', color: 'cyan', textColor: 'text-cyan' }
  } else if (score >= 60) {
    return { label: 'Moderate', color: 'yellow-400', textColor: 'text-yellow-400' }
  } else if (score >= 40) {
    return { label: 'Poor', color: 'orange-400', textColor: 'text-orange-400' }
  } else {
    return { label: 'Critical', color: 'red-400', textColor: 'text-red-400' }
  }
}

/**
 * Calculate recovery score from Supabase log data
 * @param {Object} sleepLog - Sleep log from Supabase
 * @param {Object} fatigueLog - Fatigue log from Supabase
 * @returns {number} Recovery score (0-100)
 */
export const calculateRecoveryScoreFromLogs = (sleepLog, fatigueLog) => {
  const sleepData = {
    totalSleepHours: sleepLog?.total_sleep_minutes / 60,
    deepSleepHours: sleepLog?.deep_sleep_minutes / 60,
    remSleepHours: sleepLog?.rem_sleep_minutes / 60,
  }

  const fatigueData = {
    chest: fatigueLog?.chest_fatigue,
    shoulders: fatigueLog?.shoulders_fatigue,
    forearms: fatigueLog?.forearms_fatigue,
    back: fatigueLog?.back_fatigue,
  }

  return calculateRecoveryScore(sleepData, fatigueData)
}
