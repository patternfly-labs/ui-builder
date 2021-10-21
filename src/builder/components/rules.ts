import { componentToClassMap } from "./componentToClassMap";

/**
 * Rules
 * By default, components are simply mapped from their name to a simple jsx tag, i.e. Card -> <Card></Card>
 * If the tag should be different, that can be re-mapped here
 * You can also add additional information, for example if a component needs to be added as a prop to a parent component,
 * or if a component should come before or after a specific sibling component
 */
export const componentRules = {
  // AboutModal: FocusTrap steals focus on each change in the editor
  AboutModal: `<AboutModal isOpen appendTo={() => APPEND_TO_SELECTOR}></AboutModal>`,
  AccordionToggle: {
    jsx: "<AccordionToggle isExpanded>Item</AccordionToggle>",
    targets: ["AccordionItem"],
  },
  AccordionContent: {
    jsx: "<AccordionContent>Content</AccordionContent>",
    targets: ["AccordionItem"],
  },
  AccordionExpandedContentBody: {
    targets: ["AccordionContent"],
  },
  ActionListItem: {
    jsx: `<ActionListItem className="${componentToClassMap.ActionListItem}">Action</ActionListItem>`,
    targets: ["ActionList", "ActionListGroup"],
  },
  // target AlertGroup?
  Alert: `<Alert title="Alert"></Alert>`,
  AlertActionCloseButton: {
    jsx: `<AlertActionCloseButton className="${componentToClassMap.AlertActionCloseButton}"></AlertActionCloseButton>`,
    props: [
      {
        component: "Alert",
        prop: "actionClose",
      },
    ],
  },
  AlertActionLink: {
    jsx: `<AlertActionLink className="${componentToClassMap.AlertActionLink}">Action link</AlertActionLink>`,
    props: [
      {
        component: "Alert",
        prop: "actionLinks",
      },
    ],
  },
  ApplicationLauncher: `<ApplicationLauncher items={[]} isOpen />`,
  ApplicationLauncherItem: {
    jsx: `<ApplicationLauncherItem>Item</ApplicationLauncherItem>`,
    targets: ["ApplicationLauncher", "ApplicationLauncherGroup"],
    props: [
      {
        component: "ApplicationLauncher",
        prop: "items",
      },
    ],
  },
  ApplicationLauncherContent: {
    jsx: `<a href="#"><ApplicationLauncherContent>Link</ApplicationLauncherContent></a>`,
    targets: ["ApplicationLauncherItem"],
    props: [
      {
        component: "ApplicationLauncherItem",
        prop: "component",
      },
    ],
  },
  ApplicationLauncherGroup: {
    props: [
      {
        component: "ApplicationLauncher",
        prop: "items",
      },
    ],
  },
  ApplicationLauncherSeparator: {
    jsx: `<ApplicationLauncherSeparator className="${componentToClassMap.ApplicationLauncherSeparator}" />`,
    targets: ["ApplicationLauncher", "ApplicationLauncherGroup"],
    props: [
      {
        component: "ApplicationLauncher",
        prop: "items",
      },
    ],
  },
  Avatar: `<Avatar alt="avatar" src="https://www.patternfly.org/v4/images/avatarImg.668560cdf25a4932ef9f711b4acad52d.svg" />`,
  // BackgroundImage: `<BackgroundImage />`,
  Badge: "<Badge>5</Badge>",
  Banner: `<Banner>Banner</Banner>`,
  Brand: `<Brand alt="PatternFly logo" src="https://www.patternfly.org/v4/images/pfLogo.ffdafb0c74aa4c9c011251aa8f0c144c.svg" />`,
  BreadcrumbItem: `<BreadcrumbItem to="#">Item</BreadcrumbItem>`,
  BreadcrumbHeading: `<BreadcrumbHeading>Heading</BreadcrumbHeading>`,
  Button: "<Button>Button</Button>",
  CalendarMonth: `<CalendarMonth />`,
  CardActions: {
    targets: ["CardHeader"],
  },
  CardBody: `<CardBody>Body</CardBody>`,
  CardFooter: `<CardFooter>Footer</CardFooter>`,
  CardHeaderMain: {
    jsx: `<CardHeaderMain className="${componentToClassMap.CardHeaderMain}"></CardHeaderMain>`,
    targets: ["CardHeader"],
  },
  CardTitle: `<CardTitle>Title</CardTitle>`,
  Checkbox: `<Checkbox />`,
  Chip: {
    jsx: `<Chip>Chip</Chip>`,
    targets: ["ChipGroupList"],
  },
  ChipGroup: `<ChipGroup categoryName="Category"><Chip>Chip</Chip></ChipGroup>`,
  ClipboardCopy: `<ClipboardCopy>Clipboard copyable</ClipboardCopy>`,
  ClipboardCopyAction: {
    props: [
      {
        component: "ClipboardCopy",
        prop: "additionalActions",
        jsx: `<ClipboardCopyAction><Button variant="plain">Action</Button></ClipboardCopyAction>`,
      },
      {
        component: "ClipboardCopy",
        prop: "variant",
        jsx: `"inline-compact"`,
      },
    ],
  },
  ClipboardCopyButton: `<ClipboardCopyButton className="${componentToClassMap.ClipboardCopyButton}" />`,
  CodeBlockAction: {
    jsx: `<React.Fragment>
    <CodeBlockAction>
      <ClipboardCopyButton variant="plain">
        Copy to clipboard
      </ClipboardCopyButton>
    </CodeBlockAction>
  </React.Fragment>`,
    props: [
      {
        component: "CodeBlock",
        prop: "actions",
      },
    ],
  },
  CodeBlockCode: `<CodeBlockCode>const msg = "Hello world!";</CodeBlockCode>`,
  ContextSelector: `<ContextSelector isOpen toggleText="Selected item"></ContextSelector>`,
  ContextSelectorItem: `<ContextSelectorItem>Item</ContextSelectorItem>`,
  ContextSelectorFooter: {
    jsx: `<ContextSelectorFooter><Button variant="link" isInline>Footer</Button></ContextSelectorFooter>`,
    props: [
      {
        component: "ContextSelector",
        prop: "footer",
      },
    ],
  },
  DataListItemRow: {
    targets: ["DataListItem"],
  },
  DataListItemCells: {
    jsx: `<DataListItemCells dataListCells={[]} />`,
    targets: ["DataListItemRow"],
  },
  DataListCell: {
    jsx: `<DataListCell>Cell</DataListCell>`,
    targets: ["DataListItemCells"],
    props: [
      {
        component: "DataListItemCells",
        prop: "dataListCells",
      },
    ],
  },
  DataListCheck: {
    // also needs prop `otherControls` if inserted right after DataListDragButton
    jsx: `<DataListCheck />`,
    targets: ["DataListItemRow", "DataListControl"],
  },
  DataListAction: {
    jsx: `<DataListAction><Button>Action</Button></DataListAction>`,
    targets: ["DataListItemRow"],
  },
  DataListToggle: {
    // should also add prop isExpanded to DataListItem further up the tree
    jsx: `<DataListToggle isExpanded />`,
    targets: ["DataListItemRow"],
  },
  DataListContent: {
    jsx: `<DataListContent isHidden={false}>Content</DataListContent>`,
    targets: ["DataListItem"],
  },
  DataListControl: {
    targets: ["DataListItemRow"],
  },
  DataListDragButton: {
    jsx: `<DataListDragButton />`,
    targets: ["DataListControl"],
  },
  DatePicker: `<DatePicker />`,
  DescriptionListTerm: {
    targets: ["DescriptionListGroup"],
  },
  DescriptionListDescription: {
    jsx: `<DescriptionListDescription>Description</DescriptionListDescription>`,
    targets: ["DescriptionListGroup"],
  },
  DescriptionListTermHelpText: {
    targets: ["DescriptionListGroup"],
  },
  DescriptionListTermHelpTextButton: {
    jsx: `<Popover bodyContent="Additional info"><DescriptionListTermHelpTextButton>Field</DescriptionListTermHelpTextButton></Popover>`,
    targets: ["DescriptionListTermHelpText"],
  },
  Divider: `<Divider />`,
  Drawer: `<Drawer isExpanded></Drawer>`,
  DrawerContentBody: {
    targets: ["DrawerContent"],
    jsx: `<DrawerContentBody>Content</DrawerContentBody>`,
  },
  DrawerPanelContent: {
    targets: ["DrawerContent"],
    jsx: `<DrawerPanelContent>
    <DrawerHead>
      <span>Drawer panel</span>
      <DrawerActions>
        <DrawerCloseButton />
      </DrawerActions>
    </DrawerHead>
  </DrawerPanelContent>`,
    props: [
      {
        component: "DrawerContent",
        prop: "panelContent",
      },
    ],
  },
  DrawerHead: {
    targets: ["DrawerPanelContent"],
  },
  DrawerActions: {
    targets: ["DrawerHead"],
  },
  DrawerCloseButton: {
    targets: ["DrawerActions"],
  },
  DrawerPanelBody: {
    targets: ["DrawerPanelContent"],
  },
  DrawerSection: `<DrawerSection>Section</DrawerSection>`,
  Dropdown: `<Dropdown
  toggle={<DropdownToggle>Dropdown</DropdownToggle>}
  isOpen
  dropdownItems={[]}
/>`,
  DropdownItem: {
    targets: ["Dropdown", "DropdownGroup"],
    jsx: `<DropdownItem>Item</DropdownItem>`,
    props: [
      {
        component: "Dropdown",
        prop: "dropdownItems",
      },
    ],
  },
  DropdownSeparator: {
    targets: ["Dropdown", "DropdownGroup"],
    jsx: `<DropdownSeparator className="${componentToClassMap.DropdownSeparator}" />`,
    props: [
      {
        component: "Dropdown",
        prop: "dropdownItems",
      },
    ],
  },
  DropdownGroup: {
    props: [
      {
        component: "Dropdown",
        prop: "dropdownItems",
      },
    ],
  },
  DropdownToggle: {
    jsx: `<DropdownToggle>Dropdown</DropdownToggle>`,
    props: [
      {
        component: "Dropdown",
        prop: "toggle",
      },
    ],
  },
  KebabToggle: {
    jsx: `<KebabToggle className="${componentToClassMap.KebabToggle}" />`,
    props: [
      {
        component: "Dropdown",
        prop: "toggle",
      },
    ],
  },
  BadgeToggle: {
    jsx: `<BadgeToggle className="${componentToClassMap.BadgeToggle}">3</BadgeToggle>`,
    props: [
      {
        component: "Dropdown",
        prop: "toggle",
      },
    ],
  },
  DropdownToggleCheckbox: {
    props: [
      {
        component: "DropdownToggle",
        prop: "splitButtonItems",
        jsx: "<DropdownToggleCheckbox></DropdownToggleCheckbox>",
      },
      {
        component: "DropdownToggle",
        prop: "splitButtonVariant",
        jsx: '"checkbox"',
      },
    ],
    targets: ["DropdownToggleAction | DropdownToggle"],
  },
  DropdownToggleAction: {
    props: [
      {
        component: "DropdownToggle",
        prop: "splitButtonItems",
        jsx: "<DropdownToggleAction>Action</DropdownToggleAction>",
      },
      {
        component: "DropdownToggle",
        prop: "splitButtonVariant",
        jsx: '"action"',
      },
    ],
    targets: ["DropdownToggleAction | DropdownToggle"],
  },
  DualListSelector: `<DualListSelector availableOptions={['Option 1', 'Option 2', 'Option 3']} chosenOptions={[]} />`,
  EmptyStateIcon: `<EmptyStateIcon icon={() => 'ICON'} />`,
  EmptyStateBody: `<EmptyStateBody>Body</EmptyStateBody>`,
  ExpandableSection: `<ExpandableSection isExpanded toggleText="Show less">Expanded section</ExpandableSection>`,
  ExpandableSectionToggle: {
    jsx: `<ExpandableSectionToggle isExpanded>Show less</ExpandableSectionToggle>`,
  },
  // bug: when you remove the code from the editor, cannot drop another component into the builder
  // FileUpload: `<FileUpload>Preview</FileUpload>`,
  FileUploadField: {
    jsx: `<FileUploadField>Preview</FileUploadField>`,
  },
  FormFieldGroupExpandable: {
    jsx: `<FormFieldGroupExpandable isExpanded className="${componentToClassMap.FormFieldGroupExpandable}"></FormFieldGroupExpandable>`,
    targets: ["FormFieldGroupExpandable | Form"],
  },
  FormFieldGroupHeader: {
    jsx: `<FormFieldGroupHeader titleText={{ text: 'Group title' }} titleDescription="Group description" />`,
    targets: ["FormFieldGroupExpandable"],
    props: [
      {
        component: "FormFieldGroupExpandable",
        prop: "header",
      },
    ],
  },
  FormGroup: {
    jsx: `<FormGroup label="Label"></FormGroup>`,
    targets: ["Form", "FormSection"],
  },
  FormHelperText: {
    jsx: `<FormHelperText>Helper text</FormHelperText>`,
    targets: ["FormGroup"],
    props: [
      {
        component: "FormGroup",
        prop: "helperText",
      },
    ],
  },
  FormSection: `<FormSection title="Section with optional title"></FormSection>`,
  FormSelectOption: `<FormSelectOption value="value" label="Option" className="${componentToClassMap.FormSelectOption}"></FormSelectOption>`,
  FormSelectOptionGroup: `<FormSelectOptionGroup label="Group" className="${componentToClassMap.FormSelectOptionGroup}"></FormSelectOptionGroup>`,
  HelperTextItem: `<HelperTextItem>Helper text</HelperTextItem>`,
  HintTitle: `<HintTitle>Title</HintTitle>`,
  HintBody: `<HintBody>Body</HintBody>`,
  HintFooter: `<HintFooter>Footer</HintFooter>`,
  InputGroupText: `<InputGroupText>Text</InputGroupText>`,
  JumpLinksItem: `<JumpLinksItem>Jump link item</JumpLinksItem>`,
  Label: `<Label>Label</Label>`,
  LabelGroup: `<LabelGroup><Label>Label</Label></LabelGroup>`,
  ListItem: `<ListItem>List item</ListItem>`,
  // LoginFooterItem: `<LoginFooterItem className="${componentToClassMap.LoginFooterItem}"></LoginFooterItem>`,
  // LoginForm: `<LoginForm className="${componentToClassMap.LoginForm}"></LoginForm>`,
  // LoginPage: `<LoginPage className="${componentToClassMap.LoginPage}"></LoginPage>`,
  MastheadBrand: {
    jsx: `<MastheadBrand>Logo</MastheadBrand>`,
    targets: ["MastheadMain"],
  },
  MastheadContent: `<MastheadContent>Content</MastheadContent>`,
  MastheadToggle: `<MastheadToggle>Toggle</MastheadToggle>`,
  MenuList: {
    targets: ["MenuContent", "MenuGroup"],
  },
  MenuItem: {
    jsx: `<MenuItem>Menu item</MenuItem>`,
    targets: ["MenuList"],
  },
  MenuItemAction: {
    jsx: `<MenuItemAction icon="Icon" />`,
    targets: ["MenuItem"],
    props: [
      {
        component: "MenuItem",
        prop: "actions",
      },
    ],
  },
  MenuGroup: {
    jsx: `<MenuGroup label="Group"></MenuGroup>`,
    targets: ["MenuContent"],
  },
  DrilldownMenu: {
    jsx: `<DrilldownMenu>
    <MenuItem>
      Drilldown Menu item
    </MenuItem>
    </DrilldownMenu>`,
    targets: ["MenuItem"],
    props: [
      {
        component: "MenuItem",
        prop: "drilldownMenu",
      },
    ],
  },
  MenuFooter: `<MenuFooter>Footer</MenuFooter>`,
  MenuToggle: `<MenuToggle isExpanded>Menu toggle</MenuToggle>`,
  Modal: `<Modal isOpen appendTo={() => APPEND_TO_SELECTOR} title="Title" actions={[<Button variant="primary">Confirm</Button>, <Button variant="link">Cancel</Button>]}>Modal content</Modal>`,
  // ModalBoxCloseButton: `<ModalBoxCloseButton className="${componentToClassMap.ModalBoxCloseButton}"></ModalBoxCloseButton>`,
  Nav: `<Nav theme="light"></Nav>`,
  NavExpandable: {
    jsx: `<NavExpandable isExpanded title="Expandable"></NavExpandable>`,
    targets: ["NavList"],
  },
  NavGroup: `<NavGroup title="Group"></NavGroup>`,
  NavItem: {
    jsx: `<NavItem>Nav item</NavItem>`,
    targets: ["NavList", "NavGroup", "NavExpandable"],
  },
  NavItemSeparator: {
    jsx: `<NavItemSeparator className="${componentToClassMap.NavItemSeparator}"></NavItemSeparator>`,
    targets: ["NavList", "NavGroup", "NavExpandable"],
  },
  NotificationDrawerHeader: `<NotificationDrawerHeader count={3}></NotificationDrawerHeader>`,
  NotificationDrawerList: {
    targets: ['NotificationDrawerBody', 'NotificationDrawerGroup']
  },
  NotificationDrawerListItem: {
    targets: ['NotificationDrawerList']
  },
  NotificationDrawerListItemHeader: {
    jsx: `<NotificationDrawerListItemHeader title="Notification title"></NotificationDrawerListItemHeader>`,
    targets: ['NotificationDrawerListItem']
  },
  NotificationDrawerListItemBody: {
    jsx: `<NotificationDrawerListItemBody timestamp="5 minutes ago">Description</NotificationDrawerListItemBody>`,
    targets: ['NotificationDrawerListItem']
  },
  NotificationDrawerGroupList: {
    targets: ['NotificationDrawerBody']
  },
  NotificationDrawerGroup: {
    jsx: `<NotificationDrawerGroup title="Notification group" count={2} isExpanded></NotificationDrawerGroup>`,
    targets: ['NotificationDrawerGroupList']
  },
  NumberInput: `<NumberInput value={20} />`,
  OptionsMenu: `<OptionsMenu menuItems={[]} isOpen toggle={<OptionsMenuToggle toggleTemplate="Options menu" />} />`,
  OptionsMenuToggle: {
    jsx: `<OptionsMenuToggle toggleTemplate="Options menu" />`,
    props: [{
      component: 'OptionsMenu',
      prop: 'toggle'
    }]
  },
  OptionsMenuItem: {
    jsx: `<OptionsMenuItem>Option</OptionsMenuItem>`,
    props: [{
      component: 'OptionsMenu',
      prop: 'menuItems'
    }],
    targets: ['OptionsMenu', 'OptionsMenuItemGroup']
  },
  OptionsMenuItemGroup: {
    jsx: `<OptionsMenuItemGroup></OptionsMenuItemGroup>`,
    props: [{
      component: 'OptionsMenu',
      prop: 'menuItems'
    }]
  },
  OptionsMenuSeparator: {
    jsx: `<OptionsMenuSeparator className="${componentToClassMap.OptionsMenuSeparator}"></OptionsMenuSeparator>`,
    props: [{
      component: 'OptionsMenu',
      prop: 'menuItems'
    }],
    targets: ['OptionsMenu', 'OptionsMenuItemGroup']
  },
  OverflowMenu: `<OverflowMenu breakpoint="lg"></OverflowMenu>`,
  OverflowMenuDropdownItem: {
    jsx: `<OverflowMenuDropdownItem className="${componentToClassMap.OverflowMenuDropdownItem}">Item</OverflowMenuDropdownItem>`,
    props: [{
      component: 'Dropdown',
      prop: 'dropdownItems'
    }],
    targets: ['Dropdown']
  },
  OverflowMenuItem: {
    jsx: `<OverflowMenuItem>Item</OverflowMenuItem>`,
    targets: ['OverflowMenuContent', 'OverflowMenuGroup']
  },
  OverflowMenuGroup: {
    targets: ['OverflowMenuContent']
  },
  OverflowMenuControl: `<OverflowMenuControl hasAdditionalOptions></OverflowMenuControl>`,
  PageHeader: {
    jsx: `<PageHeader
    logo="Logo"
    headerTools={<PageHeaderTools></PageHeaderTools>}
    showNavToggle
    isNavOpen
  />`,
    props: [
      {
        component: "Page",
        prop: "header",
      },
    ],
  },
  PageHeaderTools: {
    props: [{
      component: 'PageHeader',
      prop: 'headerTools'
    }],
    targets: ['PageHeader']
  },
  PageHeaderToolsGroup: {
    targets: ['PageHeaderTools']
  },
  PageHeaderToolsItem: {
    jsx: `<PageHeaderToolsItem>Item</PageHeaderToolsItem>`,
    targets: ['PageHeaderTools', 'PageHeaderToolsGroup']
  },
  PageSidebar: {
    jsx: `<PageSidebar nav="Navigation" isNavOpen theme="light" />`,
    props: [{
      component: 'Page',
      prop: 'sidebar'
    }],
  },
  PageNavigation: {
    targets: ['PageGroup']
  },
  PageBreadcrumb: {
    targets: ['PageGroup']
  },
  PageSection: {
    jsx: `<PageSection className="${componentToClassMap.PageSection}"></PageSection>`,
    targets: ['Page', 'PageGroup']
  },
  PageToggleButton: `<PageToggleButton className="${componentToClassMap.PageToggleButton}"></PageToggleButton>`,
  Pagination: `<Pagination itemCount={523} perPage={20} />`,
  Popover: `<Popover
  aria-label="Basic popover"
  headerContent={<div>Popover header</div>}
  bodyContent={<div>Popovers are triggered by click rather than hover.</div>}
  footerContent="Popover footer"
>
  <Button>Toggle popover</Button>
</Popover>`,
  SimpleListItem: `<SimpleListItem className="${componentToClassMap.SimpleListItem}"></SimpleListItem>`,
  Text: `<Text className="${componentToClassMap.Text}"></Text>`,
  TextList: `<TextList className="${componentToClassMap.TextList}"></TextList>`,
  TextListItem: `<TextListItem className="${componentToClassMap.TextListItem}"></TextListItem>`,
};

export const layoutRules = {
  Gallery: "<Gallery hasGutter={true}></Gallery>",
  GalleryItem: `<GalleryItem className="pf-l-gallery__item"></GalleryItem>`,
  FlexItem: `<FlexItem className="pf-l-flex__item"></FlexItem>`,
  LevelItem: `<LevelItem className="pf-l-level__item"></LevelItem>`,
};
