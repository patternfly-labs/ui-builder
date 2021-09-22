import * as React from "react";
import { Button as PfButton } from "@patternfly/react-core";

export const Button = ({ children, ...props }) => {
  return (
    <PfButton onClick={() => alert('Clicked button')} {...props}>
      {children || 'Button'}
    </PfButton>
  );
};
