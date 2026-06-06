import React, { memo } from 'react'

const Button = memo(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background'
  
  const variants = {
    primary: 'bg-emerald text-background hover:bg-emerald/90 focus:ring-emerald',
    secondary: 'bg-panel border border-border text-text hover:bg-border focus:ring-border',
    outline: 'bg-transparent border border-emerald text-emerald hover:bg-emerald/10 focus:ring-emerald',
    ghost: 'bg-transparent text-text hover:bg-panel focus:ring-border',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
  }
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export default Button
