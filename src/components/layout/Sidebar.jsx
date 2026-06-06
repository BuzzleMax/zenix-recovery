import { NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '@context/AuthContext'
import { 
  LayoutDashboard, 
  Activity, 
  BarChart3, 
  Settings, 
  LogOut,
  Dumbbell,
  HeartPulse
} from 'lucide-react'

const Sidebar = ({ isMobile, onClose }) => {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/recovery-logs', icon: Activity, label: 'Recovery Logs' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ]

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
    if (onClose) onClose()
  }

  const sidebarVariants = {
    hidden: { x: -280 },
    visible: { x: 0 },
  }

  return (
    <motion.aside
      initial={isMobile ? 'hidden' : false}
      animate={isMobile ? 'visible' : false}
      variants={sidebarVariants}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`bg-panel border-r border-border ${
        isMobile 
          ? 'fixed inset-y-0 left-0 z-50 w-64' 
          : 'hidden lg:block w-64 min-h-screen'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-emerald to-cyan rounded-lg flex items-center justify-center">
              <Dumbbell className="w-6 h-6 text-background" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-text">Zenix</h1>
              <p className="text-xs text-emerald">Recovery</p>
            </div>
          </motion.div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <NavLink
                to={item.path}
                onClick={() => isMobile && onClose()}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-emerald/10 text-emerald border border-emerald/20'
                      : 'text-text/60 hover:bg-panel hover:text-text hover:border hover:border-border'
                  }`
                }
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </motion.div>
          ))}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-border">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-3"
          >
            {/* User Info */}
            <div className="flex items-center space-x-3 px-4 py-3 bg-background/50 rounded-lg">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan to-emerald rounded-full flex items-center justify-center">
                <HeartPulse className="w-5 h-5 text-background" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text truncate">
                  {user?.email?.split('@')[0] || 'Athlete'}
                </p>
                <p className="text-xs text-text/60 truncate">{user?.email}</p>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:border hover:border-red-500/20 rounded-lg transition-all"
            >
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </motion.div>
        </div>
      </div>
    </motion.aside>
  )
}

export default Sidebar
