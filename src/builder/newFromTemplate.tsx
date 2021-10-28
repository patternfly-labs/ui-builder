// @ts-nocheck
import * as React from "react";
import CaretDownIcon from "@patternfly/react-icons/dist/esm/icons/caret-down-icon";
import { Dropdown, DropdownItem, DropdownToggle } from "@patternfly/react-core";
import NewPage from "!!raw-loader!./components/templates/NewPage";
import NewComponent from "!!raw-loader!./components/templates/NewComponent";
import FullPage from "!!raw-loader!./components/templates/FullPage";
import Drawer from "!!raw-loader!./components/templates/Drawer";

class NewFromTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.options = [
      // <DropdownItem key={0} onClick={() => this.props.setCode(NewComponent)}>
      //   Component
      // </DropdownItem>,
      <DropdownItem key={1} onClick={() => this.props.setCode(NewPage)}>
        Basic page
      </DropdownItem>,
      <DropdownItem key={2} onClick={() => this.props.setCode(FullPage)}>
        Full page
      </DropdownItem>,
      <DropdownItem key={3} onClick={() => this.props.setCode(Drawer)}>
        Drawer
      </DropdownItem>,
    ];

    this.state = {
      isOpen: false,
    };

    this.onToggle = (isOpen) => {
      this.setState({
        isOpen,
      });
    };

    this.onSelect = (event) => {
      this.setState({
        isOpen: false,
      });
    };
  }

  render() {
    const { isOpen, selected } = this.state;
    const titleId = "title-id-1";
    return (
      <Dropdown
        onSelect={this.onSelect}
        toggle={
          <DropdownToggle
            id="toggle-id"
            onToggle={this.onToggle}
            toggleIndicator={CaretDownIcon}
          >
            New from template
          </DropdownToggle>
        }
        isOpen={isOpen}
        dropdownItems={this.options}
      />
    );
  }
}

export default NewFromTemplate;
