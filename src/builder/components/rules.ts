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
  AlertActionCloseButton: {
    component: "Alert",
    prop: "actionClose",
    jsx: `<AlertActionCloseButton className="${componentToClassMap.AlertActionCloseButton}"></AlertActionCloseButton>`,
  },
  AlertActionLink: `<AlertActionLink className="${componentToClassMap.AlertActionLink}"></AlertActionLink>`,
  ApplicationLauncherSeparator: `<ApplicationLauncherSeparator className="${componentToClassMap.ApplicationLauncherSeparator}" />`,
  BackgroundImage: `<BackgroundImage />`,
  Badge: "<Badge>5</Badge>",
  BadgeToggle: `<BadgeToggle className="${componentToClassMap.BadgeToggle}"></BadgeToggle>`,
  Button: "<Button>Button</Button>",
  CardBody: "<CardBody>Card body</CardBody>",
  CardHeaderMain: `<CardHeaderMain className="${componentToClassMap.CardHeaderMain}"></CardHeaderMain>`,
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
    AccordionItem: componentToClassMap.AccordionItem
  },
  AccordionContent: {
    AccordionItem: componentToClassMap.AccordionItem
  },
  AccordionExpandedContentBody: {
    AccordionContent: componentToClassMap.AccordionContent
  },
  ActionListItem: {
    ActionList: componentToClassMap.ActionList,
    ActionListGroup: componentToClassMap.ActionListGroup
  }
  //   AccordionExpandedContentBody: [".pf-c-accordion__expanded-content"],
  //   AccordionToggle: [".pf-c-accordion__item"],
  //   PageHeader: [".pf-c-page"],
  //   PageHeaderSnippet: [".pf-c-page"],
  //   PageNav: [".pf-c-page"],
  //   PageBreadcrumbs: [".pf-c-page"],
  //   PageGroupedContent: [".pf-c-page"],
  //   PageSection: [".pf-c-page"],
  //   // Gallery: [".pf-c-page__main-section"],
  //   GalleryItem: [".pf-l-gallery"],
  //   CardBody: [".pf-c-card"],
};
