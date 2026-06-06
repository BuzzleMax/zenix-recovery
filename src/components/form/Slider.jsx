import { motion } from 'framer-motion'

const Slider = ({ label, value, onChange, min = 0, max = 100, step = 1, unit = '', color = 'emerald' }) => {
  const getColorClass = () => {
    const colors = {
      emerald: 'accent-emerald',
      cyan: 'accent-cyan',
      red: 'accent-red-500',
      yellow: 'accent-yellow-400',
      purple: 'accent-purple-500',
    }
    return colors[color] || colors.emerald
  }

  const getValueColor = () => {
    if (value >= 70) return 'text-red-400'
    if (value >= 50) return 'text-yellow-400'
    if (value >= 30) return 'text-cyan'
    return 'text-emerald'
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-text">{label}</label>
        <motion.span
          key={value}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className={`text-lg font-bold ${getValueColor()}`}
        >
          {value}{unit}
        </motion.span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className={`w-full h-2 bg-background rounded-lg appearance-none cursor-pointer ${getColorClass()}`}
        />
        <div className="flex justify-between text-xs text-text/40 mt-1">
          <span>{min}{unit}</span>
          <span>{max}{unit}</span>
        </div>
      </div>
    </div>
  )
}

export default Slider
