import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@context/AuthContext'
import toast from 'react-hot-toast'
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'

const Login = () => {
  const navigate = useNavigate()
  const { signIn, loading, isAuthenticated } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate('/')
    }
  }, [isAuthenticated, loading, navigate])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      const result = await signIn(data.email, data.password)
      
      if (result.success) {
        toast.success('Welcome back to Zenix Recovery!')
        navigate('/')
      } else {
        toast.error(result.error || 'Login failed')
      }
    } catch (error) {
      toast.error('An unexpected error occurred')
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 157, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 217, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid 20s linear infinite',
        }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Glassmorphism card */}
        <div className="bg-panel/80 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          {/* Animated accent line */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald via-cyan to-emerald"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-text mb-2">
              Zenix <span className="text-emerald">Recovery</span>
            </h1>
            <p className="text-text/60">Welcome back, athlete</p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-medium text-text mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text/40 w-5 h-5" />
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  type="email"
                  placeholder="athlete@zenix.com"
                  className="w-full bg-background/50 border border-border rounded-lg pl-10 pr-4 py-3 text-text placeholder:text-text/40 focus:outline-none focus:ring-2 focus:ring-emerald focus:border-transparent transition-all"
                />
              </div>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-sm mt-1"
                >
                  {errors.email.message}
                </motion.p>
              )}
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-sm font-medium text-text mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text/40 w-5 h-5" />
                <input
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full bg-background/50 border border-border rounded-lg pl-10 pr-12 py-3 text-text placeholder:text-text/40 focus:outline-none focus:ring-2 focus:ring-emerald focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text/40 hover:text-text transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-sm mt-1"
                >
                  {errors.password.message}
                </motion.p>
              )}
            </motion.div>

            {/* Remember Me & Forgot Password */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-between"
            >
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-border bg-background/50 text-emerald focus:ring-emerald focus:ring-offset-0"
                />
                <span className="text-sm text-text/60">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-emerald hover:text-emerald/80 transition-colors"
              >
                Forgot password?
              </Link>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald to-cyan text-background font-semibold py-3 rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={20} />
                </>
              )}
            </motion.button>
          </form>

          {/* Sign Up Link */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-6 text-text/60"
          >
            Don't have an account?{' '}
            <Link to="/signup" className="text-cyan hover:text-cyan/80 transition-colors font-medium">
              Sign up
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
