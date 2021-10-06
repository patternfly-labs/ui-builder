import * as React from "react";
import GripVerticalIcon from "@patternfly/react-icons/dist/js/icons/grip-vertical-icon";
import ExternalLinkAltIcon from "@patternfly/react-icons/dist/js/icons/external-link-alt-icon";
import { css } from "@patternfly/react-styles";
import * as coreComponents from "@patternfly/react-core/dist/esm/components";
import * as coreLayouts from "@patternfly/react-core/dist/esm/layouts";
import { componentSnippets } from "./snippets/snippets";

const {
  Tabs,
  Tab,
  TabTitleText,
  ExpandableSectionToggle,
  DataList,
  DataListItem,
  DataListCell,
  DataListItemRow,
  DataListCheck,
  DataListControl,
  DataListDragButton,
  DataListItemCells,
  DragDrop,
  Draggable,
  Droppable,
  SearchInput,
} = coreComponents;

const startsWithCapital = (word: string) =>
  word.charAt(0) === word.charAt(0).toUpperCase();
const filteredOut = ["AboutModal"];
const filterFnc = ([key, value]) => {
  // filter out anything that isn't a component
  return (
    startsWithCapital(key) &&
    typeof value === "function" &&
    filteredOut.indexOf(key) === -1
  );
};

const mappedCoreComponents = Object.fromEntries(
  Object.entries(coreComponents)
    .filter(filterFnc)
    .map(([key, value]) => [
      key,
      {
        jsx: `<${key}></${key}>`,
      },
    ])
);
const mappedCoreLayouts = Object.fromEntries(
  Object.entries(coreLayouts)
    .filter(filterFnc)
    .map(([key, value]) => [
      key,
      {
        jsx: `<${key}></${key}>`,
      },
    ])
);

const componentOverrides = {
  AccordionItem: `<AccordionItem><div className="pf-c-accordion__item"></div></AccordionItem>`,
  AccordionToggle: "<AccordionToggle isExpanded>Toggle</AccordionToggle>",
  AccordionContent: "<AccordionContent>Content</AccordionContent>",
  Badge: {
    jsx: "<Badge>5</Badge>",
  },
  Button: {
    jsx: "<Button>Button</Button>",
  },
  Card: { jsx: "<Card></Card>" },
  CardBody: {
    parent: "Card",
    jsx: "<CardBody>Card body</CardBody>",
  },
  DatePicker: { jsx: "<DatePicker></DatePicker>" },
  Page: { jsx: "<Page></Page>" },
  PageHeader: {
    component: "Page",
    prop: "header",
    jsx: "<PageHeader></PageHeader>",
  },
  PageSection: { jsx: "<PageSection></PageSection>" },
};

const layoutOverrides = {
  Gallery: "<Gallery hasGutter={true}></Gallery>",
  GalleryItem: `<GalleryItem className="pf-l-gallery__item"></GalleryItem>`,
};

const parentChild = (components) => {
  for (const [key, value] of Object.entries(components)) {
    let shadowedValue = value;
    if (typeof value === "string") {
      shadowedValue = {
        jsx: value,
      };
      components[key] = shadowedValue;
    }
    let parent = null;
    const splitCamel = key
      .replace(/([A-Z])/g, " $1")
      .split(" ")
      .filter((s: string) => s);
    if (splitCamel.length > 1) {
      for (var i = 1; i < splitCamel.length; i++) {
        const possibleParent = splitCamel.slice(0, -1 * i).join("");
        if (components[possibleParent]) {
          (shadowedValue as any).parent = possibleParent;
          parent = components[possibleParent];
          if (Array.isArray(parent.children)) {
            parent.children.push({
              [key]: shadowedValue,
            });
          } else {
            parent.children = [
              {
                [key]: shadowedValue,
              },
            ];
          }
        }
      }
    }
  }
  return Object.fromEntries(
    Object.entries(components).filter(([key, value]) => !(value as any).parent)
  );
};

export const components = {
  ...mappedCoreComponents,
  ...componentOverrides,
};

const parentChildComponents = parentChild({
  ...components,
});

export const layouts = {
  ...mappedCoreLayouts,
  ...layoutOverrides,
};

const parentChildLayouts = parentChild({
  ...layouts,
});

export const allParentChildItems = {
  ...parentChildComponents,
  ...parentChildLayouts,
};

export const allItems = {
  ...components,
  ...layouts,
  ...componentSnippets,
};

// restrict allowed drag targets
export const allowableDropMap = {
  AccordionItem: [".pf-c-accordion"],
  AccordionContent: [".pf-c-accordion__item"],
  AccordionExpandedContentBody: [".pf-c-accordion__expanded-content"],
  AccordionToggle: [".pf-c-accordion__item"],
  PageHeader: [".pf-c-page"],
  PageHeaderSnippet: [".pf-c-page"],
  PageNav: [".pf-c-page"],
  PageBreadcrumbs: [".pf-c-page"],
  PageGroupedContent: [".pf-c-page"],
  PageSection: [".pf-c-page"],
  // Gallery: [".pf-c-page__main-section"],
  GalleryItem: [".pf-l-gallery"],
  CardBody: [".pf-c-card"],
};

// Accordion
//   - AccordionItem
//      - AccordionToggle
//      - AccordionContent
//        - AccordionExpandedContentBody

// [component, value], code
const ComponentItem = ({ component, code, showExpand = true }) => {
  const showAll = true;
  // const jsxString = typeof value === "string" ? value : value.jsx;
  const [isHidden, setHidden] = React.useState(showAll ? false : true);
  const [expanded, setExpanded] = React.useState(null);
  React.useEffect(() => {
    if (!showAll) {
      let shouldBeHidden = true;
      const classTargets = allowableDropMap[component];
      if (classTargets) {
        for (var i = 0; i < classTargets.length; i++) {
          if (
            document.querySelectorAll(`.uib-preview .${classTargets[i]}`).length
          ) {
            shouldBeHidden = false;
            break;
          }
        }
        isHidden !== shouldBeHidden && setHidden(shouldBeHidden);
      } else {
        shouldBeHidden = false;
      }
    }
  }, [code]);
  const spanId = `component-list-${component}`;

  const ListItemChild = ({ component }) => {
    return (
      <li
        key={component}
        className={css("pf-c-data-list__item__child", isHidden && "pf-m-hide")}
        aria-labelledby={spanId}
        draggable
        onDragStart={(ev) => {
          ev.stopPropagation();
          console.log(`dragStart: ${component}`);
          const classTargets = allowableDropMap[component];
          if (classTargets) {
            classTargets.forEach((className) => {
              [
                ...document.querySelectorAll(`.uib-preview ${className}`),
              ].forEach((el) => {
                el.classList.add("pf-m-droppable", "pf-m-droppable-bg");
              });
            });
          } else {
            // open up everything
            [...document.querySelectorAll(`.uib-preview *`)].forEach((el) => {
              el.classList.add("pf-m-droppable");
            });
          }
          ev.dataTransfer.setData(
            "text/plain",
            JSON.stringify({
              component,
            })
          );
          ev.dataTransfer.dropEffect = "copy";
          // hack so that in dragEnter we know which component originated the drag
          ev.dataTransfer.setData("component/" + component, component);
        }}
        onDragEnd={(ev) => {
          ev.stopPropagation();
          [...document.querySelectorAll(".pf-m-droppable")].forEach((el) => {
            el.classList.remove("pf-m-droppable", "pf-m-droppable-bg");
          });
        }}
      >
        <DataListItemRow>
          <DataListControl>
            <span className="list-child"></span>
            <DataListDragButton />
          </DataListControl>
          <DataListItemCells
            dataListCells={[
              <DataListCell>
                <span id={spanId}>{component}</span>
              </DataListCell>,
            ]}
          />
        </DataListItemRow>
      </li>
    );
  };

  const componentObj: any = allParentChildItems[component];
  const onToggle = (shouldExpand, component) => {
    if (!shouldExpand) {
      // collapse
      setExpanded(null);
    } else {
      setExpanded(component);
    }
  };
  return (
    <DataListItem
      key={component}
      isExpanded={expanded === component}
      className={css(isHidden && "pf-m-hide")}
      aria-labelledby={spanId}
      draggable
      onDragStart={(ev) => {
        console.log(`dragStart: ${component}`);
        const classTargets = allowableDropMap[component];
        if (classTargets) {
          classTargets.forEach((className) => {
            [...document.querySelectorAll(`.uib-preview ${className}`)].forEach(
              (el) => {
                el.classList.add("pf-m-droppable", "pf-m-droppable-bg");
              }
            );
          });
        } else {
          // open up everything
          [...document.querySelectorAll(`.uib-preview *`)].forEach((el) => {
            el.classList.add("pf-m-droppable");
          });
        }
        ev.dataTransfer.setData(
          "text/plain",
          JSON.stringify({
            component,
          })
        );
        ev.dataTransfer.dropEffect = "copy";
        // hack so that in dragEnter we know which component originated the drag
        ev.dataTransfer.setData("component/" + component, component);
      }}
      onDragEnd={(ev) => {
        [...document.querySelectorAll(".pf-m-droppable")].forEach((el) => {
          el.classList.remove("pf-m-droppable", "pf-m-droppable-bg");
        });
      }}
    >
      <DataListItemRow>
        <DataListControl>
          <DataListDragButton />
        </DataListControl>
        <DataListItemCells
          dataListCells={[
            <DataListCell>
              <span id={spanId}>{component}</span>
              {showExpand && componentObj && componentObj.children && (
                <ExpandableSectionToggle
                  isExpanded={expanded === component}
                  onToggle={(isExpanded) => onToggle(isExpanded, component)}
                />
              )}
            </DataListCell>,
          ]}
        />
      </DataListItemRow>
      {expanded && (
        <section className="pf-c-data-list__expandable-content">
          <div className="pf-c-data-list__expandable-content-body">
            {componentObj &&
              componentObj.children &&
              componentObj.children.map((child) => {
                return <ListItemChild component={Object.keys(child)[0]} />;
              })}
          </div>
        </section>
      )}
    </DataListItem>
  );
};

const ComponentSearch = ({ placeholder, onChange }) => {
  const [value, setValue] = React.useState("");
  return (
    <SearchInput
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onClear={() => onChange("")}
    />
  );
};

export const ComponentList = ({ code }) => {
  const allComponentsList = Object.entries(parentChildComponents)
    .sort()
    .map((c) => <ComponentItem component={c[0]} code={code} />);
  const allLayoutsList = Object.entries(parentChildLayouts)
    .sort()
    .map((c) => <ComponentItem component={c[0]} code={code} />);
  const [componentsList, setComponentsList] = React.useState(allComponentsList);
  const [layoutsList, setLayoutsList] = React.useState(allLayoutsList);
  const onChangeComponents = (val: string) => {
    if (!val) {
      setComponentsList(allComponentsList);
    } else {
      setComponentsList(
        Object.entries(components)
          .filter(
            ([key, value]) => key.toLowerCase().indexOf(val.toLowerCase()) > -1
          )
          .sort()
          .map((c) => (
            <ComponentItem component={c[0]} code={code} showExpand={false} />
          ))
      );
    }
  };
  const onChangeLayouts = (val: string) => {
    if (!val) {
      setLayoutsList(allLayoutsList);
    } else {
      setLayoutsList(
        Object.entries(layouts)
          .filter(
            ([key, value]) => key.toLowerCase().indexOf(val.toLowerCase()) > -1
          )
          .sort()
          .map((c) => (
            <ComponentItem component={c[0]} code={code} showExpand={false} />
          ))
      );
    }
  };
  return (
    <Tabs defaultActiveKey={0}>
      <Tab eventKey={0} title={<TabTitleText>Components</TabTitleText>}>
        <ComponentSearch
          placeholder="Find component"
          onChange={onChangeComponents}
        />
        <ul
          className="pf-c-data-list pf-m-compact"
          role="list"
          aria-label="Components"
        >
          {/* {componentsList.map((c) => ComponentItem(c, code))} */}
          {componentsList}
        </ul>
      </Tab>
      <Tab eventKey={1} title={<TabTitleText>Layouts</TabTitleText>}>
        <ComponentSearch placeholder="Find layout" onChange={onChangeLayouts} />
        <ul
          className="pf-c-data-list pf-m-compact"
          role="list"
          aria-label="Layouts"
        >
          {layoutsList}
        </ul>
      </Tab>
      <Tab eventKey={2} title={<TabTitleText>Snippets</TabTitleText>}>
        <ul
          className="pf-c-data-list pf-m-compact"
          role="list"
          aria-label="Snippets"
        >
          {Object.entries(componentSnippets)
            .sort()
            .map((c) => (
              <ComponentItem component={c[0]} code={code} />
            ))}
        </ul>
      </Tab>
    </Tabs>
  );
};
