// Largely from https://github.com/patternfly/patternfly-org/blob/main/packages/theme-patternfly-org/components/example/example.js
import * as React from "react";
import * as reactCoreModule from "@patternfly/react-core";
import * as wrappedReactCoreModule from "./components";
import * as wrappedReactCoreModuleDemos from "./components/snippets";
import { ComponentAdder } from "./components/componentAdder";
import {
  convertToReactComponent,
  parseComponent,
  stringifyAST,
  visit,
} from "./helpers/acorn";
import { parse } from "./helpers/parse";
import { components, componentSnippets } from "./components/componentList";

const componentsInfo = {
  ...components,
  ...componentSnippets,
};

const scope = {
  ...reactCoreModule,
  ...wrappedReactCoreModule,
  ...wrappedReactCoreModuleDemos,
  ComponentAdder,
  onLiveRegionDragEnter(ev: React.DragEvent<any>) {
    ev.preventDefault();
    console.log(ev.target);
    (ev.target as HTMLElement).classList.add("pf-m-dropzone");
  },
  onLiveRegionDragLeave(ev: React.DragEvent<any>) {
    ev.preventDefault();
    console.log(`removing dropzone`);
    (ev.target as HTMLElement).classList.remove("pf-m-dropzone");
  },
} as any;

const errorComponent = (err: Error | React.ErrorInfo) => (
  <pre>{err.toString()}</pre>
);

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

export const LiveRegion = ({ code, setCode }) => {
  let livePreview = null;
  if (code) {
    scope.onLiveRegionDrop = (ev: React.DragEvent<any>, idCounter: number) => {
      ev.preventDefault();
      ev.stopPropagation();
      console.log("onLiveRegionDrop", ev.target, idCounter);
      (ev.target as HTMLElement).classList.remove("pf-m-dropzone");
      ev.dataTransfer.items[0].getAsString(function (s) {
        console.log("component = " + s);
      });
      const { component } = JSON.parse(ev.dataTransfer.getData("text/plain"));
      // const data = componentsInfo[component];
      const ast = parseComponent(code, false, false, true);
      visit(ast, (node: any, parents: any[]) => {
        if (node.type !== "JSXOpeningElement" || node.idCounter !== idCounter) {
          return;
        }
        const parent = parents[parents.length - 1];

        const addAttribute = (prop, jsx, node) => {
          const expression = parse(jsx).body[0].expression;
          const attr = {
            type: "JSXAttribute",
            name: {
              type: "JSXIdentifier",
              name: prop,
            },
            value: {
              type: "JSXExpressionContainer",
              expression,
            },
          };
          let replace = false;
          let index = 0;
          for (var i = 0; i < node.openingElement.attributes.length; i++) {
            const { name } = node.openingElement.attributes[i].name;
            if (name === prop) {
              replace = true;
              index = i;
              break;
            }
          }
          if (replace) {
            node.openingElement.attributes[index] = attr;
          } else {
            node.openingElement.attributes.push(attr);
          }
        };

        if (componentsInfo[component]) {
          if (componentsInfo[component].props) {
            componentsInfo[component].props.forEach((propObj) => {
              const { prop, jsx } = propObj;
              addAttribute(prop, jsx, parent);
            });
          } else if (componentsInfo[component].prop) {
            const { prop, jsx } = componentsInfo[component];
            addAttribute(prop, jsx, parent);
          } else {
            // add as child
            const componentValue = componentsInfo[component];
            const jsxString =
              typeof componentValue === "string"
                ? componentValue
                : componentValue.jsx;
            const expression = parse(jsxString).body[0].expression;
            parent.children.push(expression);
          }
        }
      });
      setCode(stringifyAST(ast));
    };

    try {
      const { code: transformedCode } = convertToReactComponent(code);
      const getPreviewComponent = new Function(
        "React",
        ...Object.keys(scope),
        transformedCode
      );
      const PreviewComponent = getPreviewComponent(
        React,
        ...Object.values(scope)
      );
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
    <div
      className="pf-u-h-100 live-region"
      onDragEnter={scope.onLiveRegionDragEnter}
      onDragLeave={scope.onLiveRegionDragLeave}
      onDrop={scope.onLiveRegionDrop}
    >
      {livePreview}
    </div>
  );
};
