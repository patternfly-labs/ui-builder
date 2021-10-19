// snippets that are more than just simple passthroughs
export const componentSnippets = {
  // PageHeaderSnippet: {
  //   component: "Page",
  //   prop: "header",
  //   jsx: "<PageHeaderSnippet />",
  //   code: PageHeaderSnippetRaw,
  // },
  PageHeaderSnippet: {
    jsx: `<PageHeader
    logo={<Brand alt="Patternfly Logo" />}
    headerTools={<PageHeaderTools></PageHeaderTools>}
    showNavToggle
  />`,
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
