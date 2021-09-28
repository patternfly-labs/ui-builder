import * as React from "react";
import { Button as PfButton } from "@patternfly/react-core";
import { PropsInspector } from "../propsInspector";

export const Button = ({ children, ...props }) => {
  return (
    <span className="wrapped-button">
      <PfButton onClick={() => alert('Clicked button')} {...props}>
        {children || 'Button'}
      </PfButton>
      {/* <PropsInspector onInspect={e => console.log(`Inspect Button`)} /> */}
    </span>
  );
};
