import Accordion from "@patternfly/react-styles/css/components/Accordion/accordion";
import ActionList from "@patternfly/react-styles/css/components/ActionList/action-list";
import Alert from "@patternfly/react-styles/css/components/Alert/alert";
import AlertGroup from "@patternfly/react-styles/css/components/AlertGroup/alert-group";
import ApplicationLauncher from "@patternfly/react-styles/css/components/AppLauncher/app-launcher";
import Avatar from "@patternfly/react-styles/css/components/Avatar/avatar";
import Backdrop from "@patternfly/react-styles/css/components/Backdrop/backdrop";
import BackgroundImage from "@patternfly/react-styles/css/components/BackgroundImage/background-image";
import Badge from "@patternfly/react-styles/css/components/Badge/badge";
import Banner from "@patternfly/react-styles/css/components/Banner/banner";
import Brand from "@patternfly/react-styles/css/components/Brand/brand";
import Breadcrumb from "@patternfly/react-styles/css/components/Breadcrumb/breadcrumb";
import CalendarMonth from "@patternfly/react-styles/css/components/CalendarMonth/calendar-month";
import Card from "@patternfly/react-styles/css/components/Card/card";
import Checkbox from "@patternfly/react-styles/css/components/Check/check";
import Chip from "@patternfly/react-styles/css/components/Chip/chip";
import ChipGroup from "@patternfly/react-styles/css/components/ChipGroup/chip-group";
import ClipboardCopy from "@patternfly/react-styles/css/components/ClipboardCopy/clipboard-copy";
import CodeBlock from "@patternfly/react-styles/css/components/CodeBlock/code-block";
import ContextSelector from "@patternfly/react-styles/css/components/ContextSelector/context-selector";
import DataList from "@patternfly/react-styles/css/components/DataList/data-list";
import DatePicker from "@patternfly/react-styles/css/components/DatePicker/date-picker";
import DescriptionList from "@patternfly/react-styles/css/components/DescriptionList/description-list";
import Divider from "@patternfly/react-styles/css/components/Divider/divider";
import Drawer from "@patternfly/react-styles/css/components/Drawer/drawer";
import Dropdown from "@patternfly/react-styles/css/components/Dropdown/dropdown";
import DualListSelector from "@patternfly/react-styles/css/components/DualListSelector/dual-list-selector";
import EmptyState from "@patternfly/react-styles/css/components/EmptyState/empty-state";
import ExpandableSection from "@patternfly/react-styles/css/components/ExpandableSection/expandable-section";
import FileUpload from "@patternfly/react-styles/css/components/FileUpload/file-upload";
import Form from "@patternfly/react-styles/css/components/Form/form";
import FormControl from "@patternfly/react-styles/css/components/FormControl/form-control";
import HelperText from "@patternfly/react-styles/css/components/HelperText/helper-text";
import Hint from "@patternfly/react-styles/css/components/Hint/hint";
import InputGroup from "@patternfly/react-styles/css/components/InputGroup/input-group";
import JumpLinks from "@patternfly/react-styles/css/components/JumpLinks/jump-links";
import Label from "@patternfly/react-styles/css/components/Label/label";
import LabelGroup from "@patternfly/react-styles/css/components/LabelGroup/label-group";
import List from "@patternfly/react-styles/css/components/List/list";
import Login from "@patternfly/react-styles/css/components/Login/login";
import Masthead from "@patternfly/react-styles/css/components/Masthead/masthead";
import Menu from "@patternfly/react-styles/css/components/Menu/menu";
import MenuToggle from "@patternfly/react-styles/css/components/MenuToggle/menu-toggle";
import ModalBox from "@patternfly/react-styles/css/components/ModalBox/modal-box";
import Nav from "@patternfly/react-styles/css/components/Nav/nav";
import NotificationBadge from "@patternfly/react-styles/css/components/NotificationBadge/notification-badge";
import NotificationDrawer from "@patternfly/react-styles/css/components/NotificationDrawer/notification-drawer";
import OptionsMenu from "@patternfly/react-styles/css/components/OptionsMenu/options-menu";
import OverflowMenu from "@patternfly/react-styles/css/components/OverflowMenu/overflow-menu";
import Page from "@patternfly/react-styles/css/components/Page/page";
import Pagination from "@patternfly/react-styles/css/components/Pagination/pagination";
import Popover from "@patternfly/react-styles/css/components/Popover/popover";
import Progress from "@patternfly/react-styles/css/components/Progress/progress";
import Radio from "@patternfly/react-styles/css/components/Radio/radio";
import Select from "@patternfly/react-styles/css/components/Select/select";
import Sidebar from "@patternfly/react-styles/css/components/Sidebar/sidebar";
import SimpleList from "@patternfly/react-styles/css/components/SimpleList/simple-list";
import Skeleton from "@patternfly/react-styles/css/components/Skeleton/skeleton";
import SkipToContent from "@patternfly/react-styles/css/components/SkipToContent/skip-to-content";
import Slider from "@patternfly/react-styles/css/components/Slider/slider";
import Spinner from "@patternfly/react-styles/css/components/Spinner/spinner";
import Switch from "@patternfly/react-styles/css/components/Switch/switch";
import Tabs from "@patternfly/react-styles/css/components/Tabs/tabs";
import Content from "@patternfly/react-styles/css/components/Content/content";
import Tile from "@patternfly/react-styles/css/components/Tile/tile";
import Title from "@patternfly/react-styles/css/components/Title/title";
import ToggleGroup from "@patternfly/react-styles/css/components/ToggleGroup/toggle-group";
import Toolbar from "@patternfly/react-styles/css/components/Toolbar/toolbar";
import Tooltip from "@patternfly/react-styles/css/components/Tooltip/tooltip";
import NumberInput from "@patternfly/react-styles/css/components/NumberInput/number-input";
import TreeView from "@patternfly/react-styles/css/components/TreeView/tree-view";
import Wizard from "@patternfly/react-styles/css/components/Wizard/wizard";
import Button from "@patternfly/react-styles/css/components/Button/button";
import BackToTop from "@patternfly/react-styles/css/components/BackToTop/back-to-top";
import SearchInput from "@patternfly/react-styles/css/components/SearchInput/search-input";
import AboutModalBox from "@patternfly/react-styles/css/components/AboutModalBox/about-modal-box";

export const componentToClassMap = {
  AboutModal: AboutModalBox.aboutModalBox,
  Accordion: Accordion.accordion,
  AccordionContent: Accordion.accordionExpandedContent,
  AccordionExpandedContentBody: Accordion.accordionExpandedContentBody,
  AccordionItem: "pf-c-accordion__item",
  AccordionToggle: Accordion.accordionToggle,
  ActionList: ActionList.actionList,
  ActionListGroup: ActionList.actionListGroup,
  ActionListItem: "pf-c-action-list__item",
  Alert: Alert.alert,
  AlertActionCloseButton: "pf-c-alert__action-close",
  AlertActionLink: "pf-c-alert__action-link",
  AlertGroup: AlertGroup.alertGroup,
  ApplicationLauncher: ApplicationLauncher.appLauncher,
  ApplicationLauncherContent: "", // is a wrapper with no outer class name
  ApplicationLauncherGroup: ApplicationLauncher.appLauncherGroup,
  ApplicationLauncherIcon: ApplicationLauncher.appLauncherMenuItemIcon,
  ApplicationLauncherItem: ApplicationLauncher.appLauncherMenuItem,
  ApplicationLauncherSeparator: "pf-c-app-launcher__separator",
  ApplicationLauncherText: "pf-c-app-launcher__menu-item-text",
  Avatar: Avatar.avatar,
  Backdrop: Backdrop.backdrop,
  BackgroundImage: BackgroundImage.backgroundImage,
  Badge: Badge.badge,
  Banner: Banner.banner,
  Brand: Brand.brand,
  Breadcrumb: Breadcrumb.breadcrumb,
  BreadcrumbHeading: Breadcrumb.breadcrumbHeading,
  BreadcrumbItem: Breadcrumb.breadcrumbItem,
  CalendarMonth: CalendarMonth.calendarMonth,
  Card: Card.card,
  CardActions: Card.cardActions,
  CardBody: Card.cardBody,
  CardExpandableContent: Card.cardExpandableContent,
  CardFooter: Card.cardFooter,
  CardHeader: Card.cardHeader,
  CardHeaderMain: "pf-c-card__header-main",
  CardTitle: Card.cardTitle,
  Checkbox: Checkbox.check,
  Chip: Chip.chip,
  ChipGroup: ChipGroup.chipGroup,
  ChipGroupList: `${ChipGroup.chipGroup}__list`,
  ClipboardCopy: ClipboardCopy.clipboardCopy,
  ClipboardCopyAction: ClipboardCopy.clipboardCopyActions,
  ClipboardCopyButton: "pf-c-clipboard-copy__button",
  CodeBlock: CodeBlock.codeBlock,
  CodeBlockAction: CodeBlock.codeBlockActions,
  CodeBlockCode: CodeBlock.codeBlockCode,
  ContextSelector: ContextSelector.contextSelector,
  ContextSelectorFooter: ContextSelector.contextSelectorMenuFooter,
  ContextSelectorItem: ContextSelector.contextSelectorMenuListItem,
  DataList: DataList.dataList,
  DataListAction: DataList.dataListAction,
  DataListCell: DataList.dataListCell,
  DataListCheck: DataList.dataListCheck,
  DataListContent: DataList.dataListExpandableContent,
  DataListControl: DataList.dataListItemControl,
  DataListDragButton: DataList.dataListItemDraggableButton,
  DataListItem: DataList.dataListItem,
  DataListItemCells: DataList.dataListItemContent,
  DataListItemRow: DataList.dataListItemRow,
  DataListText: DataList.dataListText,
  DataListToggle: DataList.dataListToggle,
  DatePicker: DatePicker.datePicker,
  DescriptionList: DescriptionList.descriptionList,
  DescriptionListDescription: DescriptionList.descriptionListDescription,
  DescriptionListGroup: DescriptionList.descriptionListGroup,
  DescriptionListTerm: DescriptionList.descriptionListTerm,
  DescriptionListTermHelpText: DescriptionList.descriptionListTerm,
  DescriptionListTermHelpTextButton: DescriptionList.descriptionListText,
  Divider: Divider.divider,
  Drawer: Drawer.drawer,
  DrawerActions: Drawer.drawerActions,
  DrawerCloseButton: Drawer.drawerClose,
  DrawerContent: Drawer.drawerContent,
  DrawerContentBody: Drawer.drawerBody,
  DrawerHead: Drawer.drawerHead,
  DrawerPanelBody: Drawer.drawerBody,
  DrawerPanelContent: Drawer.drawerPanel,
  DrawerSection: Drawer.drawerSection,
  BadgeToggle: "pf-c-dropdown__badge-toggle",
  Dropdown: Dropdown.dropdown,
  DropdownGroup: Dropdown.dropdownGroup,
  DropdownItem: Dropdown.dropdownMenuItem,
  DropdownMenu: Dropdown.dropdownMenu,
  DropdownSeparator: "pf-c-dropdown__separator",
  DropdownToggle: Dropdown.dropdownToggle,
  DropdownToggleAction: Dropdown.dropdownToggleButton,
  DropdownToggleCheckbox: Dropdown.dropdownToggleCheck,
  // DropdownWithContext: "",
  KebabToggle: "pf-c-dropdown__kebab",
  DualListSelector: DualListSelector.dualListSelector,
  EmptyState: EmptyState.emptyState,
  EmptyStateBody: EmptyState.emptyStateBody,
  EmptyStateIcon: EmptyState.emptyStateIcon,
  EmptyStatePrimary: EmptyState.emptyStatePrimary,
  EmptyStateSecondaryActions: EmptyState.emptyStateSecondary,
  ExpandableSection: ExpandableSection.expandableSection,
  ExpandableSectionToggle: ExpandableSection.expandableSectionToggle,
  FileUpload: FileUpload.fileUpload,
  FileUploadField: FileUpload.fileUpload,
  ActionGroup: Form.formGroup,
  Form: Form.form,
  FormAlert: "pf-c-form__alert",
  FormFieldGroup: Form.formFieldGroup,
  FormFieldGroupExpandable: "pf-c-form__field-group-expandable",
  FormFieldGroupHeader: Form.formFieldGroupHeader,
  FormGroup: Form.formGroup,
  FormHelperText: Form.formHelperText,
  FormSection: Form.formSection,
  FormSelect: FormControl.formControl,
  FormSelectOption: "pf-c-form-control__option",
  FormSelectOptionGroup: "pf-c-form-control__option-group",
  HelperText: HelperText.helperText,
  HelperTextItem: HelperText.helperTextItem,
  Hint: Hint.hint,
  HintBody: Hint.hintBody,
  HintFooter: Hint.hintFooter,
  HintTitle: Hint.hintTitle,
  InputGroup: InputGroup.inputGroup,
  InputGroupText: InputGroup.inputGroupText,
  JumpLinks: JumpLinks.jumpLinks,
  JumpLinksItem: JumpLinks.jumpLinksItem,
  JumpLinksList: JumpLinks.jumpLinksList,
  Label: Label.label,
  LabelGroup: LabelGroup.labelGroup,
  List: List.list,
  ListItem: List.listItem,
  Login: Login.login,
  LoginFooter: Login.loginFooter,
  LoginFooterItem: "pf-c-login__footer-item",
  LoginForm: "pf-c-login__form",
  LoginHeader: Login.loginHeader,
  LoginMainBody: Login.loginMainBody,
  LoginMainFooter: Login.loginMainFooter,
  LoginMainFooterBandItem: `${Login.loginMainFooterBand}-item`,
  LoginMainFooterLinksItem: Login.loginMainFooterLinksItem,
  LoginMainHeader: Login.loginMainHeader,
  LoginPage: "pf-c-login__page",
  Masthead: Masthead.masthead,
  MastheadBrand: Masthead.mastheadBrand,
  MastheadContent: Masthead.mastheadContent,
  MastheadMain: Masthead.mastheadMain,
  MastheadToggle: Masthead.mastheadToggle,
  DrilldownMenu: Menu.menu,
  MenuBreadcrumb: Menu.menuBreadcrumb,
  MenuFooter: Menu.menuFooter,
  MenuItem: Menu.menuItem,
  MenuList: Menu.menuList,
  Modal: ModalBox.modalBox,
  ModalBox: ModalBox.modalBox,
  ModalBoxBody: ModalBox.modalBoxBody,
  ModalBoxCloseButton: "pf-c-modal-box__close",
  ModalBoxFooter: ModalBox.modalBoxFooter,
  ModalBoxHeader: ModalBox.modalBoxHeader,
  ModalContent: ModalBox.modalBox,
  Nav: Nav.nav,
  NavExpandable: Nav.navItem, // + .pf-m-expandable?
  NavGroup: Nav.navSection,
  NavItem: Nav.navItem,
  NavItemSeparator: "pf-c-nav__item-separator",
  NavList: Nav.navList,
  NotificationBadge: NotificationBadge.notificationBadge,
  NotificationDrawer: NotificationDrawer.notificationDrawer,
  NotificationDrawerBody: NotificationDrawer.notificationDrawerBody,
  NotificationDrawerGroup: NotificationDrawer.notificationDrawerGroup,
  NotificationDrawerGroupList: NotificationDrawer.notificationDrawerGroupList,
  NotificationDrawerHeader: NotificationDrawer.notificationDrawerHeader,
  NotificationDrawerList: "pf-c-notification-drawer__list",
  NotificationDrawerListItem: NotificationDrawer.notificationDrawerListItem,
  NotificationDrawerListItemBody:
    NotificationDrawer.notificationDrawerListItemDescription,
  NotificationDrawerListItemHeader:
    NotificationDrawer.notificationDrawerListItemHeader,
  OptionsMenu: OptionsMenu.optionsMenu,
  OptionsMenuItem: OptionsMenu.optionsMenuMenuItem,
  OptionsMenuItemGroup: OptionsMenu.optionsMenuGroup,
  OptionsMenuSeparator: "pf-c-options-menu__menu-separator",
  OptionsMenuToggle: OptionsMenu.optionsMenuToggle,
  OptionsMenuToggleWithText: OptionsMenu.optionsMenuToggleText,
  OverflowMenu: OverflowMenu.overflowMenu,
  OverflowMenuContent: OverflowMenu.overflowMenuContent,
  OverflowMenuControl: OverflowMenu.overflowMenuControl,
  OverflowMenuDropdownItem: "pf-c-overflow-menu__dropdown-item",
  OverflowMenuGroup: OverflowMenu.overflowMenuGroup,
  OverflowMenuItem: OverflowMenu.overflowMenuItem,
  Page: Page.page,
  PageBreadcrumb: Page.pageMainBreadcrumb,
  PageGroup: Page.pageMainGroup,
  PageHeader: Page.pageHeader,
  PageHeaderTools: Page.pageHeaderTools,
  PageHeaderToolsGroup: Page.pageHeaderToolsGroup,
  PageHeaderToolsItem: Page.pageHeaderToolsItem,
  PageNavigation: Page.pageMainNav,
  PageSection: "pf-c-page__section",
  PageSidebar: Page.pageSidebar,
  PageToggleButton: "pf-c-page__toggle",
  Pagination: Pagination.pagination,
  ToggleTemplate: "", // cannot pass className
  Popover: Popover.popover,
  Progress: Progress.progress,
  ProgressBar: Progress.progressBar,
  ProgressContainer: "", // cannot pass className
  Radio: Radio.radio,
  Select: Select.select,
  SelectGroup: Select.selectMenuGroup,
  SelectOption: [Select.selectListItem, Select.selectMenuItem], // selectMenuItem || selectListItem
  Sidebar: Sidebar.sidebar,
  SidebarContent: Sidebar.sidebarContent,
  SidebarPanel: Sidebar.sidebarPanel,
  SimpleList: SimpleList.simpleList,
  SimpleListGroup: SimpleList.simpleListSection,
  SimpleListItem: "pf-c-simple-list__item",
  Skeleton: Skeleton.skeleton,
  SkipToContent: SkipToContent.skipToContent,
  Slider: Slider.slider,
  Spinner: Spinner.spinner,
  Switch: Switch.switch,
  TabTitleIcon: Tabs.tabsItemIcon,
  TabTitleText: Tabs.tabsItemText,
  Tabs: Tabs.tabs,
  Text: "pf-c-text",
  TextContent: Content.content,
  TextList: "pf-c-text__list",
  TextListItem: "pf-c-text__list-item",
  Tile: Tile.tile,
  TimeOption: Select.selectMenuWrapper,
  TimePicker: DatePicker.datePicker,
  Title: Title.title,
  ToggleGroup: ToggleGroup.toggleGroup,
  ToggleGroupItem: ToggleGroup.toggleGroupItem,
  Toolbar: Toolbar.toolbar,
  ToolbarContent: Toolbar.toolbarContent,
  ToolbarExpandIconWrapper: Toolbar.toolbarExpandAllIcon,
  ToolbarFilter: Toolbar.toolbarItem,
  ToolbarItem: Toolbar.toolbarItem,
  ToolbarToggleGroup: Toolbar.toolbarGroup,
  Tooltip: Tooltip.tooltip,
  NumberInput: NumberInput.numberInput,
  TreeView: TreeView.treeView,
  TreeViewSearch: TreeView.treeViewSearch,
  Wizard: Wizard.wizard,
  WizardBody: Wizard.wizardMainBody,
  WizardFooter: Wizard.wizardFooter,
  WizardHeader: Wizard.wizardHeader,
  WizardNav: Wizard.wizardNav,
  WizardNavItem: Wizard.wizardNavItem,
  WizardToggle: Wizard.wizardToggle,
  Button: Button.button,
  // React.forwardRef components
  BackToTop: BackToTop.backToTop,
  Menu: Menu.menu,
  MenuContent: Menu.menuContent,
  MenuGroup: Menu.menuGroup,
  MenuInput: Menu.menuSearch,
  MenuItemAction: Menu.menuItemAction,
  MenuToggle: MenuToggle.menuToggle,
  SearchInput: SearchInput.searchInput,
  Tab: Tabs.tabsItem,
  TextArea: FormControl.formControl,
  TextInput: FormControl.formControl,
};
