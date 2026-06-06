import { Component } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error)
    console.error('Error Info:', errorInfo)
    this.setState({ errorInfo })
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="bg-panel border border-border rounded-2xl p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-text mb-2">Something went wrong</h2>
            <p className="text-text/60 mb-6">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <details className="text-left mb-6 bg-background/50 rounded-lg p-4">
              <summary className="cursor-pointer text-text/80 mb-2">Error Details</summary>
              <pre className="text-xs text-text/60 overflow-auto">
                {this.state.error?.toString()}
                {'\n'}
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
            <button
              onClick={this.handleReset}
              className="bg-emerald text-background font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-all flex items-center justify-center space-x-2 mx-auto"
            >
              <RefreshCw size={20} />
              <span>Try Again</span>
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
