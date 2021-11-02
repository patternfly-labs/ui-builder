import * as React from "react";
import { Modal as PfModal } from "@patternfly/react-core";

export const Modal = ({ children, ...props }) => {
  return (
    <PfModal appendTo={() => document.querySelector(".live-region")} disableFocusTrap {...props}>
      {children}
    </PfModal>
  );
};
