import * as React from "react";

export const errorComponent = (err: Error | React.ErrorInfo) => {
  console.log(err);
  return (
    <>
      {/* <pre>{err.toString()}</pre> */}
      {/* @ts-ignore */}
      <pre>{err.stack}</pre>
    </>
  );
};

interface ErrorBoundaryState {
  error: Error;
  errorInfo: React.ErrorInfo;
}

class ErrorBoundary extends React.Component<{}, ErrorBoundaryState> {
  constructor(props: any) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  componentDidUpdate(prevProps: { children?: React.ReactNode }) {
    if (prevProps.children !== this.props.children) {
      this.setState({ error: null, errorInfo: null });
    }
  }

  render() {
    if (this.state.errorInfo) {
      return errorComponent(this.state.error);
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
