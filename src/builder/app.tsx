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
} from "@patternfly/react-core";
import CodepenIcon from "@patternfly/react-icons/dist/esm/icons/codepen-icon";
import { CodeEditor, Language } from "@patternfly/react-code-editor";
import logo from "./logo.svg";
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

export const AppContext = React.createContext({
  componentsInUse: {},
  setComponentsInUse: (comps) => {},
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

  return (
    <AppContext.Provider value={{
      componentsInUse: componentsInUseState,
      setComponentsInUse: onSetComponentsInUse
    }}>
      <Page
        className={css(
          "pf-builder-page",
          showCode ? "layout-mode" : "preview-mode"
        )}
        // isManagedSidebar={showCode ? true : false}
        isManagedSidebar={false}
        header={
          <PageHeader
            className="pf-builder-header"
            /*showNavToggle*/
            logo={
              vscode ? (
                // <img className={css("pf-c-brand")} src={'http://patternfly-react.surge.sh/images/logo.4189e7eb1a0741ea2b3b51b80d33c4cb.svg'} alt={"UI Builder"} />
                <Title
                  className={css("pf-c-brand")}
                  headingLevel="h1"
                  size="xl"
                >
                  PatternFly UI Builder
                </Title>
              ) : (
                <Brand src={logo} alt="PatternFly Logo" />
              )
            }
            logoProps={{
              href:
                "https://www.patternfly.org/v4/developer-resources/release-notes#2021.12-release-notes-2021-09-15",
              target: "_blank",
            }}
            logoComponent={vscode ? "div" : "a"}
            headerTools={
              <PageHeaderTools>
                <PageHeaderToolsGroup>
                  <PageHeaderToolsItem>
                    {/* @ts-ignore */}
                    <NewFromTemplate setCode={onChange} />
                  </PageHeaderToolsItem>
                </PageHeaderToolsGroup>
                <PageHeaderToolsGroup>
                  {!vscode && (
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
        }
        // sidebar={
        //   <PageSidebar
        //     isNavOpen={showCode}
        //     className="pf-builder-sidebar"
        //     nav={<ComponentList code={code} />}
        //   />
        // }
      >
        <PageSection>
          <Split style={{ height: "100%" }}>
            <div className="pf-builder-sidebar">
              <ComponentList code={code} />
            </div>
            <SplitItem
              isFilled
              className={css("uib-preview", vscode && "vscode")}
            >
              <ErrorBoundary>
                <LiveRegion
                  code={code}
                  setCode={onChange}
                />
              </ErrorBoundary>
            </SplitItem>
            {showCode && (
              <>
                <SplitItem
                  className={css("pf-builder-editor", vscode && "vscode")}
                >
                  <div>
                    <Tabs defaultActiveKey={0}>
                      <Tab
                        eventKey={0}
                        title={<TabTitleText>Main</TabTitleText>}
                      >
                        <CodeEditor
                          language={Language.javascript}
                          height={`calc(${
                            showProps ? "50vh - 96px" : "100vh - 174px"
                          })`}
                          width="500px"
                          code={code as string}
                          onChange={onChange}
                          isLineNumbersVisible
                          // onEditorWillMount={onEditorWillMount}
                          onEditorDidMount={onEditorDidMount}
                          options={{
                            automaticLayout: true,
                          }}
                        />
                      </Tab>
                      {additionalTabs &&
                        additionalTabs.map((tab, index) => (
                          <Tab
                            key={index + 1}
                            eventKey={index + 1}
                            title={<TabTitleText>{tab.title}</TabTitleText>}
                          >
                            {/* <pre style={{ width: "500px" }}>{tab.code}</pre> */}
                            <CodeEditor
                              key={`editor-${index + 1}`}
                              language={Language.javascript}
                              height={`calc(${
                                showProps ? "50vh - 96px" : "100vh - 174px"
                              })`}
                              width="500px"
                              code={tab.code}
                              // onChange={onChange}
                              isLineNumbersVisible
                              // onEditorWillMount={onEditorWillMount}
                              // onEditorDidMount={onEditorDidMount}
                              options={{
                                automaticLayout: true,
                              }}
                              isReadOnly
                            />
                            {/* <MonacoEditor
                            height={`calc(${
                              showProps ? "50vh - 96px" : "100vh - 174px"
                            })`}
                            width="500px"
                            language="javascript"
                            theme="vs-dark"
                            value={code}
                          /> */}
                          </Tab>
                        ))}
                    </Tabs>
                  </div>
                  {showProps && (
                    <div className="props-editor">
                      <Props
                        component={component}
                        onChange={onChange}
                        onClose={() => setComponent(null)}
                      />
                    </div>
                  )}
                </SplitItem>
              </>
            )}
          </Split>
        </PageSection>
      </Page>
    </AppContext.Provider>
  );
};
