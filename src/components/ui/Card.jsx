import React, { memo } from 'react'

const Card = memo(({ children, className = '', ...props }) => {
  return (
    <div
      className={`bg-panel border border-border rounded-xl shadow-lg ${className}`}
      {...props}
    >
      {children}
    </div>
  )
})

const CardHeader = memo(({ children, className = '', ...props }) => {
  return (
    <div className={`p-6 border-b border-border ${className}`} {...props}>
      {children}
    </div>
  )
})

const CardBody = memo(({ children, className = '', ...props }) => {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  )
})

const CardFooter = memo(({ children, className = '', ...props }) => {
  return (
    <div className={`p-6 border-t border-border ${className}`} {...props}>
      {children}
    </div>
  )
})

Card.Header = CardHeader
Card.Body = CardBody
Card.Footer = CardFooter

Card.displayName = 'Card'
CardHeader.displayName = 'CardHeader'
CardBody.displayName = 'CardBody'
CardFooter.displayName = 'CardFooter'

export default Card
