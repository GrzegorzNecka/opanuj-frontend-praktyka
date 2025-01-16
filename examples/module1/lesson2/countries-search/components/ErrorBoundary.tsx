import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

function ErrorFallback() {
  return <h2 className="text-center text-red-500">Something went wrong.</h2>;
}

function ErrorBoundary({ children }: ErrorBoundaryProps) {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        console.error('Unhandled error:', error, errorInfo);
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}

export default ErrorBoundary;
