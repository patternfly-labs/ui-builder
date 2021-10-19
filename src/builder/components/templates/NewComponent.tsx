import React from "react";
import { Flex } from "@patternfly/react-core";

class NewComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Flex direction={{ default: "column" }}></Flex>;
  }
}

export default NewComponent;
