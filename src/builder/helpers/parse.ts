import { Parser } from 'acorn';

const jsx = require('acorn-jsx');
const staticClassFeatures = require('acorn-static-class-features');
const classFields = require('acorn-class-fields');

const jsxParser = Parser.extend(jsx(), classFields, staticClassFeatures);

export const parse = (code: string) => jsxParser.parse(code, {
  ecmaVersion: 2018,
  sourceType: 'module',
  allowReturnOutsideFunction: true
}) as any;

