import * as React from 'react';
import { render } from 'react-dom';
import { App } from './app';
import "@patternfly/patternfly/patternfly.css";
import "@patternfly/patternfly/patternfly-addons.css";
import "./styles.css";

render(<App />, document.getElementById('root'));
