import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const Select = ({ label, value, onChange, options, placeholder = 'Select an option' }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-text">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-background border border-border rounded-lg px-4 py-3 text-text appearance-none focus:outline-none focus:ring-2 focus:ring-emerald focus:border-transparent transition-all cursor-pointer"
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text/40 pointer-events-none" />
      </div>
    </div>
  )
}

export default Select
