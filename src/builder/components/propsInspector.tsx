import * as React from "react";
import { Button } from "@patternfly/react-core";
import CogIcon from "@patternfly/react-icons/dist/js/icons/cog-icon";

export const PropsInspector = ({ onInspect }) => {
  return (
    <span className="props-inspector">
      <Button
        variant="plain"
        aria-label="Inspect props"
        onClick={onInspect}
      >
        <CogIcon size="sm" />
      </Button>
    </span>
  );
};
