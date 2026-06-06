import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Sidebar from './Sidebar'

const MobileNavigation = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
          
          {/* Sidebar */}
          <div className="fixed inset-y-0 left-0 z-50 lg:hidden">
            <Sidebar isMobile={true} onClose={onClose} />
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export default MobileNavigation
