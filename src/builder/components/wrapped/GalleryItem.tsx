import * as React from "react";
import { GalleryItem as PfGalleryItem } from "@patternfly/react-core";
import { css } from "@patternfly/react-styles";

export const GalleryItem = ({ children, className, ...props }) => {
  return (
    <PfGalleryItem className={css(className, 'pf-l-gallery__item')} {...props}>
      {children}
    </PfGalleryItem>
  );
};
