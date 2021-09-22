import * as React from "react";
import { CardBody as PfCardBody } from "@patternfly/react-core";

export const CardBody = ({ children, ...props }) => {
  return (
    <PfCardBody {...props}>
      {children || "This is a card"}
    </PfCardBody>
  );
};
