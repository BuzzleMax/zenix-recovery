/**
 * Advanced Recovery Score Engine
 * 
 * Formula Explanation:
 * The recovery score is calculated based on multiple factors with weighted contributions:
 * 
 * 1. Sleep Quality (25% weight):
 *    - Total Sleep: Optimal 7-9 hours (score 0-100)
 *    - Deep Sleep: Should be 20-25% of total sleep (score 0-100)
 *    - REM Sleep: Should be 20-25% of total sleep (score 0-100)
 * 
 * 2. Muscle Recovery (30% weight):
 *    - Inverse relationship: Lower fatigue = higher recovery
 *    - Average fatigue across all muscle groups (score 0-100)
 * 
 * 3. CNS Fatigue (20% weight):
 *    - Central nervous system recovery state
 *    - Lower CNS fatigue = higher recovery (score 0-100)
 * 
 * 4. Grip Fatigue (10% weight):
 *    - Grip strength recovery indicator
 *    - Lower grip fatigue = higher recovery (score 0-100)
 * 
 * 5. Isometric Strain (15% weight):
 *    - Isometric tension recovery
 *    - Lower strain = higher recovery (score 0-100)
 * 
 * Final Score Formula:
 * Recovery Score = (Sleep Quality × 0.25) + (Muscle Recovery × 0.30) + (CNS Recovery × 0.20) + (Grip Recovery × 0.10) + (Isometric Recovery × 0.15)
 * 
 * Recovery Status Levels:
 * - 90-100: Peak (emerald)
 * - 75-89: Good (cyan)
 * - 60-74: Moderate (yellow)
 * - 0-59: Poor (red)
 */

/**
 * Calculate sleep quality score (0-100)
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
    totalSleepScore = 70
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
 */
export const calculateMuscleRecoveryScore = (fatigue) => {
  if (!fatigue) return 50

  const { chest = 0, shoulders = 0, forearms = 0, back = 0 } = fatigue
  const averageFatigue = (chest + shoulders + forearms + back) / 4
  const muscleRecoveryScore = 100 - averageFatigue

  return Math.round(Math.max(0, Math.min(100, muscleRecoveryScore)))
}

/**
 * Calculate CNS recovery score (0-100)
 */
export const calculateCNSRecoveryScore = (cnsFatigue) => {
  if (cnsFatigue === undefined || cnsFatigue === null) return 50
  const cnsRecoveryScore = 100 - cnsFatigue
  return Math.round(Math.max(0, Math.min(100, cnsRecoveryScore)))
}

/**
 * Calculate grip recovery score (0-100)
 */
export const calculateGripRecoveryScore = (gripFatigue) => {
  if (gripFatigue === undefined || gripFatigue === null) return 50
  const gripRecoveryScore = 100 - gripFatigue
  return Math.round(Math.max(0, Math.min(100, gripRecoveryScore)))
}

/**
 * Calculate isometric recovery score (0-100)
 */
export const calculateIsometricRecoveryScore = (isometricStrain) => {
  if (isometricStrain === undefined || isometricStrain === null) return 50
  const isometricRecoveryScore = 100 - isometricStrain
  return Math.round(Math.max(0, Math.min(100, isometricRecoveryScore)))
}

/**
 * Calculate overall recovery score (0-100)
 */
export const calculateRecoveryScore = (sleepData, fatigueData, cnsData, gripData, isometricData) => {
  const sleepQualityScore = calculateSleepQualityScore(
    sleepData?.totalSleepHours,
    sleepData?.deepSleepHours,
    sleepData?.remSleepHours
  )

  const muscleRecoveryScore = calculateMuscleRecoveryScore(fatigueData)
  const cnsRecoveryScore = calculateCNSRecoveryScore(cnsData?.cnsFatigue)
  const gripRecoveryScore = calculateGripRecoveryScore(gripData?.gripFatigue)
  const isometricRecoveryScore = calculateIsometricRecoveryScore(isometricData?.isometricStrain)

  // Weighted average
  const overallScore = 
    (sleepQualityScore * 0.25) +
    (muscleRecoveryScore * 0.30) +
    (cnsRecoveryScore * 0.20) +
    (gripRecoveryScore * 0.10) +
    (isometricRecoveryScore * 0.15)

  return Math.round(overallScore)
}

/**
 * Get recovery status based on score
 */
export const getRecoveryStatus = (score) => {
  if (score >= 90) {
    return { status: 'Peak', color: 'emerald', textColor: 'text-emerald' }
  } else if (score >= 75) {
    return { status: 'Good', color: 'cyan', textColor: 'text-cyan' }
  } else if (score >= 60) {
    return { status: 'Moderate', color: 'yellow-400', textColor: 'text-yellow-400' }
  } else {
    return { status: 'Poor', color: 'red-400', textColor: 'text-red-400' }
  }
}

/**
 * Calculate complete recovery result
 */
export const calculateRecoveryResult = (sleepData, fatigueData, cnsData, gripData, isometricData) => {
  const score = calculateRecoveryScore(sleepData, fatigueData, cnsData, gripData, isometricData)
  const { status, color, textColor } = getRecoveryStatus(score)

  return {
    score,
    status,
    color,
    textColor
  }
}
