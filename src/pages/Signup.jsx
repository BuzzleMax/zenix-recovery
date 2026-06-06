import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@context/AuthContext'
import toast from 'react-hot-toast'
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, Check } from 'lucide-react'

const Signup = () => {
  const navigate = useNavigate()
  const { signUp, loading, isAuthenticated } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate('/')
    }
  }, [isAuthenticated, loading, navigate])

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const password = watch('password')

  const onSubmit = async (data) => {
    try {
      const result = await signUp(data.email, data.password, data.username)
      
      if (result.success) {
        toast.success('Account created successfully!')
        navigate('/')
      } else {
        toast.error(result.error || 'Signup failed')
      }
    } catch (error) {
      toast.error('An unexpected error occurred')
    }
  }

  const passwordRequirements = [
    { text: 'At least 6 characters', test: (pwd) => pwd?.length >= 6 },
    { text: 'Contains uppercase letter', test: (pwd) => /[A-Z]/.test(pwd) },
    { text: 'Contains lowercase letter', test: (pwd) => /[a-z]/.test(pwd) },
    { text: 'Contains number', test: (pwd) => /\d/.test(pwd) },
  ]

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
            className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan via-emerald to-cyan"
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
              Join <span className="text-cyan">Zenix</span>
            </h1>
            <p className="text-text/60">Create your athlete account</p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Username */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-medium text-text mb-2">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text/40 w-5 h-5" />
                <input
                  {...register('username', {
                    required: 'Username is required',
                    minLength: {
                      value: 3,
                      message: 'Username must be at least 3 characters',
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9_]+$/,
                      message: 'Only letters, numbers, and underscores allowed',
                    },
                  })}
                  type="text"
                  placeholder="athlete123"
                  className="w-full bg-background/50 border border-border rounded-lg pl-10 pr-4 py-3 text-text placeholder:text-text/40 focus:outline-none focus:ring-2 focus:ring-cyan focus:border-transparent transition-all"
                />
              </div>
              {errors.username && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-sm mt-1"
                >
                  {errors.username.message}
                </motion.p>
              )}
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
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
                  className="w-full bg-background/50 border border-border rounded-lg pl-10 pr-4 py-3 text-text placeholder:text-text/40 focus:outline-none focus:ring-2 focus:ring-cyan focus:border-transparent transition-all"
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
              transition={{ delay: 0.6 }}
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
                  className="w-full bg-background/50 border border-border rounded-lg pl-10 pr-12 py-3 text-text placeholder:text-text/40 focus:outline-none focus:ring-2 focus:ring-cyan focus:border-transparent transition-all"
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
              
              {/* Password Requirements */}
              {password && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-2 space-y-1"
                >
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center space-x-2 text-xs">
                      <Check
                        size={12}
                        className={req.test(password) ? 'text-emerald' : 'text-text/40'}
                      />
                      <span className={req.test(password) ? 'text-emerald' : 'text-text/40'}>
                        {req.text}
                      </span>
                    </div>
                  ))}
                </motion.div>
              )}
            </motion.div>

            {/* Confirm Password */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <label className="block text-sm font-medium text-text mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text/40 w-5 h-5" />
                <input
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) => value === password || 'Passwords do not match',
                  })}
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full bg-background/50 border border-border rounded-lg pl-10 pr-12 py-3 text-text placeholder:text-text/40 focus:outline-none focus:ring-2 focus:ring-cyan focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text/40 hover:text-text transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-sm mt-1"
                >
                  {errors.confirmPassword.message}
                </motion.p>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan to-emerald text-background font-semibold py-3 rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <span>Creating account...</span>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight size={20} />
                </>
              )}
            </motion.button>
          </form>

          {/* Sign In Link */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-center mt-6 text-text/60"
          >
            Already have an account?{' '}
            <Link to="/login" className="text-emerald hover:text-emerald/80 transition-colors font-medium">
              Sign in
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  )
}

export default Signup
