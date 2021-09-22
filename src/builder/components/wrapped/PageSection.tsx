import * as React from "react";
import { PageSection as PfPageSection } from "@patternfly/react-core";
import { ComponentAdder } from "../../components/componentAdder";

export const PageSection = ({ children, ...props }) => {
  return (
    <PfPageSection {...props}>
      {children}
      {/* <ComponentAdder></ComponentAdder> */}
    </PfPageSection>
  );
};
