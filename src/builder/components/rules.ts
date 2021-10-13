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
  AboutModal: `<AboutModal className="${componentToClassMap.AboutModal}" isOpen appendTo={() => document.querySelector('.live-region .pf-c-page__main')}></AboutModal>`,
  AccordionItem: `<AccordionItem><div className="${componentToClassMap.AccordionItem}"></div></AccordionItem>`,
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
  Alert: `<Alert title="Alert"></Alert>`,
  AlertActionCloseButton: {
    component: "Alert",
    prop: "actionClose",
    jsx: `<AlertActionCloseButton className="${componentToClassMap.AlertActionCloseButton}"></AlertActionCloseButton>`,
  },
  AlertActionLink: {
    component: "Alert",
    prop: "actionLinks",
    jsx: `<AlertActionLink className="${componentToClassMap.AlertActionLink}">Action link</AlertActionLink>`,
  },
  ApplicationLauncher: `<ApplicationLauncher items={[]} isOpen />`,
  ApplicationLauncherItem: {
    component: "ApplicationLauncher",
    prop: "items",
    jsx: `<ApplicationLauncherItem>Item</ApplicationLauncherItem>`,
  },
  ApplicationLauncherContent: {
    component: "ApplicationLauncherItem",
    prop: "component",
    jsx: `<a href="#"><ApplicationLauncherContent>Link</ApplicationLauncherContent></a>`,
    targets: ["ApplicationLauncherItem"],
  },
  ApplicationLauncherGroup: {
    component: "ApplicationLauncher",
    prop: "items",
    jsx: `<ApplicationLauncherGroup></ApplicationLauncherGroup>`,
  },
  ApplicationLauncherSeparator: {
    component: "ApplicationLauncher",
    prop: "items",
    jsx: `<ApplicationLauncherSeparator className="${componentToClassMap.ApplicationLauncherSeparator}" />`,
  },
  Avatar: `<Avatar alt="avatar" src="https://www.patternfly.org/v4/images/avatarImg.668560cdf25a4932ef9f711b4acad52d.svg" />`,
  BackgroundImage: `<BackgroundImage />`,
  Badge: "<Badge>5</Badge>",
  BadgeToggle: `<BadgeToggle className="${componentToClassMap.BadgeToggle}"></BadgeToggle>`,
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
    targets: ["ChipGroupList", "*"],
  },
  ChipGroup: `<ChipGroup categoryName="Category"><Chip>Chip</Chip></ChipGroup>`,
  ClipboardCopy: `<ClipboardCopy>Clipboard copyable</ClipboardCopy>`,
  ClipboardCopyAction: {
    component: "ClipboardCopy",
    props: [
      {
        prop: "additionalActions",
        jsx: `<ClipboardCopyAction><Button variant="plain">Action</Button></ClipboardCopyAction>`,
      },
      {
        prop: "variant",
        jsx: `"inline-compact"`,
      },
    ],
  },
  ClipboardCopyButton: {
    jsx: `<ClipboardCopyButton className="${componentToClassMap.ClipboardCopyButton}" />`,
    targets: ["*"],
  },
  CodeBlockAction: {
    component: "CodeBlock",
    prop: "actions",
    jsx: `<React.Fragment>
    <CodeBlockAction>
      <ClipboardCopyButton variant="plain">
        Copy to clipboard
      </ClipboardCopyButton>
    </CodeBlockAction>
  </React.Fragment>`,
  },
  CodeBlockCode: `<CodeBlockCode>const msg = "Hello world!";</CodeBlockCode>`,
  ContextSelector: `<ContextSelector isOpen toggleText="Selected item"></ContextSelector>`,
  ContextSelectorItem: `<ContextSelectorItem>Item</ContextSelectorItem>`,
  ContextSelectorFooter: {
    component: "ContextSelector",
    prop: "footer",
    jsx: `<ContextSelectorFooter><Button variant="link" isInline>Footer</Button></ContextSelectorFooter>`,
  },
  DataListItemRow: {
    targets: ['DataListItem']
  },
  DataListItemCells: {
    jsx: `<DataListItemCells dataListCells={[]} />`,
    targets: ['DataListItemRow']
  },
  DataListCell: {
    component: 'DataListItemCells',
    prop: 'dataListCells',
    jsx: `<DataListCell>Cell</DataListCell>`,
    targets: ['DataListItemCells']
  },
  DataListCheck: {
    // also needs prop `otherControls` if inserted right after DataListDragButton
    jsx: `<DataListCheck />`,
    targets: ['DataListItemRow', 'DataListControl']
  },
  DataListAction: {
    jsx: `<DataListAction><Button>Action</Button></DataListAction>`,
    targets: ['DataListItemRow']
  },
  DataListToggle: {
    // should also add prop isExpanded to DataListItem further up the tree
    jsx: `<DataListToggle isExpanded />`,
    targets: ['DataListItemRow']
  },
  DataListContent: {
    jsx: `<DataListContent isHidden={false}>Content</DataListContent>`,
    targets: ['DataListItem']
  },
  DataListControl: {
    targets: ['DataListItemRow']
  },
  DataListDragButton: {
    jsx: `<DataListDragButton />`,
    targets: ['DataListControl']
  },
  DatePicker: `<DatePicker />`,
  DescriptionListTerm: {
    targets: ['DescriptionListGroup']
  },
  DescriptionListDescription: {
    jsx: `<DescriptionListDescription>Description</DescriptionListDescription>`,
    targets: ['DescriptionListGroup']
  },
  DescriptionListTermHelpText: {
    targets: ['DescriptionListGroup']
  },
  DescriptionListTermHelpTextButton: {
    jsx: `<Popover bodyContent="Additional info"><DescriptionListTermHelpTextButton>Field</DescriptionListTermHelpTextButton></Popover>`,
    targets: ['DescriptionListTermHelpText']
  },
  Divider: `<Divider />`,
  DropdownSeparator: `<DropdownSeparator className="${componentToClassMap.DropdownSeparator}"></DropdownSeparator>`,
  FormFieldGroupExpandable: `<FormFieldGroupExpandable className="${componentToClassMap.FormFieldGroupExpandable}"></FormFieldGroupExpandable>`,
  FormSelectOption: `<FormSelectOption className="${componentToClassMap.FormSelectOption}"></FormSelectOption>`,
  FormSelectOptionGroup: `<FormSelectOptionGroup className="${componentToClassMap.FormSelectOptionGroup}"></FormSelectOptionGroup>`,
  KebabToggle: `<KebabToggle className="${componentToClassMap.KebabToggle}"></KebabToggle>`,
  LoginFooterItem: `<LoginFooterItem className="${componentToClassMap.LoginFooterItem}"></LoginFooterItem>`,
  LoginForm: `<LoginForm className="${componentToClassMap.LoginForm}"></LoginForm>`,
  LoginPage: `<LoginPage className="${componentToClassMap.LoginPage}"></LoginPage>`,
  ModalBoxCloseButton: `<ModalBoxCloseButton className="${componentToClassMap.ModalBoxCloseButton}"></ModalBoxCloseButton>`,
  NavItemSeparator: `<NavItemSeparator className="${componentToClassMap.NavItemSeparator}"></NavItemSeparator>`,
  OptionsMenuSeparator: `<OptionsMenuSeparator className="${componentToClassMap.OptionsMenuSeparator}"></OptionsMenuSeparator>`,
  OverflowMenuDropdownItem: `<OverflowMenuDropdownItem className="${componentToClassMap.OverflowMenuDropdownItem}"></OverflowMenuDropdownItem>`,
  PageHeader: {
    component: "Page",
    prop: "header"
  },
  PageSection: `<PageSection className="${componentToClassMap.PageSection}"></PageSection>`,
  PageToggleButton: `<PageToggleButton className="${componentToClassMap.PageToggleButton}"></PageToggleButton>`,
  SimpleListItem: `<SimpleListItem className="${componentToClassMap.SimpleListItem}"></SimpleListItem>`,
  Text: `<Text className="${componentToClassMap.Text}"></Text>`,
  TextList: `<TextList className="${componentToClassMap.TextList}"></TextList>`,
  TextListItem: `<TextListItem className="${componentToClassMap.TextListItem}"></TextListItem>`,
};

export const layoutRules = {
  Gallery: "<Gallery hasGutter={true}></Gallery>",
  GalleryItem: `<GalleryItem className="pf-l-gallery__item"></GalleryItem>`,
  FlexItem: `<FlexItem className="pf-l-flex__item"></FlexItem>`,
};
