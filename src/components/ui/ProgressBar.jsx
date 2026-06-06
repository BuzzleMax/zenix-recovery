import React from 'react'

const ProgressBar = ({ 
  value = 0, 
  max = 100, 
  color = 'emerald', 
  size = 'md', 
  showLabel = false,
  className = '' 
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  
  const colors = {
    emerald: 'bg-emerald',
    cyan: 'bg-cyan',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
  }
  
  const sizes = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6',
  }

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between text-sm text-text mb-2">
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={`w-full bg-border rounded-full overflow-hidden ${sizes[size]}`}>
        <div
          className={`${colors[color]} transition-all duration-300 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
