import React from "react";
import { Page, PageSection } from "@patternfly/react-core";

class NewComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Page>
        <PageSection variant="default"></PageSection>
      </Page>
    );
  }
}

export default NewComponent;
