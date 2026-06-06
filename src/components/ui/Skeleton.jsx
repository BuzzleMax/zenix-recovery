import { motion } from 'framer-motion'

const Skeleton = ({ className, variant = 'default' }) => {
  const variants = {
    default: 'h-4 w-full',
    text: 'h-4 w-3/4',
    title: 'h-8 w-1/2',
    circle: 'h-12 w-12 rounded-full',
    card: 'h-32 w-full',
    avatar: 'h-10 w-10 rounded-full',
  }

  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
      className={`bg-background/50 border border-border rounded ${variants[variant]} ${className}`}
    />
  )
}

export default Skeleton
