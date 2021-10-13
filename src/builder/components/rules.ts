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
  AccordionToggle: "<AccordionToggle isExpanded>Item</AccordionToggle>",
  AccordionContent: "<AccordionContent>Content</AccordionContent>",
  ActionListItem: `<ActionListItem className="${componentToClassMap.ActionListItem}">Action</ActionListItem>`,
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
    jsx: `<ApplicationLauncherItem>Item</ApplicationLauncherItem>`
  },
  ApplicationLauncherContent: {
    component: "ApplicationLauncherItem",
    prop: "component",
    jsx: `<a href="#"><ApplicationLauncherContent>Link</ApplicationLauncherContent></a>`
  },
  ApplicationLauncherGroup: {
    component: "ApplicationLauncher",
    prop: "items",
    jsx: `<ApplicationLauncherGroup></ApplicationLauncherGroup>`
  },
  ApplicationLauncherSeparator: {
    component: "ApplicationLauncher",
    prop: "items",
    jsx: `<ApplicationLauncherSeparator className="${componentToClassMap.ApplicationLauncherSeparator}" />`
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
  CardBody: `<CardBody>Body</CardBody>`,
  CardFooter: `<CardFooter>Footer</CardFooter>`,
  CardHeaderMain: `<CardHeaderMain className="${componentToClassMap.CardHeaderMain}"></CardHeaderMain>`,
  CardTitle: `<CardTitle>Title</CardTitle>`,
  Checkbox: `<Checkbox />`,
  Chip: `<Chip>Chip</Chip>`,
  ChipGroup: `<ChipGroup categoryName="Category"><Chip>Chip</Chip></ChipGroup>`,
  ClipboardCopyButton: `<ClipboardCopyButton className="${componentToClassMap.ClipboardCopyButton}" />`,
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
    prop: "header",
    jsx: "<PageHeader></PageHeader>",
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

// restrict allowed drag targets
export const allowableDropMap = {
  AccordionToggle: {
    AccordionItem: '.' + componentToClassMap.AccordionItem
  },
  AccordionContent: {
    AccordionItem: '.' + componentToClassMap.AccordionItem
  },
  AccordionExpandedContentBody: {
    AccordionContent: '.' + componentToClassMap.AccordionContent
  },
  ActionListItem: {
    ActionList: '.' + componentToClassMap.ActionList,
    ActionListGroup: '.' + componentToClassMap.ActionListGroup
  },
  ApplicationLauncherContent: {
    ApplicationLauncherItem: '.' + componentToClassMap.ApplicationLauncherItem
  },
  CardActions: {
    CardHeader: '.' + componentToClassMap.CardHeader
  },
  CardHeaderMain: {
    CardHeader: '.' + componentToClassMap.CardHeader
  },
  Chip: {
    ChipGroup: '.' + componentToClassMap.ChipGroup + '__list',
    '*': '*' 
  }
};
