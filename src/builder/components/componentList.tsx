import * as React from "react";
import GripVerticalIcon from "@patternfly/react-icons/dist/js/icons/grip-vertical-icon";
import ExternalLinkAltIcon from "@patternfly/react-icons/dist/js/icons/external-link-alt-icon";
import { css } from "@patternfly/react-styles";
import {
  Button,
  Accordion,
  AccordionItem,
  AccordionToggle,
  AccordionContent,
} from "@patternfly/react-core";
// @ts-ignore
import PageHeaderSnippetRaw from '!!raw-loader!./snippets/PageHeaderSnippet';

export const components = {
  Page: "<Page></Page>",
  PageHeader: {
    component: "Page",
    prop: "header",
    jsx: "<PageHeader></PageHeader>",
  },
  PageSection: "<PageSection></PageSection>",
  Gallery: "<Gallery hasGutter={true}></Gallery>",
  GalleryItem: {
    parent: "Gallery",
    jsx: `<GalleryItem className="pf-l-gallery__item"></GalleryItem>`,
  },
  Card: "<Card></Card>",
  CardBody: {
    parent: "Card",
    jsx: "<CardBody>Card body</CardBody>",
  },
  Button: "<Button>Button</Button>",
  DatePicker: "<DatePicker></DatePicker>",
  Badge: "<Badge>5</Badge>",
};

export const componentSnippets = {
  PageHeaderSnippet: {
    component: "Page",
    prop: "header",
    jsx: "<PageHeaderSnippet />",
    code: PageHeaderSnippetRaw
  },
  PageNav: {
    component: "Page",
    prop: "tertiaryNav",
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
  },
  PageBreadcrumbs: {
    component: "Page",
    prop: "breadcrumb",
    jsx: `<Breadcrumb>
    <BreadcrumbItem>Section home</BreadcrumbItem>
    <BreadcrumbItem to="#">Section title</BreadcrumbItem>
    <BreadcrumbItem to="#">Section title</BreadcrumbItem>
    <BreadcrumbItem to="#" isActive={true}>
      Section landing
    </BreadcrumbItem>
  </Breadcrumb>`,
  },
  PageGroupedContent: {
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

// allowed drag targets
export const allowableDropMap = {
  // Page: ["live-region"],
  PageHeader: ["pf-c-page"],
  PageHeaderSnippet: ["pf-c-page"],
  PageNav: ["pf-c-page"],
  PageBreadcrumbs: ["pf-c-page"],
  PageGroupedContent: ["pf-c-page"],
  PageSection: ["pf-c-page"],
  Gallery: ["pf-c-page__main-section"],
  GalleryItem: ["pf-l-gallery"],
  Card: ["pf-c-page__main-section", "pf-l-gallery", "pf-l-gallery__item"],
  CardBody: ["pf-c-card"],
  Button: [
    "pf-c-page__main-section",
    "pf-l-gallery",
    "pf-l-gallery__item",
    "pf-c-card",
    "pf-c-card__body",
  ],
  DatePicker: [
    "pf-c-page__main-section",
    "pf-l-gallery",
    "pf-l-gallery__item",
    "pf-c-card",
    "pf-c-card__body",
  ],
  Badge: [
    "pf-c-page__main-section",
    "pf-l-gallery",
    "pf-l-gallery__item",
    "pf-c-card",
    "pf-c-card__body",
  ],
};

function ComponentItem([component, value], code) {
  const parent = typeof value === "string" ? null : value.parent;
  // const jsxString = typeof value === "string" ? value : value.jsx;
  const [isHidden, setHidden] = React.useState(true);
  React.useEffect(() => {
    const classTargets = allowableDropMap[component];
    if (classTargets) {
      let shouldBeHidden = true;
      for (var i = 0; i < classTargets.length; i++) {
        if (
          document.querySelectorAll(`.uib-preview .${classTargets[i]}`).length
        ) {
          shouldBeHidden = false;
          break;
        }
      }
      isHidden !== shouldBeHidden && setHidden(shouldBeHidden);
    }
  }, [code]);
  const spanId = `component-list-${component}`;

  return (
    <li
      key={component}
      className={css(
        "pf-c-data-list__item",
        isHidden && "pf-m-hide",
        parent && "pf-m-child"
      )}
      aria-labelledby={spanId}
      draggable
      onDragStart={(ev) => {
        console.log(`dragStart: ${component}`);
        const classTargets = allowableDropMap[component];
        if (classTargets) {
          classTargets.forEach((className) => {
            [
              ...document.querySelectorAll(`.uib-preview .${className}`),
            ].forEach((el) => {
              el.classList.add("pf-m-droppable");
            });
          });
        }
        ev.dataTransfer.setData(
          "text/plain",
          JSON.stringify({
            component
          })
        );
        ev.dataTransfer.dropEffect = "copy";
        // hack so that in dragEnter we know which component originated the drag
        ev.dataTransfer.setData("component/" + component, component);
      }}
      onDragEnd={(ev) => {
        [...document.querySelectorAll(".pf-m-droppable")].forEach((el) => {
          el.classList.remove("pf-m-droppable");
        });
      }}
    >
      <div className="pf-c-data-list__item-row">
        <div className="pf-c-data-list__item-control">
          <button className="pf-c-data-list__item-draggable-button">
            <span className="pf-c-data-list__item-draggable-icon">
              <GripVerticalIcon />
            </span>
          </button>
        </div>
        <div className="pf-c-data-list__item-content">
          <div className="pf-c-data-list__cell">
            <span id={spanId}>{component}</span>
            {/* <Button
              variant="plain"
              aria-label="Action"
              style={{ float: "right", padding: 0 }}
              onClick={() => {
                // TODO: Need a lookup map as it won't work this generically
                let toLink = component.toLowerCase();
                if (component.toLowerCase().startsWith("page")) {
                  toLink = "page";
                }
                window.open(
                  `https://www.patternfly.org/v4/components/${toLink}`
                );
              }}
            >
              <ExternalLinkAltIcon />
            </Button> */}
          </div>
        </div>
      </div>
    </li>
  );
}

export const ComponentList = ({ code }) => {
  return (
    <Accordion>
      <AccordionItem>
        <AccordionToggle id="components" isExpanded>
          Core components
        </AccordionToggle>
        <AccordionContent>
          <ul
            className="pf-c-data-list pf-m-compact"
            role="list"
            aria-label="Basic data list example"
          >
            {Object.entries(components).map((c) => ComponentItem(c, code))}
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem>
        <AccordionToggle id="demos" isExpanded>
          Code snippets
        </AccordionToggle>
        <AccordionContent>
          <ul
            className="pf-c-data-list pf-m-compact"
            role="list"
            aria-label="Basic data list example"
          >
            {Object.entries(componentSnippets).map((c) => ComponentItem(c, code))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
