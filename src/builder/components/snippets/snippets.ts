// snippets that are more than just simple passthroughs
export const componentSnippets = {
  PageHeaderSnippet: {
    jsx: `<PageHeader
    logo={<Brand src="https://www.patternfly.org/v4/images/pfColorLogo.4189e7eb1a0741ea2b3b51b80d33c4cb.svg" alt="Patternfly Logo" />}
    headerTools={<PageHeaderTools></PageHeaderTools>}
    showNavToggle
  />`,
    imports: ['PageHeader'],
    targets: ["Page"],
    props: [
      {
        component: "Page",
        prop: "header",
      },
    ],
  },
  // PageHeaderSnippet: {
  //   props: [{
  //     component: 'Page',
  //     prop: 'header',
  //     jsx: `<Masthead>
  //     <MastheadToggle>
  //       <PageToggleButton
  //         variant="plain"
  //         aria-label="Global navigation"
  //         isNavOpen
  //       >
  //       </PageToggleButton>
  //     </MastheadToggle>
  //     <MastheadMain>
  //       <MastheadBrand href="https://patternfly.org" onClick={() => console.log('clicked logo')} target="_blank">
  //         Logo
  //       </MastheadBrand>
  //     </MastheadMain>
  //     <MastheadContent>Toolbar</MastheadContent>
  //   </Masthead>`
  //   }],
  //   targets: ['Page']
  // },
  PageNavSnippet: {
    jsx: `<Nav variant="tertiary" aria-label="Nav">
      <NavList>
        <NavItem itemId={0}>
          System panel
        </NavItem>
        <NavItem itemId={1}>
          Policy
        </NavItem>
        <NavItem itemId={2} isActive={true}>
          Authentication
        </NavItem>
        <NavItem itemId={3}>
          Network services
        </NavItem>
        <NavItem itemId={4}>
          Server
        </NavItem>
      </NavList>
    </Nav>`,
    imports: ['Nav', 'NavList', 'NavItem'],
    targets: ["Page"],
    props: [
      {
        component: "Page",
        prop: "tertiaryNav",
      },
    ],
  },
  PageBreadcrumbSnippet: {
    jsx: `<Breadcrumb>
      <BreadcrumbItem>Section home</BreadcrumbItem>
      <BreadcrumbItem to="#">Section title</BreadcrumbItem>
      <BreadcrumbItem to="#">Section title</BreadcrumbItem>
      <BreadcrumbItem to="#" isActive={true}>
        Section landing
      </BreadcrumbItem>
    </Breadcrumb>`,
    imports: ['Breadcrumb', 'BreadcrumbItem'],
    targets: ["Page"],
    props: [
      {
        component: "Page",
        prop: "breadcrumb",
      },
    ],
  },
  PageGroupedContentSnippet: {
    targets: ["Page"],
    component: "Page",
    imports: ['PageSection', 'TextContent', 'Text'],
    props: [
      {
        prop: "isTertiaryNavGrouped",
        jsx: `true`,
      },
      {
        prop: "isBreadcrumbGrouped",
        jsx: `true`,
      },
      {
        prop: "additionalGroupedContent",
        jsx: `<PageSection variant="light">
      <TextContent>
        <Text component="h1">Main title</Text>
        <Text component="p">
          Body text should be Overpass Regular at 16px. It should have leading of 24px because of its relative line height of 1.5.
        </Text>
      </TextContent>
    </PageSection>`,
      },
    ],
  },
};
