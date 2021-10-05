// @ts-nocheck
import * as React from "react";
import CubeIcon from "@patternfly/react-icons/dist/esm/icons/cube-icon";
import {
  Select,
  SelectOption,
  SelectVariant,
  SelectDirection,
} from "@patternfly/react-core";
import PageEmpty from "!!raw-loader!./components/templates/PageEmpty";
import PageSticky from "!!raw-loader!./components/templates/PageSticky";
// import AboutModal from "!!raw-loader!./components/templates/AboutModal";
import Drawer from "!!raw-loader!./components/templates/Drawer";

class NewFromTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.options = [
      <SelectOption key={0} value={PageEmpty}>
        Empty page
      </SelectOption>,
      <SelectOption key={1} value={PageSticky}>
        Page with sticky top
      </SelectOption>,
      // <SelectOption key={2} value={AboutModal}>
      //   About modal
      // </SelectOption>,
      <SelectOption key={2} value={Drawer}>
        Drawer
      </SelectOption>,
    ];

    this.state = {
      isToggleIcon: false,
      isOpen: false,
      selected: null,
      isDisabled: false,
      direction: SelectDirection.down,
    };

    this.onToggle = (isOpen) => {
      this.setState({
        isOpen,
      });
    };

    this.onSelect = (event, selection, isPlaceholder) => {
      if (isPlaceholder) {
        this.clearSelection();
      } else {
        this.setState({
          selected: selection,
          isOpen: false,
        });
        this.props.setCode(selection);
      }
    };

    this.clearSelection = () => {
      this.setState({
        selected: null,
        isOpen: false,
      });
    };

    this.toggleDisabled = (checked) => {
      this.setState({
        isDisabled: checked,
      });
    };

    this.setIcon = (checked) => {
      this.setState({
        isToggleIcon: checked,
      });
    };

    this.toggleDirection = () => {
      if (this.state.direction === SelectDirection.up) {
        this.setState({
          direction: SelectDirection.down,
        });
      } else {
        this.setState({
          direction: SelectDirection.up,
        });
      }
    };
  }

  render() {
    const { isOpen, selected } = this.state;
    const titleId = "title-id-1";
    return (
      <Select
        toggleIcon={<CubeIcon />}
        variant={SelectVariant.single}
        placeholderText="New from template"
        aria-label="Select Input"
        onToggle={this.onToggle}
        onSelect={this.onSelect}
        selections={selected}
        isOpen={isOpen}
        aria-labelledby={titleId}
      >
        {this.options}
      </Select>
    );
  }
}

export default NewFromTemplate;
