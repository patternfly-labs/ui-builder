import * as React from 'react';
import GripVerticalIcon from '@patternfly/react-icons/dist/js/icons/grip-vertical-icon';

const components = {
  PageSection: '<PageSection>PageSection</PageSection>',
  Button: '<Button>Button</Button>',
};

function ComponentItem([component, code]) {
  const spanId = `component-list-${component}`;

  return (
    <li
      key={component}
      className="pf-c-data-list__item"
      aria-labelledby={spanId}
      draggable
      onDragStart={ev => {
        ev.dataTransfer.setData('text/plain', code);
        ev.dataTransfer.dropEffect = 'copy';
      }}
    >
      <div className="pf-c-data-list__item-row">
        <div className="pf-c-data-list__item-control">
          <button className="pf-c-data-list__item-draggable-button">
            <span className="pf-c-data-list__item-draggable-icon">
              <GripVerticalIcon />
            </span>
          </button>
        </div>
        <div className="pf-c-data-list__item-content">
          <div className="pf-c-data-list__cell">
            <span id={spanId}>
              {component}
            </span>
          </div>
        </div>
      </div>
    </li>
  );
}

export const ComponentList = () => {
  return (
    <ul
      className="pf-c-data-list"
      role="list"
      aria-label="Basic data list example"
    >
      {Object.entries(components).map(ComponentItem)}
    </ul>
  );
}
