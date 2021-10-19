import * as React from "react";
import { componentToClassMap } from "../componentToClassMap";
import { AboutModal as PfAboutModal } from "@patternfly/react-core";

export const AboutModal = (props) => {
  return (
    <PfAboutModal
      className={`${componentToClassMap.AboutModal}`}
      //   appendTo={() => "APPEND_TO_SELECTOR"}
      appendTo={() => document.querySelector(".live-region")}
      {...props}
    ></PfAboutModal>
  );
};
