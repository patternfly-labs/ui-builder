import * as React from "react";
import { DatePicker as PfDatePicker } from "@patternfly/react-core";

export const DatePicker = ({ children, ...props }) => {
  return (
    <PfDatePicker appendTo={() => document.body} {...props}>
      {children}
    </PfDatePicker>
  );
};
