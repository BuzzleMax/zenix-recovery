import { memo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@context/AuthContext'
import { useForm } from 'react-hook-form'
import { supabase } from '@lib/supabase'
import toast from 'react-hot-toast'
import { X, Plus, Moon, Dumbbell, Brain, Hand, Armchair, Save } from 'lucide-react'
import Slider from '@components/form/Slider'
import Textarea from '@components/form/Textarea'
import { calculateRecoveryResult } from '@utils/recoveryEngine'

const RecoverySlideOver = memo(({ isOpen, onClose }) => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('sleep')

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      // Sleep Metrics
      sleepDuration: 7,
      sleepQuality: 8,
      deepSleep: 2,
      remSleep: 1.5,
      // Muscle Fatigue
      chestFatigue: 30,
      shoulderFatigue: 40,
      forearmFatigue: 25,
      backFatigue: 35,
      // Advanced Metrics
      cnsFatigue: 20,
      gripFatigue: 25,
      isometricStrain: 30,
      sidePressureFatigue: 35,
      // Notes
      workoutNotes: '',
      matchNotes: '',
    },
  })

  const onSubmit = async (data) => {
    try {
      setLoading(true)

      // Calculate recovery score
      const sleepData = {
        totalSleepHours: data.sleepDuration,
        deepSleepHours: data.deepSleep,
        remSleepHours: data.remSleep,
      }

      const fatigueData = {
        chest: data.chestFatigue,
        shoulders: data.shoulderFatigue,
        forearms: data.forearmFatigue,
        back: data.backFatigue,
      }

      const cnsData = {
        cnsFatigue: data.cnsFatigue,
        gripFatigue: data.gripFatigue,
        isometricStrain: data.isometricStrain,
      }

      const armwrestlingData = {
        sidePressureFatigue: data.sidePressureFatigue,
      }

      const { score } = calculateRecoveryResult(sleepData, fatigueData, cnsData, armwrestlingData)

      // Save sleep log
      const { error: sleepError } = await supabase
        .from('sleep_logs')
        .insert([
          {
            user_id: user.id,
            total_sleep_minutes: data.sleepDuration * 60,
            deep_sleep_minutes: data.deepSleep * 60,
            rem_sleep_minutes: data.remSleep * 60,
            sleep_quality: data.sleepQuality,
            notes: data.workoutNotes,
            log_date: new Date().toISOString().split('T')[0],
          },
        ])

      if (sleepError) throw sleepError

      // Save fatigue log
      const { error: fatigueError } = await supabase
        .from('fatigue_logs')
        .insert([
          {
            user_id: user.id,
            chest_fatigue: data.chestFatigue,
            shoulders_fatigue: data.shoulderFatigue,
            forearms_fatigue: data.forearmFatigue,
            back_fatigue: data.backFatigue,
            overall_fatigue: Math.round(
              (data.chestFatigue + data.shoulderFatigue + data.forearmFatigue + data.backFatigue) / 4
            ),
            notes: data.workoutNotes,
            log_date: new Date().toISOString().split('T')[0],
          },
        ])

      if (fatigueError) throw fatigueError

      // Save CNS log
      const { error: cnsError } = await supabase
        .from('cns_logs')
        .insert([
          {
            user_id: user.id,
            cns_fatigue: data.cnsFatigue,
            grip_fatigue: data.gripFatigue,
            isometric_strain: data.isometricStrain,
            notes: data.workoutNotes,
            log_date: new Date().toISOString().split('T')[0],
          },
        ])

      if (cnsError) throw cnsError

      // Save arm wrestling log
      const { error: armwrestlingError } = await supabase
        .from('armwrestling_logs')
        .insert([
          {
            user_id: user.id,
            side_pressure_fatigue: data.sidePressureFatigue,
            forearm_recovery: 100 - data.forearmFatigue,
            training_load: Math.round((data.chestFatigue + data.shoulderFatigue + data.forearmFatigue + data.backFatigue) / 4),
            match_notes: data.matchNotes,
            log_date: new Date().toISOString().split('T')[0],
          },
        ])

      if (armwrestlingError) throw armwrestlingError

      // Save recovery log with calculated score
      const { error: recoveryError } = await supabase
        .from('recovery_logs')
        .insert([
          {
            user_id: user.id,
            mode: 'arm_wrestling',
            target_area: 'full_body',
            pain_level: 0,
            notes: data.workoutNotes,
            recovery_score: score,
            cns_fatigue: data.cnsFatigue,
            grip_fatigue: data.gripFatigue,
            isometric_strain: data.isometricStrain,
            armwrestling_side_pressure: data.sidePressureFatigue,
            training_intensity: Math.round((data.chestFatigue + data.shoulderFatigue + data.forearmFatigue + data.backFatigue) / 4),
            created_at: new Date().toISOString(),
          },
        ])

      if (recoveryError) throw recoveryError

      toast.success(`Recovery log saved! Score: ${score}`)
      reset()
      onClose()
    } catch (error) {
      toast.error(error.message || 'Failed to save recovery log')
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { id: 'sleep', label: 'Sleep', icon: Moon },
    { id: 'muscle', label: 'Muscle', icon: Dumbbell },
    { id: 'cns', label: 'CNS', icon: Brain },
    { id: 'armwrestling', label: 'Arm Wrestling', icon: Armchair },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Slide-over panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-2xl bg-panel border-l border-border z-50 overflow-y-auto"
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div>
                  <h2 className="text-2xl font-bold text-text">Log Recovery</h2>
                  <p className="text-text/60">Track your recovery metrics</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-background/50 transition-colors"
                >
                  <X className="w-6 h-6 text-text/60" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 p-4 border-b border-border overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                      activeTab === tab.id
                        ? 'bg-emerald text-background'
                        : 'text-text/60 hover:text-text hover:bg-background/50'
                    }`}
                  >
                    <tab.icon size={18} />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="flex-1 p-6 space-y-6">
                {activeTab === 'sleep' && (
                  <div className="space-y-6">
                    <Slider
                      label="Sleep Duration (hours)"
                      value={watch('sleepDuration')}
                      onChange={(val) => setValue('sleepDuration', val)}
                      min={0}
                      max={12}
                      step={0.5}
                      unit="h"
                      color="purple"
                    />
                    <Slider
                      label="Sleep Quality"
                      value={watch('sleepQuality')}
                      onChange={(val) => setValue('sleepQuality', val)}
                      min={1}
                      max={10}
                      step={1}
                      color="emerald"
                    />
                    <Slider
                      label="Deep Sleep (hours)"
                      value={watch('deepSleep')}
                      onChange={(val) => setValue('deepSleep', val)}
                      min={0}
                      max={6}
                      step={0.5}
                      unit="h"
                      color="cyan"
                    />
                    <Slider
                      label="REM Sleep (hours)"
                      value={watch('remSleep')}
                      onChange={(val) => setValue('remSleep', val)}
                      min={0}
                      max={4}
                      step={0.5}
                      unit="h"
                      color="purple"
                    />
                  </div>
                )}

                {activeTab === 'muscle' && (
                  <div className="space-y-6">
                    <Slider
                      label="Chest Fatigue"
                      value={watch('chestFatigue')}
                      onChange={(val) => setValue('chestFatigue', val)}
                      min={0}
                      max={100}
                      step={5}
                      unit="%"
                      color="red"
                    />
                    <Slider
                      label="Shoulder Fatigue"
                      value={watch('shoulderFatigue')}
                      onChange={(val) => setValue('shoulderFatigue', val)}
                      min={0}
                      max={100}
                      step={5}
                      unit="%"
                      color="yellow-400"
                    />
                    <Slider
                      label="Forearm Fatigue"
                      value={watch('forearmFatigue')}
                      onChange={(val) => setValue('forearmFatigue', val)}
                      min={0}
                      max={100}
                      step={5}
                      unit="%"
                      color="emerald"
                    />
                    <Slider
                      label="Back Fatigue"
                      value={watch('backFatigue')}
                      onChange={(val) => setValue('backFatigue', val)}
                      min={0}
                      max={100}
                      step={5}
                      unit="%"
                      color="cyan"
                    />
                  </div>
                )}

                {activeTab === 'cns' && (
                  <div className="space-y-6">
                    <Slider
                      label="CNS Fatigue"
                      value={watch('cnsFatigue')}
                      onChange={(val) => setValue('cnsFatigue', val)}
                      min={0}
                      max={100}
                      step={5}
                      unit="%"
                      color="purple"
                    />
                    <Slider
                      label="Grip Fatigue"
                      value={watch('gripFatigue')}
                      onChange={(val) => setValue('gripFatigue', val)}
                      min={0}
                      max={100}
                      step={5}
                      unit="%"
                      color="cyan"
                    />
                    <Slider
                      label="Isometric Strain"
                      value={watch('isometricStrain')}
                      onChange={(val) => setValue('isometricStrain', val)}
                      min={0}
                      max={100}
                      step={5}
                      unit="%"
                      color="emerald"
                    />
                  </div>
                )}

                {activeTab === 'armwrestling' && (
                  <div className="space-y-6">
                    <Slider
                      label="Side Pressure Fatigue"
                      value={watch('sidePressureFatigue')}
                      onChange={(val) => setValue('sidePressureFatigue', val)}
                      min={0}
                      max={100}
                      step={5}
                      unit="%"
                      color="red"
                    />
                  </div>
                )}

                <Textarea
                  label="Workout Notes"
                  value={watch('workoutNotes')}
                  onChange={(val) => setValue('workoutNotes', val)}
                  placeholder="How was your workout? Any specific areas of concern?"
                  rows={3}
                />

                <Textarea
                  label="Match Notes"
                  value={watch('matchNotes')}
                  onChange={(val) => setValue('matchNotes', val)}
                  placeholder="Notes about your arm wrestling matches"
                  rows={2}
                />

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-emerald to-cyan text-background font-semibold py-4 rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <span>Saving...</span>
                  ) : (
                    <>
                      <Save size={20} />
                      <span>Save Recovery Log</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
})

RecoverySlideOver.displayName = 'RecoverySlideOver'

export default RecoverySlideOver
