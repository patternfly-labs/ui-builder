import * as React from "react";
import GripVerticalIcon from "@patternfly/react-icons/dist/js/icons/grip-vertical-icon";
import ExternalLinkAltIcon from "@patternfly/react-icons/dist/js/icons/external-link-alt-icon";
import InfoCircleIcon from "@patternfly/react-icons/dist/js/icons/info-circle-icon";
import { css } from "@patternfly/react-styles";
import * as coreComponents from "@patternfly/react-core/dist/esm/components";
import * as coreLayouts from "@patternfly/react-core/dist/esm/layouts";
import { componentSnippets } from "./snippets/snippets";
import { allowableDropMap, componentRules, layoutRules } from "./rules";
import { AppContext } from "../app";
import { componentToClassMap } from "./componentToClassMap";

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
  DataListToggle,
  DragDrop,
  Draggable,
  Droppable,
  SearchInput,
  Tooltip,
  Title,
} = coreComponents;

const isParent = [
  "AlertGroup",
  "ChipGroup",
  "FormSelect",
  "LabelGroup",
  "MenuToggle",
  "TextArea",
  "TextInput",
];
const parentMap = {
  FormSelectOptionGroup: "FormSelect",
  KebabToggle: "Dropdown",
  Tab: "Tabs",
  TabContent: "Tabs",
  TabTitleIcon: "Tabs",
  TabTitleText: "Tabs",
  TimeOption: "TimePicker",
  ToggleTemplate: "Pagination",
  ActionGroup: "Form",
  BadgeToggle: "Dropdown",
  CardHeaderMain: "Card",
  Chip: "ChipGroup"
};

const startsWithCapital = (word: string) =>
  word.charAt(0) === word.charAt(0).toUpperCase();
const filteredOut = [
  "DropdownWithContext",
  "TextAreaBase",
  "MenuToggleBase",
  "DragDrop",
  "Draggable",
  "Droppable",
  "TextInputBase",
  "ApplicationLauncherIcon",
  "ApplicationLauncherText"
];
const filterFnc = ([key, value]) => {
  // filter out anything that isn't a component
  return (
    startsWithCapital(key) &&
    (typeof value === "function" ||
      (typeof value === "object" && value.render)) &&
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

const parentChild = (components) => {
  // pre-process
  for (const [key, value] of Object.entries(components)) {
    if (typeof value === "string") {
      components[key] = {
        jsx: value,
      };
    }
  };
  for (const [key, value] of Object.entries(components)) {
    let possibleParent = parentMap[key];
    if (possibleParent && components[possibleParent]) {
      (value as any).parent = possibleParent;
      let parent = components[possibleParent];
      if (Array.isArray(parent.children)) {
        parent.children.push({
          [key]: value,
        });
      } else {
        parent.children = [
          {
            [key]: value,
          },
        ];
      }
    } else {
      const splitCamel =
        isParent.indexOf(key) > -1
          ? []
          : key
              .replace(/([A-Z])/g, " $1")
              .split(" ")
              .filter((s: string) => s);
      if (splitCamel.length > 1) {
        for (var i = 1; i < splitCamel.length; i++) {
          const possibleParent = splitCamel.slice(0, -1 * i).join("");
          if (components[possibleParent]) {
            (value as any).parent = possibleParent;
            let parent = components[possibleParent];
            if (Array.isArray(parent.children)) {
              parent.children.push({
                [key]: value,
              });
            } else {
              parent.children = [
                {
                  [key]: value,
                },
              ];
            }
            break;
          }
        }
      }
    }
  }
  return Object.fromEntries(Object.entries(components));
};

export const components = {
  ...mappedCoreComponents,
  ...componentRules,
};

const parentChildComponents = parentChild({
  ...components,
});

export const layouts = {
  ...mappedCoreLayouts,
  ...layoutRules,
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

const getContent = (component, value, canPlace = true) => {
  const placementRules = allowableDropMap[component];
  let body = "";
  if (placementRules) {
    body += `Should be nested within ${Object.keys(placementRules)}<br />`;
  } else if (!canPlace && value.parent) {
    body += `Should be nested within ${value.parent}<br />`;
  }
  if (value.prop) {
    body += `Will be added to ${value.component}'s prop ${value.prop}<br />`;
  } else if (value.props) {
    body += `Will add the following props to ${value.component}:<br />`;
    value.props.forEach((p) => {
      body += `${p.prop}<br />`;
    });
  }
  const bodyHtml = { __html: body };
  return (
    <div>
      {/* <Title headingLevel="h3" size="lg">
        {component}
      </Title> */}
      <div dangerouslySetInnerHTML={bodyHtml} />
    </div>
  );
};

// Accordion
//   - AccordionItem
//      - AccordionToggle
//      - AccordionContent
//        - AccordionExpandedContentBody

// [component, value], code
const ComponentItem = ({
  component,
  value,
  showExpand = true,
  canPlace = true,
}) => {
  // console.log(value);
  const [expanded, setExpanded] = React.useState(null);
  const spanId = `component-list-${component}`;
  const { componentsInUse } = React.useContext(AppContext);
  const componentObj: any = allParentChildItems[component];
  const hasChildren = componentObj && componentObj.children;
  const onToggle = (component) => {
    if (expanded) {
      setExpanded(null);
    } else {
      setExpanded(component);
    }
  };
  return (
    <DataListItem
      key={component}
      isExpanded={expanded === component}
      className={css(!canPlace && "pf-m-hide", !hasChildren && "pf-m-grab")}
      aria-labelledby={spanId}
      draggable={!hasChildren}
      onDragStart={(ev) => {
        console.log(`dragStart: ${component}`);
        let classTargets =
          allowableDropMap[component] &&
          Object.values(allowableDropMap[component]);
        if (classTargets) {
          classTargets.forEach((className) => {
            [
              ...document.querySelectorAll(`.uib-preview ${className}`),
            ].forEach((el) => {
              el.classList.add("pf-m-droppable");
              className !== '*' && el.classList.add("pf-m-droppable-bg");
            });
          });
        } else {
          const componentInfo = allParentChildItems[component];
          if (componentInfo && (componentInfo as any).parent) {
            classTargets = [
              '.' + componentToClassMap[(componentInfo as any).parent as string],
            ];
            classTargets.forEach((className) => {
              [
                ...document.querySelectorAll(`.uib-preview ${className}`),
              ].forEach((el) => {
                el.classList.add("pf-m-droppable");
                className !== '*' && el.classList.add("pf-m-droppable-bg");
              });
            });
          } else {
            // open up everything
            [...document.querySelectorAll(`.uib-preview *`)].forEach((el) => {
              el.classList.add("pf-m-droppable");
            });
          }
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
        {!hasChildren && (
          <DataListControl>
            <DataListDragButton />
          </DataListControl>
        )}
        {showExpand && hasChildren && (
          <DataListToggle
            id={`cell-parent-${component}`}
            isExpanded={expanded === component}
            onClick={() => onToggle(component)}
            className="cell-expand"
          />
        )}
        <DataListItemCells
          dataListCells={[
            <DataListCell key={`cell-parent-${component}`}>
              <div id={spanId} className="cell-text" title={component}>
                {component}
              </div>
              {value.prop && (
                <Tooltip
                  content={getContent(component, value, canPlace)}
                  isContentLeftAligned
                  position="right"
                >
                  <span className="cell-info">
                    <InfoCircleIcon />
                  </span>
                </Tooltip>
              )}
            </DataListCell>,
          ]}
        />
      </DataListItemRow>
      {expanded && (
        <section className="pf-c-data-list__expandable-content">
          <div className="pf-c-data-list__expandable-content-body">
            <ComponentItemChild
              component={component}
              value={value}
              canPlace={placeable(component, componentsInUse)}
            />
            {hasChildren &&
              componentObj.children.map((child) => {
                const childComponent = Object.keys(child)[0];
                const childValue = Object.values(child)[0];
                return (
                  <ComponentItemChild
                    key={`child-${childComponent}`}
                    component={childComponent}
                    value={childValue}
                    canPlace={
                      Boolean(allowableDropMap[childComponent] ? true : componentsInUse[component]) &&
                      placeable(childComponent, componentsInUse)
                    }
                  />
                );
              })}
          </div>
        </section>
      )}
    </DataListItem>
  );
};

const ComponentItemChild = ({
  component,
  value,
  canPlace = true,
  showExpand = true,
}) => {
  const { componentsInUse } = React.useContext(AppContext);
  // console.log(`${JSON.stringify(componentsInUse)}`);
  const spanId = `component-list-${component}`;
  return (
    <DataListItem
      key={component}
      className={css(
        "pf-c-data-list__item__child",
        !canPlace && "pf-m-hide",
        "pf-m-grab"
      )}
      aria-labelledby={spanId}
      draggable
      onDragStart={(ev) => {
        ev.stopPropagation();
        console.log(`dragStart: ${component}`);
        let classTargets =
          allowableDropMap[component] &&
          Object.values(allowableDropMap[component]);
        if (classTargets) {
          classTargets.forEach((className) => {
            [
              ...document.querySelectorAll(`.uib-preview ${className}`),
            ].forEach((el) => {
              el.classList.add("pf-m-droppable");
              className !== '*' && el.classList.add("pf-m-droppable-bg");
            });
          });
        } else {
          const componentInfo = allParentChildItems[component];
          if ((componentInfo as any).parent) {
            classTargets = [
              '.' + componentToClassMap[(componentInfo as any).parent as string],
            ];
            classTargets.forEach((className) => {
              [
                ...document.querySelectorAll(`.uib-preview ${className}`),
              ].forEach((el) => {
                el.classList.add("pf-m-droppable");
                className !== '*' && el.classList.add("pf-m-droppable-bg");
              });
            });
          } else {
            // open up everything
            [...document.querySelectorAll(`.uib-preview *`)].forEach((el) => {
              el.classList.add("pf-m-droppable");
            });
          }
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
          {showExpand && <span className="list-child"></span>}
          <DataListDragButton />
        </DataListControl>
        <DataListItemCells
          dataListCells={[
            <DataListCell key={`cell-child-${component}`}>
              {!canPlace ? (
                <Tooltip
                  content={getContent(component, value, canPlace)}
                  isContentLeftAligned
                  position="right"
                >
                  <div id={spanId} className="cell-text">
                    {component}
                  </div>
                </Tooltip>
              ) : (
                <div id={spanId} className="cell-text" title={component}>
                  {component}
                </div>
              )}
              {value.prop && (
                <Tooltip
                  content={getContent(component, value)}
                  isContentLeftAligned
                  position="right"
                >
                  <span className="cell-info">
                    <InfoCircleIcon />
                  </span>
                </Tooltip>
              )}
            </DataListCell>,
          ]}
        />
      </DataListItemRow>
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

const getHash = (text: string) => {
  var hash = 0,
    i,
    chr;
  if (text.length === 0) return hash;
  for (i = 0; i < text.length; i++) {
    chr = text.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

const placeable = (component, componentsInUse, parent = null) => {
  const placementRules = allowableDropMap[component]; // { Accordion: 'pf-c-accordion', SomethingElse: 'pf-c-something-else }
  let canPlace = placementRules
    ? false
    : parent
    ? Boolean(componentsInUse[parent])
    : true;
  if (placementRules) {
    const elements = Object.keys(placementRules);
    for (var i = 0; i < elements.length; i++) {
      if (elements[i] === '*' || componentsInUse[elements[i]]) {
        canPlace = true;
        break;
      }
    }
  }
  return canPlace;
};

export const ComponentList = ({ code }) => {
  const [itemKey, setItemKey] = React.useState(0);
  const { componentsInUse } = React.useContext(AppContext);
  const allComponentsList = Object.entries(parentChildComponents)
    .filter(([key, value]) => !(value as any).parent)
    .sort()
    .map((c) => (
      <ComponentItem
        key={`parentChild-${c[0]}-${itemKey}`}
        component={c[0]}
        value={c[1]}
        canPlace={placeable(c[0], componentsInUse)}
      />
    ));
  const allLayoutsList = Object.entries(parentChildLayouts)
    .filter(([key, value]) => !(value as any).parent)
    .sort()
    .map((c) => (
      <ComponentItem
        key={`parentChild-${c[0]}-${itemKey}`}
        component={c[0]}
        value={c[1]}
        canPlace={placeable(c[0], componentsInUse)}
      />
    ));
  const [componentsList, setComponentsList] = React.useState(allComponentsList);
  const [layoutsList, setLayoutsList] = React.useState(allLayoutsList);
  // React.useEffect(() => {
  //   console.log("ComponentList new code");
  // }, [code]);
  const onChangeComponents = (val: string) => {
    if (!val) {
      setComponentsList(allComponentsList);
    } else {
      setComponentsList(
        Object.entries(parentChildComponents)
          .filter(
            ([key, value]) => key.toLowerCase().indexOf(val.toLowerCase()) > -1
          )
          .sort()
          .map((c) => (
            <ComponentItemChild
              key={`flat-${c[0]}-${itemKey}`}
              component={c[0]}
              value={c[1]}
              canPlace={
                !(c[1] as any).parent
                  ? true
                  : placeable(c[0], componentsInUse, (c[1] as any).parent)
              }
              showExpand={false}
            />
          ))
      );
    }
  };
  const onChangeLayouts = (val: string) => {
    if (!val) {
      setLayoutsList(allLayoutsList);
    } else {
      setLayoutsList(
        Object.entries(parentChildLayouts)
          .filter(
            ([key, value]) => key.toLowerCase().indexOf(val.toLowerCase()) > -1
          )
          .sort()
          .map((c) => (
            <ComponentItemChild
              key={`flat-${c[0]}-${itemKey}`}
              component={c[0]}
              value={c[1]}
              canPlace={
                !(c[1] as any).parent
                  ? true
                  : placeable(c[0], componentsInUse, (c[1] as any).parent)
              }
              showExpand={false}
            />
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
              <ComponentItem
                key={`flat-${c[0]}`}
                component={c[0]}
                value={c[1]}
                canPlace={placeable(c[0], componentsInUse)}
              />
            ))}
        </ul>
      </Tab>
    </Tabs>
  );
};
