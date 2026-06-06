import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@context/AuthContext'
import { supabase } from '@lib/supabase'
import toast from 'react-hot-toast'
import { X, Plus, Moon, Dumbbell } from 'lucide-react'
import Modal from '@components/ui/Modal'
import Slider from '@components/form/Slider'
import Textarea from '@components/form/Textarea'
import { calculateRecoveryScore } from '@utils/recoveryScore'

const RecoveryLoggerModal = ({ isOpen, onClose }) => {
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
      sleepDuration: 7,
      sleepQuality: 8,
      deepSleep: 2,
      remSleep: 1.5,
      chestFatigue: 30,
      shoulderFatigue: 40,
      forearmFatigue: 25,
      backFatigue: 35,
      workoutNotes: '',
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

      const recoveryScore = calculateRecoveryScore(sleepData, fatigueData)

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

      // Save recovery log with calculated score
      const { error: recoveryError } = await supabase
        .from('recovery_logs')
        .insert([
          {
            user_id: user.id,
            mode: 'arm_wrestling', // Default mode, can be made selectable
            target_area: 'full_body', // Default target, can be made selectable
            pain_level: 0, // Can be added as a field
            notes: data.workoutNotes,
            recovery_score: recoveryScore,
            created_at: new Date().toISOString(),
          },
        ])

      if (recoveryError) throw recoveryError

      toast.success(`Recovery log saved! Score: ${recoveryScore}`)
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
    { id: 'fatigue', label: 'Fatigue', icon: Dumbbell },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={onClose} size="xl" className="max-h-[90vh] overflow-y-auto">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-text">Log Recovery</h2>
                <p className="text-text/60">Track your sleep and muscle fatigue</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-background/50 transition-colors"
              >
                <X className="w-5 h-5 text-text/60" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 p-1 bg-background/50 rounded-lg">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-emerald text-background'
                      : 'text-text/60 hover:text-text hover:bg-panel'
                  }`}
                >
                  <tab.icon size={18} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {activeTab === 'sleep' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
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
                </motion.div>
              )}

              {activeTab === 'fatigue' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
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
                    color="yellow"
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
                </motion.div>
              )}

              <Textarea
                label="Workout Notes"
                value={watch('workoutNotes')}
                onChange={(val) => setValue('workoutNotes', val)}
                placeholder="How was your workout? Any specific areas of concern?"
                rows={3}
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
                    <Plus size={20} />
                    <span>Save Recovery Log</span>
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </Modal>
      )}
    </AnimatePresence>
  )
}

export default RecoveryLoggerModal
