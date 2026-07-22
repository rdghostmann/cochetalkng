// components/ui/ErrorBoundary.tsx
import React, {
  Component,
  ComponentType,
  PropsWithChildren,
  ReactNode,
} from "react";
import { ErrorFallback, ErrorFallbackProps } from "./ErrorFallback";

export interface ErrorBoundaryProps
  extends PropsWithChildren {
  FallbackComponent?: ComponentType<ErrorFallbackProps>;
  onError?: (
    error: Error,
    componentStack: string
  ) => void;
}

interface ErrorBoundaryState {
  error: Error | null;
}

/**
 * React Error Boundary
 *
 * Error boundaries must be implemented as class components because
 * React exposes error handling through lifecycle methods.
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    error: null,
  };

  static getDerivedStateFromError(
    error: Error
  ): ErrorBoundaryState {
    return {
      error,
    };
  }

componentDidCatch(
  error: Error,
  info: React.ErrorInfo
) {
  this.props.onError?.(
    error,
    info.componentStack ?? ""
  );
}

  resetError = () => {
    this.setState({
      error: null,
    });
  };

  render(): ReactNode {
    const {
      children,
      FallbackComponent = ErrorFallback,
    } = this.props;

    if (this.state.error) {
      return (
        <FallbackComponent
          error={this.state.error}
          resetError={this.resetError}
        />
      );
    }

    return children;
  }
}