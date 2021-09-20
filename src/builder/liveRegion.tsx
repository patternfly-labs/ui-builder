// Largely from https://github.com/patternfly/patternfly-org/blob/main/packages/theme-patternfly-org/components/example/example.js
import * as React from 'react';
import * as reactCoreModule from '@patternfly/react-core';
import { convertToReactComponent, parseComponent, stringifyAST, visit } from './helpers/acorn';
import { parse } from './helpers/parse';

const scope = {
  ...reactCoreModule,
  onLiveRegionDragEnter(ev: React.DragEvent<any>) {
    ev.preventDefault();
    (ev.target as HTMLElement).classList.add('pf-m-dropzone');
  },
  onLiveRegionDragLeave(ev: React.DragEvent<any>) {
    ev.preventDefault();
    (ev.target as HTMLElement).classList.remove('pf-m-dropzone');
  },
} as any;

const errorComponent = (err: Error | React.ErrorInfo) => <pre>{err.toString()}</pre>;

interface ErrorBoundaryState {
  error: Error,
  errorInfo: React.ErrorInfo
}

class ErrorBoundary extends React.Component<{}, ErrorBoundaryState> {
  constructor(props: any) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
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

export const LiveRegion = ({
  code,
  setCode
}) => {

  let livePreview = null;
  if (code) {
    scope.onLiveRegionDrop = (ev: React.DragEvent<any>, idCounter: number) => {
      ev.preventDefault();
      ev.stopPropagation();
      console.log('onLiveRegionDrop', ev.target, idCounter);
      (ev.target as HTMLElement).classList.remove('pf-m-dropzone');
      const data = ev.dataTransfer.getData('text/plain');
      const ast = parseComponent(code, false, false, true);
      visit(ast, (node: any, parents: any[]) => {
        if (node.type !== 'JSXOpeningElement' || node.idCounter !== idCounter) {
          return;
        }
        const parent = parents[parents.length - 1];
        const expression = parse(data).body[0].expression;
        parent.children.push(expression);
      });
      setCode(stringifyAST(ast));
    }

    try {
      const { code: transformedCode } = convertToReactComponent(code);
      const getPreviewComponent = new Function('React', ...Object.keys(scope), transformedCode);
      const PreviewComponent = getPreviewComponent(React, ...Object.values(scope));
      livePreview = (
        <ErrorBoundary>
          <PreviewComponent />
        </ErrorBoundary>
      );
    } catch (err) {
      livePreview = errorComponent(err);
    }
  }

  return (
    <div className="pf-u-h-100">
      {livePreview}
    </div>
  );
}

