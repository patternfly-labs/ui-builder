import * as React from "react";
import { Page as PfPage } from "@patternfly/react-core";
import { ComponentAdder } from "../../components/componentAdder";

export const Page = ({ children, ...props }) => {
  return (
    <PfPage {...props}>
      {children}
      {/* <ComponentAdder></ComponentAdder> */}
    </PfPage>
  );
};
