import React, { memo } from 'react'

const Input = memo(({ 
  label, 
  error, 
  className = '', 
  id,
  ...props 
}) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-text mb-2">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full bg-background border ${error ? 'border-red-500' : 'border-border'} rounded-lg px-4 py-3 text-text placeholder:text-text/50 focus:outline-none focus:ring-2 focus:ring-emerald focus:border-transparent transition-all ${className}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-500" role="alert">{error}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
