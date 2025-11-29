import React from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ error, errorInfo });
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
                    <div className="text-center p-5 bg-white shadow rounded">
                        <h1 className="display-1 text-danger fw-bold">Oops!</h1>
                        <h2 className="mb-4">Something went wrong.</h2>
                        <p className="lead mb-4 text-muted">
                            We're sorry, but an unexpected error has occurred.
                        </p>
                        <div className="d-flex justify-content-center gap-3">
                            <button
                                className="btn btn-dark"
                                onClick={() => window.location.reload()}
                            >
                                Refresh Page
                            </button>
                            <a href="/" className="btn btn-outline-dark">
                                Go Home
                            </a>
                        </div>
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <div className="mt-4 text-start">
                                <details className="text-danger">
                                    <summary>Error Details</summary>
                                    <pre className="mt-2 small bg-light p-2 rounded">
                                        {this.state.error.toString()}
                                        <br />
                                        {this.state.errorInfo.componentStack}
                                    </pre>
                                </details>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;