import React from 'react';
import {
  Brand,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonVariant,
  Card,
  CardBody,
  Dropdown,
  DropdownGroup,
  DropdownToggle,
  DropdownItem,
  Gallery,
  GalleryItem,
  KebabToggle,
  Nav,
  NavItem,
  NavList,
  Page,
  PageHeader,
  PageSection,
  PageSectionVariants,
  PageGroup,
  PageBreadcrumb,
  PageNavigation,
  SkipToContent,
  TextContent,
  Text,
  PageHeaderTools,
  PageHeaderToolsGroup,
  PageHeaderToolsItem,
} from '@patternfly/react-core';

class NewComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropdownOpen: false,
      isKebabDropdownOpen: false,
      activeItem: 0
    };
    this.onDropdownToggle = isDropdownOpen => {
      this.setState({
        isDropdownOpen
      });
    };

    this.onDropdownSelect = event => {
      this.setState({
        isDropdownOpen: !this.state.isDropdownOpen
      });
    };

    this.onKebabDropdownToggle = isKebabDropdownOpen => {
      this.setState({
        isKebabDropdownOpen
      });
    };

    this.onKebabDropdownSelect = event => {
      this.setState({
        isKebabDropdownOpen: !this.state.isKebabDropdownOpen
      });
    };

    this.onNavSelect = result => {
      this.setState({
        activeItem: result.itemId
      });
    };
  }

  render() {
    const { isDropdownOpen, isKebabDropdownOpen, activeItem } = this.state;

    const kebabDropdownItems = [
      <DropdownItem>
        Settings
      </DropdownItem>,
      <DropdownItem>
        Help
      </DropdownItem>
    ];
    const userDropdownItems = [
      <DropdownGroup key="group 2">
        <DropdownItem key="group 2 profile">My profile</DropdownItem>
        <DropdownItem key="group 2 user" component="button">
          User management
        </DropdownItem>
        <DropdownItem key="group 2 logout">Logout</DropdownItem>
      </DropdownGroup>
    ];
    const headerTools = (
      <PageHeaderTools>
        <PageHeaderToolsGroup
          visibility={{
            default: 'hidden',
            lg: 'visible'
          }} /** the settings and help icon buttons are only visible on desktop sizes and replaced by a kebab dropdown for other sizes */
        >
          <PageHeaderToolsItem>
            <Button aria-label="Settings actions" variant={ButtonVariant.plain}>
              Settings
            </Button>
          </PageHeaderToolsItem>
          <PageHeaderToolsItem>
            <Button aria-label="Help actions" variant={ButtonVariant.plain}>
              Help
            </Button>
          </PageHeaderToolsItem>
        </PageHeaderToolsGroup>
        <PageHeaderToolsGroup>
          <PageHeaderToolsItem
            visibility={{
              lg: 'hidden'
            }} /** this kebab dropdown replaces the icon buttons and is hidden for desktop sizes */
          >
            <Dropdown
              isPlain
              position="right"
              onSelect={this.onKebabDropdownSelect}
              toggle={<KebabToggle onToggle={this.onKebabDropdownToggle} />}
              isOpen={isKebabDropdownOpen}
              dropdownItems={kebabDropdownItems}
            />
          </PageHeaderToolsItem>
          <PageHeaderToolsItem
            visibility={{ default: 'hidden', md: 'visible' }} /** this user dropdown is hidden on mobile sizes */
          >
            <Dropdown
              isPlain
              position="right"
              onSelect={this.onDropdownSelect}
              isOpen={isDropdownOpen}
              toggle={<DropdownToggle onToggle={this.onDropdownToggle}>John Smith</DropdownToggle>}
              dropdownItems={userDropdownItems}
            />
          </PageHeaderToolsItem>
        </PageHeaderToolsGroup>
      </PageHeaderTools>
    );

    const Header = (
      <PageHeader logo={<Brand alt="Patternfly Logo" />} headerTools={headerTools} showNavToggle />
    );
    const pageId = 'main-content-page-layout-tertiary-nav';
    const PageSkipToContent = <SkipToContent href={`#${pageId}`}>Skip to content</SkipToContent>;

    return (
      <React.Fragment>
        <Page header={Header} isManagedSidebar skipToContent={PageSkipToContent} mainContainerId={pageId}>
          <PageGroup sticky="top">
            <PageNavigation isWidthLimited>
              <Nav variant="tertiary" onSelect={this.onNavSelect} aria-label="Nav">
                <NavList>
                  <NavItem itemId={0} isActive={activeItem === 0}>
                    System panel
                  </NavItem>
                  <NavItem itemId={1} isActive={activeItem === 1}>
                    Policy
                  </NavItem>
                  <NavItem itemId={2} isActive={activeItem === 2}>
                    Authentication
                  </NavItem>
                  <NavItem itemId={3} isActive={activeItem === 3}>
                    Network services
                  </NavItem>
                  <NavItem itemId={4} isActive={activeItem === 4}>
                    Server
                  </NavItem>
                </NavList>
              </Nav>
            </PageNavigation>
            <PageBreadcrumb>
              <Breadcrumb>
                <BreadcrumbItem>Section home</BreadcrumbItem>
                <BreadcrumbItem to="#">Section title</BreadcrumbItem>
                <BreadcrumbItem to="#">Section title</BreadcrumbItem>
                <BreadcrumbItem to="#" isActive>
                  Section landing
                </BreadcrumbItem>
              </Breadcrumb>
            </PageBreadcrumb>
            <PageSection variant={PageSectionVariants.light}>
              <TextContent>
                <Text component="h1">Main title</Text>
                <Text component="p">
                  Body text should be Overpass Regular at 16px. It should have leading of 24px because <br />
                  of its relative line height of 1.5.
                </Text>
              </TextContent>
            </PageSection>{' '}
          </PageGroup>
          <PageSection>
            <Gallery hasGutter>
              {Array.apply(0, Array(20)).map((x, i) => (
                <GalleryItem key={i}>
                  <Card>
                    <CardBody>This is a card</CardBody>
                  </Card>
                </GalleryItem>
              ))}
            </Gallery>
          </PageSection>
        </Page>
      </React.Fragment>
    );
  }
}

export default NewComponent;
