import React from 'react';
import { AboutModal, Button, TextContent, TextList, TextListItem } from '@patternfly/react-core';
// const brandImg = "https://www.patternfly.org/v4/images/brandImg.cd87f4d68dcba8304cf9e3192715322f.svg";

class NewComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: true
    };
    this.handleModalToggle = () => {
      this.setState(({ isModalOpen }) => ({
        isModalOpen: !isModalOpen
      }));
    };
  }

  render() {
    const { isModalOpen } = this.state;

    return (
      <React.Fragment>
        <Button variant="primary" onClick={this.handleModalToggle}>
          Show about modal
        </Button>
        <AboutModal
          isOpen={isModalOpen}
          onClose={this.handleModalToggle}
          trademark="Trademark and copyright information here"
        //   brandImageSrc={brandImg}
          brandImageAlt="Patternfly Logo"
          productName="Product Name"
        >
          <TextContent>
            <TextList component="dl">
              <TextListItem component="dt">CFME Version</TextListItem>
              <TextListItem component="dd">5.5.3.4.20102789036450</TextListItem>
              <TextListItem component="dt">Cloudforms Version</TextListItem>
              <TextListItem component="dd">4.1</TextListItem>
              <TextListItem component="dt">Server Name</TextListItem>
              <TextListItem component="dd">40DemoMaster</TextListItem>
              <TextListItem component="dt">User Name</TextListItem>
              <TextListItem component="dd">Administrator</TextListItem>
              <TextListItem component="dt">User Role</TextListItem>
              <TextListItem component="dd">EvmRole-super_administrator</TextListItem>
              <TextListItem component="dt">Browser Version</TextListItem>
              <TextListItem component="dd">601.2</TextListItem>
              <TextListItem component="dt">Browser OS</TextListItem>
              <TextListItem component="dd">Mac</TextListItem>
            </TextList>
          </TextContent>
        </AboutModal>
      </React.Fragment>
    );
  }
}

export default NewComponent;
