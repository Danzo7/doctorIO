import { Logger } from '@libs/Logger';
import { Component, ErrorInfo, ReactNode } from 'react';
import ErrorLayer from './ErrorLayer';

export default class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    Logger.error('ErrorBoundary', 'error', error);
    Logger.error('ErrorBoundary', 'errorInfo', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorLayer />;
    }
    return this.props.children;
  }
}
