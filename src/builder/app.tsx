import * as React from "react";
import {
  Page,
  PageHeader,
  PageSidebar,
  PageHeaderTools,
  PageHeaderToolsGroup,
  PageHeaderToolsItem,
  PageSection,
  Switch,
  Brand,
  Drawer,
  DrawerPanelContent,
  DrawerContent,
  DrawerContentBody,
  Button,
  Form,
  Tooltip,
  Title,
  Dropdown,
  DropdownItem,
  KebabToggle,
  DropdownToggle,
} from "@patternfly/react-core";
import CodepenIcon from "@patternfly/react-icons/dist/esm/icons/codepen-icon";
import GithubIcon from "@patternfly/react-icons/dist/esm/icons/github-icon";
import ImportIcon from "@patternfly/react-icons/dist/esm/icons/import-icon";
import { CodeEditor, Language } from "@patternfly/react-code-editor";
import codeEditorStyles from "@patternfly/react-styles/css/components/CodeEditor/code-editor";
// @ts-ignore
import logo from "./logo.png";
import { LiveRegion } from "./liveRegion";
import {
  components,
  layouts,
  ComponentList,
  allItems,
} from "./components/componentList";
import { componentSnippets } from "./components/snippets/snippets";
import { Base64 } from "js-base64";
import { css } from "@patternfly/react-styles";
import { Props, parsedPropsMap } from "./components/docgen/Props";
import MonacoEditor from "react-monaco-editor";
import ErrorBoundary from "./ErrorBoundary";
import babylon from "prettier/parser-babel";
import NewFromTemplate from "./newFromTemplate";
import { getReactParams } from "./helpers/codesandbox";
import { getParameters } from "codesandbox/lib/api/define";
import { shallowEqual } from "./helpers/shallowEqual";
// @ts-ignore
import NewPage from "!!raw-loader!./components/templates/NewPage";
import { GistExportModal } from "./components/GistExportModal";
import { GistImportModal } from "./components/GistImportModal";
import { scope } from "./liveRegion";

const prettier = require("prettier/standalone");

export const AppContext = React.createContext({
  componentsInUse: {},
  setComponentsInUse: (comps) => {},
  activeComponent: "",
  setActiveComponent: (comp) => {},
  theme: "dark",
  toggleTheme: (theme) => {},
});

/* vscode = { postMessage: (msg) => console.log(msg) } */
export const App = ({ vscode, data, filePath }) => {
  const codeFromStorage = localStorage.getItem("pf-builder-code");
  const template = NewPage;
  const [code, setCode] = React.useState<string | unknown>(
    codeFromStorage || template
  );
  const [showCode, setShowCode] = React.useState(true);
  const [component, setComponent] = React.useState(null);
  /* { title: 'PageHeaderSnippet', code: rawCodeString } */
  const [additionalTabs, setAdditionalTabs] = React.useState<any[] | null>();
  const [componentsInUseState, setComponentsInUseState] = React.useState({});
  const onSetComponentsInUse = (compsInUse) => {
    if (!shallowEqual(compsInUse, componentsInUseState)) {
      setComponentsInUseState(compsInUse);
    }
  };
  const [activeComponentState, setActiveComponentState] = React.useState("");
  const drawerWidthFromStorage = localStorage.getItem("pf-builder-code-width");
  const [drawerWidth, setDrawerWidth] = React.useState(
    drawerWidthFromStorage || 600
  );
  const [gistExportModalOpen, setGistExportModalOpen] = React.useState(false);
  const [gistImportModalOpen, setGistImportModalOpen] = React.useState(false);
  const localStorageTheme = localStorage.getItem("pf-builder-code-theme") as
    | "light"
    | "dark"
    | null;
  const [themeState, setThemeState] = React.useState<"light" | "dark">(
    localStorageTheme || "dark"
  );
  const [overflowOpen, setOverflowOpen] = React.useState(false);

  const toggleTheme = () => {
    if (themeState === "light") {
      setThemeState("dark");
      localStorage.setItem("pf-builder-code-theme", "dark");
    } else {
      setThemeState("light");
      localStorage.setItem("pf-builder-code-theme", "light");
    }
  };

  React.useEffect(() => {
    const bodyElement = document.body;
    if (showCode) {
      bodyElement.classList.remove("preview-mode");
      bodyElement.classList.add("layout-mode");
    } else {
      bodyElement.classList.add("preview-mode");
      bodyElement.classList.remove("layout-mode");
    }
  }, [showCode]);

  // React.useEffect(() => {
  //   const extraTabs = [];
  //   for (const component in componentsInfo) {
  //     if (code.search(`<${component}`) >= 0 && componentsInfo[component].code) {
  //       extraTabs.push({
  //         title: component,
  //         code: componentsInfo[component].code,
  //       });
  //     }
  //   }
  //   setAdditionalTabs(extraTabs.length ? extraTabs : null);
  // }, [code]);

  React.useEffect(() => {
    if (data) {
      console.log(vscode);
      console.log(filePath);
      const decodedData = Base64.decode(data);
      if (decodedData !== code) {
        setCode(decodedData);
      }
    }
  }, [data]);

  React.useEffect(() => {
    // save to local storage on code change
    localStorage.setItem("pf-builder-code", code as string);
  }, [code]);

  const cleanupCode = (code) => {
    code = prettier.format(code, { parser: "babel", plugins: [babylon] });
    return code;
  };

  const onChange = (newCode) => {
    if (!newCode) {
      setTimeout(() => setCode(template), 10);
    } else {
      newCode = cleanupCode(newCode);
      setCode(newCode);
    }
    vscode &&
      vscode.postMessage &&
      vscode.postMessage({
        command: "codeEditor",
        text: newCode,
      });
  };

  const onEditorWillMount = (monaco) => {
    monaco.languages.registerHoverProvider("javascript", {
      provideHover: function (model, position) {
        return {
          // range: new monaco.Range(
          //   1,
          //   1,
          //   model.getLineCount(),
          //   model.getLineMaxColumn(model.getLineCount())
          // ),
          contents: [{ value: "**SOURCE**" }, { value: "hello" }],
        };
      },
    });
  };

  const onEditorDidMount = (editor, monaco) => {
    onEditorWillMount(monaco);

    editor.layout();

    editor.onMouseDown(function (e) {
      if (e.target.type !== 6) {
        return;
      }

      const m = editor.getModel();
      const a = m.getWordAtPosition(editor.getPosition());
      console.log(a);

      const possibleTag = a && a.word;
      if (possibleTag && allItems[possibleTag]) {
        setComponent(possibleTag);
      }
    });
  };

  const showProps = component && parsedPropsMap[`${component}Props`];

  const feedbackThemeItems = [
    <DropdownItem key="feedback">
      <Button
        variant="plain"
        component="a"
        href="https://github.com/patternfly-labs/ui-builder/issues"
        target="_blank"
      >
        Feedback
      </Button>
    </DropdownItem>,
    <DropdownItem key="theme-toggle" onClick={toggleTheme}>
      <Button variant="plain">Toggle theme</Button>
    </DropdownItem>,
  ];

  const codesandboxForm = (description = "") => (
    <Form
      // aria-label={codesandboxLabel}
      action="https://codesandbox.io/api/v1/sandboxes/define"
      method="POST"
      target="_blank"
      style={{ display: "inline-block" }}
    >
      <Button
        // aria-label={codesandboxLabel}
        variant="control"
        type="submit"
      >
        <input
          type="hidden"
          name="parameters"
          // @ts-ignore
          value={getParameters(getReactParams("NewComponent", code, scope))}
        />
        {description || <CodepenIcon />}
      </Button>
    </Form>
  );

  const importExportItems = [
    <DropdownItem
      key="import-gist"
      onClick={() => setGistImportModalOpen(true)}
    >
      <Button variant="plain">Import from gist</Button>
    </DropdownItem>,
    <DropdownItem
      key="export-gist"
      onClick={() => setGistExportModalOpen(true)}
    >
      <Button variant="plain">Export to gist</Button>
    </DropdownItem>,
  ];

  const onKebabDropdownToggle = (isOpen) => {
    setOverflowOpen(isOpen);
  };

  const onKebabDropdownSelect = (event) => {
    setOverflowOpen(!overflowOpen);
  };

  const pageHeader = (
    <PageHeader
      className="pf-builder-header"
      showNavToggle
      logo={
        vscode ? (
          <Title className={css("pf-c-brand")} headingLevel="h1" size="xl">
            PatternFly UI Builder
          </Title>
        ) : (
          <>
            <Brand src={logo} alt="PatternFly Logo" />
            <div>
              <div className="logo-text">PatternFly Labs_ UI Builder</div>
              <div>Release 2021.13</div>
            </div>
          </>
        )
      }
      logoProps={{
        href:
          "https://www.patternfly.org/v4/developer-resources/release-notes#2021.13-release-notes-2021-10-13",
        target: "_blank",
      }}
      logoComponent={vscode ? "div" : "a"}
      headerTools={
        <PageHeaderTools>
          <PageHeaderToolsGroup
            visibility={{ default: "hidden", "2xl": "visible" }}
          >
            <PageHeaderToolsItem>
              <Button
                variant="plain"
                component="a"
                href="https://github.com/patternfly-labs/ui-builder/issues"
                target="_blank"
              >
                Feedback
              </Button>
            </PageHeaderToolsItem>
          </PageHeaderToolsGroup>
          <PageHeaderToolsGroup
            visibility={{ default: "hidden", "2xl": "visible" }}
          >
            <PageHeaderToolsItem>
              <Switch
                id="theme-toggle"
                label="Dark theme"
                labelOff="Light theme"
                isChecked={themeState === "dark"}
                onChange={toggleTheme}
                isReversed
              />
            </PageHeaderToolsItem>
          </PageHeaderToolsGroup>
          <PageHeaderToolsGroup>
            <PageHeaderToolsItem>
              {/* @ts-ignore */}
              <NewFromTemplate setCode={onChange} />
            </PageHeaderToolsItem>
          </PageHeaderToolsGroup>
          <PageHeaderToolsGroup visibility={{ default: "hidden", "2xl": "visible" }}>
            <PageHeaderToolsItem>
              <Tooltip
                trigger="mouseenter"
                content="Import from gist"
                exitDelay={300}
                entryDelay={300}
                position="bottom"
              >
                <Button
                  variant="control"
                  onClick={() => setGistImportModalOpen(true)}
                  isDisabled={gistImportModalOpen}
                >
                  <ImportIcon />
                </Button>
              </Tooltip>
            </PageHeaderToolsItem>
            <PageHeaderToolsItem>
              <Tooltip
                trigger="mouseenter"
                content="Export to gist"
                exitDelay={300}
                entryDelay={300}
                position="bottom"
              >
                <Button
                  variant="control"
                  onClick={() => setGistExportModalOpen(true)}
                  isDisabled={gistExportModalOpen}
                >
                  <GithubIcon />
                </Button>
              </Tooltip>
            </PageHeaderToolsItem>
          </PageHeaderToolsGroup>
          <PageHeaderToolsGroup>
            {!vscode && (
              <>
                <PageHeaderToolsItem>
                  <Tooltip
                    trigger="mouseenter"
                    content="Export to Codesandbox"
                    exitDelay={300}
                    entryDelay={300}
                    position="bottom"
                  >
                    {codesandboxForm()}
                  </Tooltip>
                </PageHeaderToolsItem>
              </>
            )}
          </PageHeaderToolsGroup>
          <PageHeaderToolsGroup
            visibility={{
              default: "hidden",
              md: "hidden",
              lg: "hidden",
              xl: "visible",
              "2xl": "hidden",
            }}
          >
            <PageHeaderToolsItem>
              <Dropdown
                isPlain
                position="right"
                onSelect={onKebabDropdownSelect}
                toggle={<KebabToggle onToggle={onKebabDropdownToggle} />}
                isOpen={overflowOpen}
                dropdownItems={feedbackThemeItems.concat(importExportItems)}
                className="pf-builder-overflow"
              />
            </PageHeaderToolsItem>
          </PageHeaderToolsGroup>
          <PageHeaderToolsGroup>
            <PageHeaderToolsItem>
              <Switch
                label="Layout mode"
                labelOff="Preview mode"
                isChecked={showCode}
                onChange={() => setShowCode(!showCode)}
              />
            </PageHeaderToolsItem>
          </PageHeaderToolsGroup>
        </PageHeaderTools>
      }
    />
  );

  const onDrawerResize = (newWidth, id) => {
    console.log(newWidth);
    setDrawerWidth(newWidth);
    localStorage.setItem("pf-builder-code-width", newWidth);
  };
  const panelContent = (
    <DrawerPanelContent
      isResizable
      onResize={onDrawerResize}
      defaultSize={`${drawerWidth}px`}
      className={css("pf-builder-editor", vscode && "vscode")}
    >
      {/* <CodeEditor
        language={Language.javascript}
        // height={`calc(${showProps ? "50vh - 96px" : "100vh - 174px"})`}
        height={`calc(100vh - 92px)`}
        code={code as string}
        onChange={onChange}
        isLineNumbersVisible
        onEditorDidMount={onEditorDidMount}
        options={{
          automaticLayout: true,
        }}
      /> */}
      {/* until fixed: https://github.com/patternfly/patternfly-react/issues/6501 */}
      <div className={css(codeEditorStyles.codeEditor)}>
        <div className={css(codeEditorStyles.codeEditorMain)}>
          <MonacoEditor
            height={`calc(100vh - 76px)`}
            language="javascript"
            theme={themeState === "dark" ? "vs-dark" : "vs-light"}
            value={code as string}
            onChange={onChange}
            editorDidMount={onEditorDidMount}
            options={{
              automaticLayout: true,
            }}
          />
        </div>
      </div>
    </DrawerPanelContent>
  );
  const uiBuilderDrawer = (
    <Drawer isExpanded isInline className="pf-builder-drawer">
      <DrawerContent
        panelContent={showCode && panelContent}
        colorVariant="light-200"
      >
        <DrawerContentBody>
          <div className={css("uib-preview", vscode && "vscode")}>
            <ErrorBoundary>
              <LiveRegion code={code} setCode={onChange} />
            </ErrorBoundary>
          </div>
        </DrawerContentBody>
      </DrawerContent>
    </Drawer>
  );

  return (
    <AppContext.Provider
      value={{
        componentsInUse: componentsInUseState,
        setComponentsInUse: onSetComponentsInUse,
        activeComponent: activeComponentState,
        setActiveComponent: setActiveComponentState,
        theme: themeState,
        toggleTheme,
      }}
    >
      <Page
        className={css(
          "pf-builder-page",
          showCode ? "layout-mode" : "preview-mode",
          themeState === "dark" && "dark-theme"
        )}
        isManagedSidebar
        header={pageHeader}
        sidebar={
          <PageSidebar
            className="pf-builder-sidebar"
            theme={themeState}
            nav={<ComponentList code={code} />}
          />
        }
      >
        <PageSection
          className="pf-builder-section"
          padding={{ default: "noPadding" }}
        >
          {uiBuilderDrawer}
        </PageSection>
      </Page>
      {gistExportModalOpen && (
        <GistExportModal
          isOpen={gistExportModalOpen}
          onClose={() => setGistExportModalOpen(false)}
          code={code}
        />
      )}
      {gistImportModalOpen && (
        <GistImportModal
          isOpen={gistImportModalOpen}
          onClose={() => setGistImportModalOpen(false)}
          setCode={setCode}
        />
      )}
    </AppContext.Provider>
  );
};
