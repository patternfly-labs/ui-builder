import React from "react";
import { Flex, FlexItem } from "@patternfly/react-core";

class NewComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flex direction={{ default: "column" }} className="pf-u-h-100">
          <FlexItem className="pf-l-flex__item"></FlexItem>
      </Flex>
    );
  }
}

export default NewComponent;
