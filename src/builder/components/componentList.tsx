import * as React from "react";
import GripVerticalIcon from "@patternfly/react-icons/dist/js/icons/grip-vertical-icon";
import ExternalLinkAltIcon from "@patternfly/react-icons/dist/js/icons/external-link-alt-icon";
import InfoCircleIcon from "@patternfly/react-icons/dist/js/icons/info-circle-icon";
import { css } from "@patternfly/react-styles";
import * as coreComponents from "@patternfly/react-core/dist/esm/components";
import * as coreLayouts from "@patternfly/react-core/dist/esm/layouts";
import { componentSnippets } from "./snippets/snippets";
import { componentRules, layoutRules } from "./rules";
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

const filteredOut = [
  "DropdownWithContext",
  "TextAreaBase",
  "MenuToggleBase",
  "DragDrop",
  "Draggable",
  "Droppable",
  "TextInputBase",
  "ApplicationLauncherIcon",
  "ApplicationLauncherText",
  "DataListText",
  "FileUpload", // bug: when you remove the code from the editor, cannot drop another component into the builder
  "Backdrop",
  "BackgroundImage",
];
const isParent = [
  "AlertGroup",
  "ChipGroup",
  "FormSelect",
  "LabelGroup",
  "MenuToggle",
  "TextArea",
  "TextInput",
  "FileUploadField", // raise to parent while FileUpload is filtered out
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
  Chip: "ChipGroup",
  DrilldownMenu: "Menu",
};

const startsWithCapital = (word: string) =>
  word.charAt(0) === word.charAt(0).toUpperCase();

const filterFnc = ([key, value]) => {
  // filter out anything that isn't a component
  return (
    startsWithCapital(key) &&
    (typeof value === "function" ||
      (typeof value === "object" && value.render)) &&
    filteredOut.indexOf(key) === -1 &&
    // filter out Login items for now
    !key.startsWith("Login") &&
    // filter out ModalContent/Box items for now
    !key.startsWith("ModalBox") &&
    !key.startsWith("ModalContent")
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
const mappedComponentRules = Object.fromEntries(
  Object.entries(componentRules).map(([key, value]) => {
    if (typeof value === "string") {
      return [
        key,
        {
          jsx: value,
        },
      ];
    } else if (!(value as any).jsx) {
      return [
        key,
        {
          ...(value as any),
          jsx: `<${key}></${key}>`,
        },
      ];
    }
    return [key, value];
  })
);
const mappedLayoutRules = Object.fromEntries(
  Object.entries(layoutRules).map(([key, value]) => {
    if (typeof value === "string") {
      return [
        key,
        {
          jsx: value,
        },
      ];
    } else if (!(value as any).jsx) {
      return [
        key,
        {
          ...(value as any),
          jsx: `<${key}></${key}>`,
        },
      ];
    }
    return [key, value];
  })
);

const parentChild = (components) => {
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
            if (components[possibleParent].parent) {
              // not a parent item
              continue;
            }
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
  ...mappedComponentRules,
};

const parentChildComponents = parentChild({
  ...components,
});

export const layouts = {
  ...mappedCoreLayouts,
  ...mappedLayoutRules,
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

const getContent = (component, value) => {
  const placementTargets =
    componentRules[component] && componentRules[component].targets;
  let body = "";
  if (placementTargets) {
    body += `&#8226; Should be nested within ${componentRules[component].targets.join(
      " | "
    )}<br />`;
  } else if (value.parent) {
    body += `&#8226; Should be nested within ${value.parent}<br />`;
  }
  if (value.props) {
    body += body ? `<br />` : '';
    body += `&#8226; Will add the following props:<br />`;
    value.props.forEach((p) => {
      body += `&nbsp;&nbsp;- ${p.component || value.component}: ${p.prop}<br />`;
    });
  }
  return { __html: body };
};

const onDragStart = (ev, component) => {
  ev.stopPropagation();
  console.log(`dragStart: ${component}`);
  [...document.querySelectorAll(`.uib-preview *`)].forEach((el) => {
    el.classList.add("pf-m-droppable");
  });
  const rule = componentRules[component];
  let classTargets =
    (rule && rule.targets) || (rule && rule.component && [rule.component]);
  if (classTargets) {
    classTargets.forEach((className) => {
      if (className.indexOf("|") > -1) {
        // priority syntax, higher priority from left to right
        // i.e. targets: ['DropdownToggleAction | DropdownToggle']
        // means target 'DropdownToggleAction', and only if it doesn't exist target 'DropdownToggle'
        const prioritizedClassNames = className.split("|");
        for (let i = 0; i < prioritizedClassNames.length; i++) {
          const selector = `.${
            componentToClassMap[prioritizedClassNames[i].trim()]
          }`;
          if (document.querySelector(`.uib-preview ${selector}`)) {
            // exists
            [...document.querySelectorAll(`.uib-preview ${selector}`)].forEach(
              (el) => {
                el.classList.add("pf-m-droppable-bg");
              }
            );
            break;
          }
        }
      } else {
        const selector = `.${componentToClassMap[className]}`;
        [...document.querySelectorAll(`.uib-preview ${selector}`)].forEach(
          (el) => {
            el.classList.add("pf-m-droppable-bg");
          }
        );
      }
    });
  } else {
    // by default, target the parent as a drop target
    const componentInfo = allParentChildItems[component];
    if (componentInfo && (componentInfo as any).parent) {
      const className =
        "." + componentToClassMap[(componentInfo as any).parent as string];
      [...document.querySelectorAll(`.uib-preview ${className}`)].forEach(
        (el) => {
          el.classList.add("pf-m-droppable-bg");
        }
      );
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
};

const onDragEnd = (ev) => {
  ev.stopPropagation();
  [...document.querySelectorAll(".pf-m-droppable")].forEach((el) => {
    el.classList.remove("pf-m-droppable", "pf-m-droppable-bg");
  });
  const tooltip: HTMLElement = document.querySelector(
    "#component-name-tt .pf-c-tooltip__content"
  );
  if (tooltip) {
    tooltip.style.display = "none";
  }
};

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
  const content = getContent(component, value);

  return (
    <DataListItem
      key={component}
      isExpanded={expanded === component}
      className={css(!canPlace && "pf-m-hide", !hasChildren && "pf-m-grab")}
      aria-labelledby={spanId}
      draggable={!hasChildren}
      onDragStart={(ev) => onDragStart(ev, component)}
      onDragEnd={onDragEnd}
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
              {content.__html && (
                <Tooltip
                  content={
                    <div
                      dangerouslySetInnerHTML={content}
                    />
                  }
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
                      Boolean(
                        componentRules[childComponent] &&
                          componentRules[childComponent].targets
                          ? true
                          : componentsInUse[component]
                      ) && placeable(childComponent, componentsInUse)
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
  canPlace: canPlaceProp,
  showExpand = true,
}: {
  component: string;
  value: any;
  canPlace?: boolean;
  showExpand?: boolean;
}) => {
  const { componentsInUse } = React.useContext(AppContext);
  // console.log(`${JSON.stringify(componentsInUse)}`);
  const spanId = `component-list-${component}`;
  const canPlace =
    canPlaceProp ||
    (!value.parent
      ? true
      : placeable(component, componentsInUse, value.parent));
  const content = getContent(component, value);
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
      onDragStart={(ev) => onDragStart(ev, component)}
      onDragEnd={onDragEnd}
    >
      <DataListItemRow>
        <DataListControl>
          {showExpand && <span className="list-child"></span>}
          <DataListDragButton />
        </DataListControl>
        <DataListItemCells
          dataListCells={[
            <DataListCell key={`cell-child-${component}`}>
              <div id={spanId} className="cell-text">
                  {component}
                </div>
              {content.__html && (
                <Tooltip
                  content={
                    <div
                      dangerouslySetInnerHTML={content}
                    />
                  }
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
  const placementRules =
    componentRules[component] && componentRules[component].targets;
  let canPlace = placementRules
    ? false
    : parent
    ? Boolean(componentsInUse[parent])
    : true;
  if (placementRules) {
    for (var i = 0; i < placementRules.length; i++) {
      if (placementRules[i].indexOf("|") > -1) {
        // priority syntax, higher priority from left to right
        // i.e. targets: ['DropdownToggleAction | DropdownToggle']
        // means target 'DropdownToggleAction', and only if it doesn't exist target 'DropdownToggle'
        const prioritizedClassNames = placementRules[i].split("|");
        for (let i = 0; i < prioritizedClassNames.length; i++) {
          if (
            prioritizedClassNames[i].trim() === "*" ||
            componentsInUse[prioritizedClassNames[i].trim()]
          ) {
            canPlace = true;
            break;
          }
        }
      } else if (
        placementRules[i] === "*" ||
        componentsInUse[placementRules[i]]
      ) {
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
