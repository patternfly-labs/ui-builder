import * as React from "react";
import GripVerticalIcon from "@patternfly/react-icons/dist/js/icons/grip-vertical-icon";
import ExternalLinkAltIcon from "@patternfly/react-icons/dist/js/icons/external-link-alt-icon";
import { css } from "@patternfly/react-styles";
import { Button } from "@patternfly/react-core";

export const components = {
  PageHeader: "<PageHeader></PageHeader>",
  PageSection: "<PageSection></PageSection>",
  Gallery: "<Gallery></Gallery>",
  GalleryItem: "<GalleryItem></GalleryItem>",
  Card: "<Card></Card>",
  CardBody: "<CardBody></CardBody>",
  Button: "<Button></Button>",
  DatePicker: "<DatePicker></DatePicker>",
  Badge: "<Badge>5</Badge>",
};

// allowed drag targets
export const allowableDropMap = {
  PageHeader: ["pf-c-page"],
  PageSection: ["pf-c-page"],
  Gallery: ["pf-c-page__main-section"],
  GalleryItem: ["pf-l-gallery"],
  Card: ["pf-c-page__main-section", "pf-l-gallery", "pf-l-gallery__item"],
  CardBody: ["pf-c-card"],
  Button: ["pf-c-page__main-section", "pf-l-gallery", "pf-l-gallery__item", "pf-c-card", "pf-c-card__body"],
  DatePicker: ["pf-c-page__main-section", "pf-l-gallery", "pf-l-gallery__item", "pf-c-card", "pf-c-card__body"],
  Badge: ["pf-c-page__main-section", "pf-l-gallery", "pf-l-gallery__item", "pf-c-card", "pf-c-card__body"]
};

function ComponentItem([component, code]) {
  const [isHidden, setHidden] = React.useState(true);
  React.useEffect(() => {
    const classTargets = allowableDropMap[component];
    if (classTargets) {
      classTargets.forEach((className) => {
        if (document.querySelectorAll(`.uib-preview .${className}`).length) {
          isHidden && setHidden(false);
        }
      });
    }
  });
  const spanId = `component-list-${component}`;

  return (
    <li
      key={component}
      className={css("pf-c-data-list__item", isHidden && "pf-m-hide")}
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
            component,
            code,
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
            <Button variant="plain" aria-label="Action" style={{ float: 'right', padding: 0 }} onClick={() => {
              // TODO: Need a lookup map as it won't work this generically
              let toLink = component.toLowerCase();
              if (component.toLowerCase().startsWith('page')) {
                toLink = 'page';
              }
              window.open(`https://www.patternfly.org/v4/components/${toLink}`)
            }}>
              <ExternalLinkAltIcon />
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
}

export const ComponentList = () => {
  return (
    <ul
      className="pf-c-data-list"
      role="list"
      aria-label="Basic data list example"
    >
      {Object.entries(components).map(ComponentItem)}
    </ul>
  );
};
