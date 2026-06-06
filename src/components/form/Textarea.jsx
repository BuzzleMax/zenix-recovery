import { motion } from 'framer-motion'

const Textarea = ({ label, value, onChange, placeholder = 'Enter your notes...', rows = 4, maxLength = 500 }) => {
  const charCount = value?.length || 0

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-text">{label}</label>
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          maxLength={maxLength}
          className="w-full bg-background border border-border rounded-lg px-4 py-3 text-text placeholder:text-text/40 focus:outline-none focus:ring-2 focus:ring-emerald focus:border-transparent transition-all resize-none"
        />
        <div className="absolute bottom-2 right-2 text-xs text-text/40">
          {charCount}/{maxLength}
        </div>
      </div>
    </div>
  )
}

export default Textarea
