import * as React from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownSeparator,
} from "@patternfly/react-core";
import OutlinedPlusSquare from "@patternfly/react-icons/dist/esm/icons/outlined-plus-square-icon";

export const ComponentAdder = () => {
  const [open, setOpen] = React.useState(false);
  const onToggle = (isOpen) => {
    setOpen(isOpen);
  };
  const onSelect = () => {
    setOpen(!open);
  };
  const dropdownItems = [
    <DropdownItem key="group 1 plaintext" component="div" isPlainText>
      Add a page section
    </DropdownItem>,
    <DropdownSeparator key="dropdown separator" />,
    <DropdownItem key="link">DatePicker</DropdownItem>,
    <DropdownItem key="action">Badge</DropdownItem>,
  ];

  return (
    <Dropdown
      onSelect={onSelect}
      toggle={
        <DropdownToggle toggleIndicator={null} onToggle={onToggle}>
          <OutlinedPlusSquare />
        </DropdownToggle>
      }
      isOpen={open}
      isPlain
      dropdownItems={dropdownItems}
    />
  );
};
