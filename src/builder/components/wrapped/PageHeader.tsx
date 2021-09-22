import * as React from "react";
import {
  Avatar,
  Brand,
  Button,
  ButtonVariant,
  Dropdown,
  DropdownGroup,
  DropdownToggle,
  DropdownItem,
  KebabToggle,
  PageHeader as PfPageHeader,
  PageHeaderTools,
  PageHeaderToolsGroup,
  PageHeaderToolsItem,
} from "@patternfly/react-core";
import CogIcon from "@patternfly/react-icons/dist/esm/icons/cog-icon";
import HelpIcon from "@patternfly/react-icons/dist/esm/icons/help-icon";
const imgBrand =
  "https://www.patternfly.org/v4/images/pfLogo.ffdafb0c74aa4c9c011251aa8f0c144c.svg";
const imgAvatar =
  "https://www.patternfly.org/v4/images/avatarImg.668560cdf25a4932ef9f711b4acad52d.svg";

export const PageHeader = ({ ...props }) => {
  const [isDropdownOpen, setDropdownOpen] = React.useState(false);
  const [isKebabOpen, setKebabOpen] = React.useState(false);
  const onDropdownToggle = (isDropdownOpen) => {
    setDropdownOpen(isDropdownOpen);
  };
  const onDropdownSelect = (event) => {
    setDropdownOpen(!isDropdownOpen);
  };
  const onKebabDropdownToggle = (isKebabDropdownOpen) => {
    setKebabOpen(isKebabDropdownOpen);
  };
  const onKebabDropdownSelect = (event) => {
    setKebabOpen(!isKebabOpen);
  };
  const kebabDropdownItems = [
    <DropdownItem>
      <CogIcon /> Settings
    </DropdownItem>,
    <DropdownItem>
      <HelpIcon /> Help
    </DropdownItem>,
  ];
  const userDropdownItems = [
    <DropdownGroup key="group 2">
      <DropdownItem key="group 2 profile">My profile</DropdownItem>
      <DropdownItem key="group 2 user" component="button">
        User management
      </DropdownItem>
      <DropdownItem key="group 2 logout">Logout</DropdownItem>
    </DropdownGroup>,
  ];
  const headerTools = (
    <PageHeaderTools>
      <PageHeaderToolsGroup
        visibility={{
          default: "hidden",
          lg: "visible",
        }} /** the settings and help icon buttons are only visible on desktop sizes and replaced by a kebab dropdown for other sizes */
      >
        <PageHeaderToolsItem>
          <Button aria-label="Settings actions" variant={ButtonVariant.plain}>
            <CogIcon />
          </Button>
        </PageHeaderToolsItem>
        <PageHeaderToolsItem>
          <Button aria-label="Help actions" variant={ButtonVariant.plain}>
            <HelpIcon />
          </Button>
        </PageHeaderToolsItem>
      </PageHeaderToolsGroup>
      <PageHeaderToolsGroup>
        <PageHeaderToolsItem
          visibility={{
            lg: "hidden",
          }} /** this kebab dropdown replaces the icon buttons and is hidden for desktop sizes */
        >
          <Dropdown
            isPlain
            position="right"
            onSelect={onKebabDropdownSelect}
            toggle={<KebabToggle onToggle={onKebabDropdownToggle} />}
            isOpen={isKebabOpen}
            dropdownItems={kebabDropdownItems}
          />
        </PageHeaderToolsItem>
        <PageHeaderToolsItem
          visibility={{
            default: "hidden",
            md: "visible",
          }} /** this user dropdown is hidden on mobile sizes */
        >
          <Dropdown
            isPlain
            position="right"
            onSelect={onDropdownSelect}
            isOpen={isDropdownOpen}
            toggle={
              <DropdownToggle onToggle={onDropdownToggle}>
                John Smith
              </DropdownToggle>
            }
            dropdownItems={userDropdownItems}
          />
        </PageHeaderToolsItem>
      </PageHeaderToolsGroup>
      <Avatar src={imgAvatar} alt="Avatar image" />
    </PageHeaderTools>
  );
  return (
    <PfPageHeader
      logo={<Brand src={imgBrand} alt="Patternfly Logo" />}
      headerTools={headerTools}
      showNavToggle
      {...props}
    ></PfPageHeader>
  );
};
