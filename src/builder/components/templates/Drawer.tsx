import React from "react";
import {
  Drawer,
  DrawerPanelContent,
  DrawerContent,
  DrawerContentBody,
  DrawerHead,
  DrawerActions,
  DrawerCloseButton,
  Button,
} from "@patternfly/react-core";

class NewComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: true,
      isResizing: false,
      panelWidth: 200,
    };
    this.drawerRef = React.createRef();

    this.onExpand = () => {
      this.drawerRef.current && this.drawerRef.current.focus();
    };

    this.onClick = () => {
      const isExpanded = !this.state.isExpanded;
      this.setState({
        isExpanded,
      });
    };

    this.onResize = (newWidth, id) => {
      this.setState(
        {
          panelWidth: newWidth,
        },
        () => console.log(`${id} has new width of: ${newWidth}`)
      );
    };

    this.onCloseClick = () => {
      this.setState({
        isExpanded: false,
      });
    };
  }

  render() {
    const { isExpanded } = this.state;
    const panelContent = (
      <DrawerPanelContent
        isResizable
        onResize={this.onResize}
        id="right-resize-panel"
        defaultSize={"600px"}
        minSize={"150px"}
      >
        <DrawerHead>
          <span tabIndex={isExpanded ? 0 : -1} ref={this.drawerRef}>
            drawer-panel
          </span>
          <DrawerActions>
            <DrawerCloseButton onClick={this.onCloseClick} />
          </DrawerActions>
        </DrawerHead>
      </DrawerPanelContent>
    );

    const drawerContent =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pretium est a porttitor vehicula. Quisque vel commodo urna. Morbi mattis rutrum ante, id vehicula ex accumsan ut. Morbi viverra, eros vel porttitor facilisis, eros purus aliquet erat,nec lobortis felis elit pulvinar sem. Vivamus vulputate, risus eget commodo eleifend, eros nibh porta quam, vitae lacinia leo libero at magna. Maecenas aliquam sagittis orci, et posuere nisi ultrices sit amet. Aliquam ex odio, malesuada sed posuere quis, pellentesque at mauris. Phasellus venenatis massa ex, eget pulvinar libero auctor pretium. Aliquam erat volutpat. Duis euismod justo in quam ullamcorper, in commodo massa vulputate.";

    return (
      <React.Fragment>
        <Button aria-expanded={isExpanded} onClick={this.onClick}>
          Toggle drawer
        </Button>
        <Drawer isExpanded={isExpanded} onExpand={this.onExpand}>
          <DrawerContent panelContent={panelContent}>
            <DrawerContentBody>{drawerContent}</DrawerContentBody>
          </DrawerContent>
        </Drawer>
      </React.Fragment>
    );
  }
}

export default NewComponent;
