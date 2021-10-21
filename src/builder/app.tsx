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
  Split,
  SplitItem,
  Drawer,
  DrawerPanelContent,
  DrawerContent,
  DrawerContentBody,
  Stack,
  StackItem,
  Tab,
  Tabs,
  TabTitleText,
  Button,
  Form,
  Tooltip,
  Title,
  Flex,
  FlexItem,
  Bullseye,
  Modal,
  ClipboardCopy,
  ClipboardCopyAction,
} from "@patternfly/react-core";
import CodepenIcon from "@patternfly/react-icons/dist/esm/icons/codepen-icon";
import GithubIcon from "@patternfly/react-icons/dist/esm/icons/github-icon";
import ExternalLinkAltIcon from "@patternfly/react-icons/dist/esm/icons/external-link-alt-icon";
import { CodeEditor, Language } from "@patternfly/react-code-editor";
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

const prettier = require("prettier/standalone");

const Gists = require("gists");
const gists = new Gists({
  token: "",
});

export const AppContext = React.createContext({
  componentsInUse: {},
  setComponentsInUse: (comps) => {},
  activeComponent: "",
  setActiveComponent: (comp) => {},
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
    drawerWidthFromStorage || 500
  );
  const [creatingGist, setCreatingGist] = React.useState(false);
  const [gistUrl, setGistUrl] = React.useState("");
  const [gistModalOpen, setGistModalOpen] = React.useState(false);

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

  const createGist = () => {
    setCreatingGist(true);
    const options = {
      accept: "application/vnd.github.v3+json",
      description: "pf-ui-builder gist",
      public: true,
      files: {
        NewComponent: {
          content: code,
        },
      },
    };
    gists
      .create(options)
      .then((res) => {
        console.log(res.body);
        setGistUrl(res.body.html_url);
        setCreatingGist(false);
        setGistModalOpen(true);
      })
      .catch(console.error);
  };

  const pageHeader = (
    <PageHeader
      className="pf-builder-header"
      showNavToggle
      logo={
        vscode ? (
          // <img className={css("pf-c-brand")} src={'http://patternfly-react.surge.sh/images/logo.4189e7eb1a0741ea2b3b51b80d33c4cb.svg'} alt={"UI Builder"} />
          <Title className={css("pf-c-brand")} headingLevel="h1" size="xl">
            PatternFly UI Builder
          </Title>
        ) : (
          <>
            <Brand src={logo} alt="PatternFly Logo" />
            <span className="logo-text">PatternFly Labs_ UI Builder</span>
          </>
        )
      }
      logoProps={{
        href: "https://github.com/patternfly-labs/ui-builder",
        target: "_blank",
      }}
      logoComponent={vscode ? "div" : "a"}
      headerTools={
        <PageHeaderTools>
          <PageHeaderToolsGroup>
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
          <PageHeaderToolsGroup>
            <PageHeaderToolsItem>
              {/* @ts-ignore */}
              <NewFromTemplate setCode={onChange} />
            </PageHeaderToolsItem>
          </PageHeaderToolsGroup>
          <PageHeaderToolsGroup>
            {!vscode && (
              <>
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
                      onClick={createGist}
                      isDisabled={creatingGist}
                    >
                      <GithubIcon />
                    </Button>
                  </Tooltip>
                </PageHeaderToolsItem>
                <PageHeaderToolsItem>
                  <Tooltip
                    trigger="mouseenter"
                    content="Export to Codesandbox"
                    exitDelay={300}
                    entryDelay={300}
                    position="bottom"
                  >
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
                          value={getParameters(
                            getReactParams("NewComponent", code)
                          )}
                        />
                        <CodepenIcon />
                      </Button>
                    </Form>
                  </Tooltip>
                </PageHeaderToolsItem>
              </>
            )}
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
      <CodeEditor
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
      />
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
      }}
    >
      <Page
        className={css(
          "pf-builder-page",
          showCode ? "layout-mode" : "preview-mode"
        )}
        isManagedSidebar
        header={pageHeader}
        sidebar={
          <PageSidebar
            className="pf-builder-sidebar"
            theme="light"
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
      <Modal
        variant="medium"
        isOpen={gistModalOpen}
        onClose={() => setGistModalOpen(false)}
      >
        <div>Created gist at:</div>
        <div>
          <ClipboardCopy
            variant="inline-compact"
            additionalActions={
              <ClipboardCopyAction>
                <Tooltip
                  trigger="mouseenter"
                  content="Open URL"
                  exitDelay={300}
                  entryDelay={300}
                  position="bottom"
                >
                  <Button
                    variant="plain"
                    aria-label="Open new browser tab"
                    onClick={() => window.open(gistUrl)}
                  >
                    <ExternalLinkAltIcon aria-hidden />
                  </Button>
                </Tooltip>
              </ClipboardCopyAction>
            }
          >
            {gistUrl}
          </ClipboardCopy>
        </div>
      </Modal>
    </AppContext.Provider>
  );
};
