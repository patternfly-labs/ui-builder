import * as React from "react";
import { Badge, Title, Button } from "@patternfly/react-core";
import {
  Table,
  TableHeader,
  TableBody,
  cellWidth,
} from "@patternfly/react-table";
import TimesIcon from "@patternfly/react-icons/dist/esm/icons/times-icon";
import { parseJson } from "./utils";

// react-docgen Button.tsx --pretty -o Button.json
const ButtonProps = require("./Button.json");
const PageSectionProps = require("./PageSection.json");
const PageProps = require("./Page.json");
const GalleryProps = require("./Gallery.json");
const GalleryItemProps = require("./GalleryItem.json");

const parsedMap = {
  ButtonProps: parseJson(ButtonProps),
  PageSectionProps: parseJson(PageSectionProps),
  PageProps: parseJson(PageProps),
  GalleryProps: parseJson(GalleryProps),
  GalleryItemProps: parseJson(GalleryItemProps),
};

export const Props = ({ component, onChange, onClose }) => {
  const columns = [
    { title: "Name", transforms: [cellWidth(20)] },
    { title: "Type", transforms: [cellWidth(20)] },
    { title: "Default", transforms: [] },
    { title: "Description", transforms: [] },
  ];

  const parsed = parsedMap[`${component}Props`];
  if (!parsed) {
    return <div>Props not found</div>;
  }

  const title = parsed.name;
  const rows = parsed.props;

  return (
    <React.Fragment>
      <div>
        {/* <Title headingLevel="h1" size="md">
          {title}
        </Title> */}
        <Button variant="plain" className="props-title">
          <strong>{title}</strong>
        </Button>
        <Button variant="plain" aria-label="Close props" style={{ float: "right" }} onClick={onClose}>
          <TimesIcon />
        </Button>
      </div>
      <Table
        isStickyHeader
        className="pf-u-mt-md pf-u-mb-lg"
        variant="compact"
        aria-label={title}
        // caption={
        //   <div>
        //     <span className="ws-prop-required">*</span>required
        //   </div>
        // }
        cells={columns}
        gridBreakPoint="grid-lg"
        rows={rows
          // Sort required rows first
          .sort((a, b) => (a.required === b.required ? 0 : a.required ? -1 : 1))
          .map((row, idx) => ({
            cells: [
              <div className="pf-m-break-word">
                {row.deprecated && "Deprecated: "}
                {/* <Button
                  onClick={() =>
                    onChange(`<Button variant="secondary"></Button>`)
                  }
                >
                  {row.name}
                </Button> */}
                {row.name}
                {row.required ? (
                  <React.Fragment key={`${row.name}-required-prop`}>
                    <span
                      aria-hidden="true"
                      key={`${row.name}-asterisk`}
                      className="ws-prop-required"
                    >
                      *
                    </span>
                    <span key={`${row.name}-required`}>required</span>
                  </React.Fragment>
                ) : (
                  ""
                )}
                {row.beta && (
                  <Badge
                    key={`${row.name}-${idx}`}
                    className="ws-beta-badge pf-u-ml-sm"
                  >
                    Beta
                  </Badge>
                )}
              </div>,
              <div className="pf-m-break-word">{row.type}</div>,
              <div className="pf-m-break-word">{row.defaultValue}</div>,
              <div className="pf-m-break-word">{row.description}</div>,
            ],
          }))}
      >
        <TableHeader />
        <TableBody />
      </Table>
    </React.Fragment>
  );
};
