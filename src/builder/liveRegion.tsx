// Largely from https://github.com/patternfly/patternfly-org/blob/main/packages/theme-patternfly-org/components/example/example.js
import * as React from "react";
import * as reactCoreModule from "@patternfly/react-core";
import * as componentSnippetModules from "./components/snippets";
import { ComponentAdder } from "./components/componentAdder";
import {
  convertToReactComponent,
  parseComponent,
  stringifyAST,
  visit,
} from "./helpers/acorn";
import { parse } from "./helpers/parse";
import { components, allItems } from "./components/componentList";
import { componentSnippets } from "./components/snippets/snippets";
import ErrorBoundary, { errorComponent } from "./ErrorBoundary";
import { AppContext } from "./app";

const scope = {
  ...reactCoreModule,
  // ...wrappedReactCoreModule,
  ...componentSnippetModules,
  ComponentAdder,
  onLiveRegionMouseOver(ev, idCounter, name) {
    // ev.preventDefault();
    // ev.stopPropagation();
    console.log(name);
  },
  onLiveRegionDragEnter(ev: React.DragEvent<any>) {
    ev.preventDefault();
    ev.stopPropagation();
    // console.log(ev.target);
    (ev.target as HTMLElement).classList.add("pf-m-dropzone");
  },
  onLiveRegionDragLeave(ev: React.DragEvent<any>) {
    ev.preventDefault();
    ev.stopPropagation();
    // console.log(`removing dropzone`);
    (ev.target as HTMLElement).classList.remove("pf-m-dropzone");
  },
} as any;

const addImport = (ast, component) => {
  for (var i = 0; i < ast.body.length; i++) {
    let node = ast.body[i];
    if (node.type === "ImportDeclaration") {
      // add the import for the dropped component
      if (node.source.value !== "@patternfly/react-core") {
        continue;
      }
      let importAdded = false;
      for (var j = 0; j < node.specifiers.length; j++) {
        if (node.specifiers[j].imported.name === component) {
          importAdded = true;
          break;
        }
      }
      if (!importAdded) {
        node.specifiers.push({
          type: "ImportSpecifier",
          imported: {
            type: "Identifier",
            name: component,
          },
          local: {
            type: "Identifier",
            name: component,
          },
        });
        importAdded = true;
        break;
      }
    }
  }
  return ast;
};

export const LiveRegion = ({ code, setCode }) => {
  const { setComponentsInUse } = React.useContext(AppContext);
  let livePreview = null;
  if (code) {
    // scope.onLiveRegionMouseOver = (ev, idCounter) => {
    //   console.log(idCounter);
    // }
    scope.onLiveRegionDrop = (ev: React.DragEvent<any>, idCounter: number) => {
      ev.preventDefault();
      ev.stopPropagation();
      // console.log("onLiveRegionDrop", ev.target, idCounter);
      (ev.target as HTMLElement).classList.remove("pf-m-dropzone");
      const { component } = JSON.parse(ev.dataTransfer.getData("text/plain"));
      let { ast, componentsInUse } = parseComponent(code, false, false, true);
      ast = addImport(ast, component);
      visit(ast, (node: any, parents: any[]) => {
        if (node.type !== "JSXOpeningElement" || node.idCounter !== idCounter) {
          return;
        }
        const parent = parents[parents.length - 1];
        const addAttribute = (prop, jsx, parent, node) => {
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

          let index = 0;
          let foundAttr = false;
          for (var i = 0; i < parent.openingElement.attributes.length; i++) {
            const attribute = parent.openingElement.attributes[i];
            if (attribute.name.name === prop) {
              foundAttr = true;
              index = i;
              if (attribute.value.expression && attribute.value.expression.type === "ArrayExpression") {
                // append
                attribute.value.expression.elements.push(expression);
              } else {
                // replace
                parent.openingElement.attributes[index] = attr;
              }
              break;
            }
          }
          if (!foundAttr) {
            parent.openingElement.attributes.push(attr);
          }/* else {
            parent.openingElement.attributes[index] = attr;
          }*/
        };

        const componentInfo: any = allItems[component];
        if (componentInfo) {
          if (componentInfo.props) {
            componentInfo.props.forEach((propObj) => {
              const { prop, jsx } = propObj;
              addAttribute(prop, jsx, parent, node);
            });
          } else if (componentInfo.prop) {
            const { prop, jsx } = componentInfo;
            addAttribute(prop, jsx, parent, node);
          } else {
            // add as child
            const componentValue = componentInfo;
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
      setComponentsInUse(componentsInUse);
    };

    try {
      const {
        code: transformedCode,
        componentsInUse,
      } = convertToReactComponent(code);
      setComponentsInUse(componentsInUse);
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
      // onMouseOver={scope.onLiveRegionMouseOver}
    >
      {livePreview}
    </div>
  );
};
