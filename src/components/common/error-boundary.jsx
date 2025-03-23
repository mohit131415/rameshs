import { Component } from "react"
import { AlertTriangle } from 'lucide-react'
import { Button } from "../../components/ui/button"

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    
    // You can log the error to an error reporting service here
    console.error("Error caught by ErrorBoundary:", error, errorInfo)
  }
  
  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
          <h2 className="text-2xl font-display font-bold mb-2">Something went wrong</h2>
          <p className="text-muted-foreground mb-6">
            We're sorry, but an error occurred while rendering this component.
          </p>
          
          {this.props.resetable && (
            <Button 
              variant="default" 
              className="bg-gold hover:bg-gold-dark text-white"
              onClick={this.handleReset}
            >
              Try Again
            </Button>
          )}
          
          {this.state.error && process.env.NODE_ENV === 'development' && (
            <div className="mt-6 p-4 bg-muted rounded-md text-left overflow-auto max-w-full">
              <p className="font-mono text-sm text-destructive mb-2">{this.state.error.toString()}</p>
              <pre className="font-mono text-xs text-muted-foreground">
                {this.state.errorInfo?.componentStack}
              </pre>
            </div>
          )}
        </div>
      )
    }

    return this.props.children
  }
}
