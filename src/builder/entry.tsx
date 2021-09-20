import * as React from 'react';
import { render } from 'react-dom';
import { App } from './app';
import "@patternfly/patternfly/patternfly.css";
import "@patternfly/patternfly/patternfly-addons.css";
import "./styles.css";

export { App as UIBuilder } from './app';

declare global {
    interface Window {
      acquireVsCodeApi(): any;
      initialData: string;
      filePath: string;
    }
  }
  
const vscode = window.acquireVsCodeApi && window.acquireVsCodeApi();

render(<App vscode={vscode} data={window.initialData} filePath={window.filePath} />, document.getElementById('root'));
