import { Parser } from 'acorn';
import jsx from 'acorn-jsx';
import staticClassFeatures from 'acorn-static-class-features';
import classFields from 'acorn-class-fields';

const jsxParser = Parser.extend(jsx(), classFields, staticClassFeatures);

export const parse = (code: string) => jsxParser.parse(code, {
  ecmaVersion: 2018,
  sourceType: 'module',
  allowReturnOutsideFunction: true
}) as any;

