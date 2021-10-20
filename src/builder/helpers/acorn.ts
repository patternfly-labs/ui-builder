import { generate, GENERATOR } from 'astring';
import { parse } from './parse';

const commonGenerator = {
  ...GENERATOR,
  // Class features
  FieldDefinition(node, state) {
    this[node.key.type](node.key, state);
    state.write(' = ');
    this[node.value.type](node.value, state);
    state.write(';');
  },
  PropertyDefinition(node, state) {
    this.FieldDefinition(node, state);
  },
};


// Stringify ES2017 TSX w/class members -> ES2017 w/o imports/exports so it can be `eval`ed
const es2017Generator = {
  ...commonGenerator,
  JSXElement(node, state) {
    state.write('React.createElement(');
    this.JSXOpeningElement(node.openingElement, state);
    for (var i = 0; i < node.children.length; i++) {
      var child = node.children[i];
      if (child.type !== 'JSXText') {
        state.write(',');
      }
      this[child.type](child, state);
    }
    state.write(')');
  },
  JSXOpeningElement(node, state) {
    this[node.name.type](node.name, state, node.name.name && node.name.name[0] === node.name.name[0].toLowerCase());
    state.write(',{');
    for (var i = 0; i < node.attributes.length; i++) {
      var attr = node.attributes[i];
      this[attr.type](attr, state);
      if (i !== node.attributes.length - 1) {
        state.write(',');
      }
    }
    state.write('}');
  },
  JSXIdentifier(node, state, escape) {
    if (escape) {
      state.write(JSON.stringify(node.name));
    }
    else {
      state.write(node.name);
    }
  },
  JSXMemberExpression(node, state) {
    this[node.object.type](node.object, state);
    state.write('.');
    this[node.property.type](node.property, state);
  },
  JSXAttribute(node, state) {
    this[node.name.type](node.name, state, true);
    state.write(':');
    if (node.value) {
      this[node.value.type](node.value, state);
    }
    else {
      state.write('true');
    }
  },
  JSXExpressionContainer(node, state) {
    this[node.expression.type](node.expression, state);
  },
  JSXText(node, state) {
    if (node.value.trim() === '') {
      node.value = null;
    }
    if (node.value) {
      state.write(',"');
      state.write(node.value.replace(/"/g, '\\"').replace(/\n\s*/g, ' '));
      state.write('"');
    }
  },
  JSXSpreadAttribute(node, state) {
    state.write('...(');
    if (node.argument.type === 'LogicalExpression') {
      this[node.argument.left.type](node.argument.left, state);
      state.write(' ');
      state.write(node.argument.operator);
      state.write(' ');
      this[node.argument.right.type](node.argument.right, state);
    }
    else {
      this[node.argument.type](node.argument, state);
    }
    state.write(')');
  },
  JSXFragment(node, state) {
    this.JSXElement({
      openingElement: {
        attributes: [],
        name: {
          type: 'JSXIdentifier',
          name: 'React.Fragment'
        }
      },
      children: node.children
    }, state);
  },
  JSXEmptyExpression(_node, state) {
    state.write('null');
  },
};

// Stringify ES2017 JSX w/class members -> ES2017 JSX w/class members
const es2017GeneratorJSX = {
  ...commonGenerator,
  // <div></div>
  JSXElement(node, state) {
    if (state.indentLevel > 0) {
      state.write(state.lineEnd);
    }
    state.write(state.indent.repeat(state.indentLevel));
    state.write('<');
    state.indentLevel += 1;
    this[node.openingElement.type](node.openingElement, state);
    if (node.closingElement) {
      state.write('>');
      state.write(state.lineEnd);
      for (var i = 0; i < node.children.length; i++) {
        var child = node.children[i];
        this[child.type](child, state);
      }
      state.indentLevel -= 1;
      state.write(state.lineEnd);
      state.write(state.indent.repeat(state.indentLevel));
      state.write('</');
      this[node.closingElement.type](node.closingElement, state);
      state.write('>');
    } else {
      state.write(' />');
    }
  },
  // <div>
  JSXOpeningElement(node, state) {
    this[node.name.type](node.name, state);
    for (var i = 0; i < node.attributes.length; i++) {
      var attr = node.attributes[i];
      this[attr.type](attr, state);
    }
  },
  // </div>
  JSXClosingElement(node, state) {
    this[node.name.type](node.name, state);
  },
  // div
  JSXIdentifier(node, state) {
    state.write(node.name);
  },
  // Member.Expression
  JSXMemberExpression(node, state) {
    this[node.object.type](node.object, state);
    state.write('.');
    this[node.property.type](node.property, state);
  },
  // attr="something"
  JSXAttribute(node, state) {
    /*
    state.write(state.lineEnd);
    state.write(state.indent.repeat(state.indentLevel));
    state.indentLevel += 1;
    */
    state.write(' ');
    this[node.name.type](node.name, state);
    if (node.value) {
      state.write('=');
      this[node.value.type](node.value, state);
    }
  },
  // namespaced:attr="something"
  JSXNamespacedName(node, state) {
    this[node.namespace.type](node.namespace, state);
    state.write(':');
    this[node.name.type](node.name, state);
  },
  // {expression}
  JSXExpressionContainer(node, state) {
    state.write('{');
    this[node.expression.type](node.expression, state);
    state.write('}');
  },
  // anything between JSX nodes
  JSXText(node, state) {
    state.write(state.indent.repeat(state.indentLevel));
    state.write(node.value.trim());
  },
  // {...props}
  JSXSpreadAttribute(node, state) {
    state.write('...(');
    if (node.argument.type === 'LogicalExpression') {
      this[node.argument.left.type](node.argument.left, state);
      state.write(' ');
      state.write(node.argument.operator);
      state.write(' ');
      this[node.argument.right.type](node.argument.right, state);
    }
    else {
      this[node.argument.type](node.argument, state);
    }
    state.write(')');
  },
  // <></>
  JSXFragment(node, state) {
    this.JSXElement({
      openingElement: {
        attributes: [],
        name: {
          type: 'JSXIdentifier',
          name: 'React.Fragment'
        }
      },
      children: node.children
    }, state);
  },
  // {} (not very kosher)
  JSXEmptyExpression(_node, state) {
    state.write('{}');
  },
  ReturnStatement(node, state) {
    state.write('return');
    if (node.argument) {
      if (node.argument.type === 'JSXElement') {
        state.write(' (');
        state.write(state.lineEnd);
        state.indentLevel -= 1;
      }
      state.write(' ');
      this[node.argument.type](node.argument, state);
      if (node.argument.type === 'JSXElement') {
        state.indentLevel -= 1;
        state.write(state.lineEnd);
        state.write(state.indent.repeat(state.indentLevel));
        state.write(')');
      }
    }

    state.write(';');
  },
};

export function visit(node: acorn.Node, callback: any, parents: any[] = []) {
  parents.push(node);
  Object.values(node).forEach(n => {
    if (!n) {
      return;
    }
    if (typeof n === 'object' && n.type) {
      callback(n, parents);
      visit(n, callback, parents);
    }
    else if (Array.isArray(n)) {
      n.forEach(nn => visit(nn, callback, parents));
    }
  });
}

// propValues are injected into live scope
function injectProp(node: any, propName: string, propValue: string, idCounter: number, componentName: string) {
  let injectedProp = node.attributes.find(attr => attr.name.name === propName);
  if (!injectedProp) {
    injectedProp = {
      type: 'JSXAttribute',
      name: {
        type: 'JSXIdentifier',
        name: propName
      }
    };
    node.attributes.push(injectedProp);
  }
  injectedProp.value = {
    type: 'JSXExpressionContainer',
    expression: {
      type: 'ArrowFunctionExpression',
      params: [
        { type: 'Identifier', name: 'ev' }
      ],
      body: {
        type: 'CallExpression',
        callee: {
          type: 'Identifier',
          name: propValue
        },
        arguments: [
          { type: 'Identifier', name: 'ev' },
          { type: 'Literal', value: idCounter },
          { type: 'Literal', value: componentName }
        ]
      }
    }
  };
}

export function parseComponent(code: string, injectFunction: boolean, injectInteractive: boolean, injectId: boolean) {
  const ast = parse(code);
  // console.log(ast);
  if (injectFunction) {
    // Modify AST for function creation
    // The following nodes will be ignored
    ast.body = ast.body.filter((node, index) => {
      // Ignore VariableDeclaration unless it's the last element
      if (node.type === 'VariableDeclaration' && index !== ast.body.length - 1) {
        return false;
      }
      return !['ImportDeclaration', 'ExportAllDeclaration'].includes(node.type)
    });
    for (let i = 0; i < ast.body.length; i++) {
      if (['ExportNamedDeclaration', 'ExportDefaultDeclaration'].includes(ast.body[i].type)) {
        // Replace exports
        ast.body[i] = ast.body[i].declaration;
      }
    }

    // Create Function that returns React Component
    // Create React component by returning last member of body
    let lastStatement = ast.body[ast.body.length - 1];
    // Convert `const Example` to `Example`
    if (lastStatement.type === 'VariableDeclaration') {
      const { declarations } = lastStatement;
      if (declarations.length !== 1) {
        throw new Error('The last example variable declaration must be a single expression.');
      }
      const declaration = declarations[0];
      const expressionStatement = {
        type: 'ExpressionStatement',
        expression: {
          type: 'AssignmentExpression',
          operator: '=',
          left: declaration.id,
          right: declaration.init
        }
      };
      lastStatement = {
        type: 'FunctionDeclaration',
        id: {
          type: 'Identifier',
          name: 'LivePreview'
        },
        body: {
          type: 'BlockStatement',
          body: [
            ...ast.body.slice(0, ast.body.length - 1),
            {
              type: 'ReturnStatement',
              argument: expressionStatement.expression.right.body
            }
          ]
        }
      };
    }
    // Convert `<InlineJSX />` or `Example = () => <InlineJSX />`
    // to `function LivePreview() { return <InlineJSX />; }`
    // console.log(`lastStatement`);
    // console.log(lastStatement);
    if (lastStatement.type === 'ExpressionStatement' && lastStatement.expression.type === 'JSXElement') {
      ast.body = [{
        type: 'ReturnStatement',
        argument: {
          type: 'FunctionDeclaration',
          id: {
            type: 'Identifier',
            name: 'LivePreview'
          },
          body: {
            type: 'BlockStatement',
            body: [
              ...ast.body.slice(0, ast.body.length - 1),
              {
                type: 'ReturnStatement',
                argument: lastStatement
              }
            ]
          }
        }
      }];
    } else {
      ast.body = [
        ...ast.body.slice(0, ast.body.length - 1),
        {
          type: 'ReturnStatement',
          argument: lastStatement
        }
      ];
    }
  }

  const componentsInUse = {};
  // Inject props needed for live editing
  if (injectInteractive || injectId) {
    let idCounter = 0; // When dropping we need to tie back to this AST
    visit(ast, (node: any) => {
      if (node.type !== 'JSXOpeningElement') {
        return;
      }
      componentsInUse[node.name.name] = true;
      if (injectId) {
        node.idCounter = idCounter;
      }
      if (injectInteractive) {
        injectProp(node, 'onDragEnter', 'onLiveRegionDragEnter', idCounter, node.name.name);
        injectProp(node, 'onDragLeave', 'onLiveRegionDragLeave', idCounter, node.name.name);
        injectProp(node, 'onDrop', 'onLiveRegionDrop', idCounter, node.name.name);
        injectProp(node, 'onDragOver', 'onLiveRegionDragOver', idCounter, node.name.name);
        // injectProp(node, 'onMouseEnter', 'onLiveRegionMouseEnter', idCounter, node.name.name);
        injectProp(node, 'onMouseLeave', 'onLiveRegionMouseLeave', idCounter, node.name.name);
        injectProp(node, 'onMouseMove', 'onLiveRegionMouseOver', idCounter, node.name.name);
      }
      idCounter += 1;
    });
  }

  return {
    ast,
    componentsInUse
  };
}

export function stringifyAST(ast: any) {
  return generate(ast, { generator: es2017GeneratorJSX }).trim();
}

// ES2017 TSX w/class members -> ES2017 React Component
export function convertToReactComponent(code: string, injectInteractive: boolean = true) {
  const { ast, componentsInUse } = parseComponent(code, true, injectInteractive, injectInteractive);
  // console.log(ast)
  code = generate(ast, { generator: es2017Generator }).trim();
  /*
  return function LivePreview() {
    return React.createElement(Page,{"onDragEnter":ev => onLiveRegionDragEnter(ev, 0),"onDragLeave":ev => onLiveRegionDragLeave(ev, 0),"onDrop":ev => onLiveRegionDrop(ev, 0)});;
  };
  */
  console.log(code)
  return { code, hasTS: ast.sourceType === 'ts', componentsInUse };
}

