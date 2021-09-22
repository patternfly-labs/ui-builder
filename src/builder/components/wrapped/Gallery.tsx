import * as React from "react";
import { Gallery as PfGallery } from "@patternfly/react-core";

export const Gallery = ({ children, ...props }) => {
  return (
    <PfGallery hasGutter {...props}>
      {children}
    </PfGallery>
  );
};
