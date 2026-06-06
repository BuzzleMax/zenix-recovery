import React, { useEffect, memo } from 'react'
import { X } from 'lucide-react'

const Modal = memo(({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  className = '' 
}) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', handleEscape)
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal */}
      <div className={`relative bg-panel border border-border rounded-xl w-full shadow-2xl ${sizes[size]} ${className}`}>
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 id="modal-title" className="text-xl font-semibold text-text">{title}</h2>
            <button
              onClick={onClose}
              className="text-text/50 hover:text-text transition-colors p-1 rounded hover:bg-background/50"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
        )}
        
        {/* Body */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
})

Modal.displayName = 'Modal'

export default Modal
