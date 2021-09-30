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
} from "@patternfly/react-core";
import { CodeEditor, Language } from "@patternfly/react-code-editor";
import logo from "./logo.svg";
import { LiveRegion } from "./liveRegion";
import {
  components,
  componentSnippets,
  ComponentList,
} from "./components/componentList";
import { Base64 } from "js-base64";
import { css } from "@patternfly/react-styles";
import { Props, parsedPropsMap } from "./components/docgen/Props";
import MonacoEditor from "react-monaco-editor";
import ErrorBoundary from "./ErrorBoundary";

const componentsInfo = {
  ...components,
  ...componentSnippets,
};

export const App = ({ vscode, data, filePath }) => {
  const codeFromStorage = localStorage.getItem("pf-builder-code");
  const template = components.Page;
  const [code, setCode] = React.useState(codeFromStorage || template);
  const [showCode, setShowCode] = React.useState(true);
  const [component, setComponent] = React.useState(null);
  /* { title: 'PageHeaderSnippet', code: rawCodeString } */
  const [additionalTabs, setAdditionalTabs] = React.useState<any[] | null>();

  React.useEffect(() => {
    const extraTabs = [];
    for (const component in componentsInfo) {
      if (code.search(`<${component}`) >= 0 && componentsInfo[component].code) {
        extraTabs.push({
          title: component,
          code: componentsInfo[component].code,
        });
      }
    }
    setAdditionalTabs(extraTabs.length ? extraTabs : null);
  }, [code]);

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
    localStorage.setItem("pf-builder-code", code);
  }, [code]);

  const cleanupCode = (code) => {
    // replace extra line breaks, maybe this needs to be fixed in helpers/acorn.ts instead?
    code = code.replace(/\n\s*\n/g, "\n");
    // remove extra spaces between end tag and newline
    code = code.replace(/>\s*\n/g, ">\n");
    return code;
  };

  const onChange = (newCode) => {
    if (!newCode) {
      setTimeout(() => setCode(template), 1);
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
      if (possibleTag && componentsInfo[possibleTag]) {
        setComponent(possibleTag);
      }
    });
  };

  const showProps = component && parsedPropsMap[`${component}Props`];

  return (
    <Page
      className="pf-builder-page"
      isManagedSidebar={showCode ? true : false}
      header={
        <PageHeader
          className="pf-builder-header"
          showNavToggle
          logo={<Brand src={logo} alt="PatternFly Logo" />}
          headerTools={
            <PageHeaderTools>
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
      sidebar={
        <PageSidebar
          isNavOpen={showCode}
          className="pf-builder-sidebar"
          nav={<ComponentList code={code} />}
        />
      }
    >
      <PageSection>
        <Split style={{ height: "100%" }}>
          <SplitItem
            isFilled
            className={css(
              "uib-preview",
              showCode ? "layout-mode" : "preview-mode"
            )}
          >
            <ErrorBoundary>
              <LiveRegion code={code} setCode={onChange} />
            </ErrorBoundary>
          </SplitItem>
          {showCode && (
            <>
              <SplitItem
                // style={{ display: !vscode ? "block" : "none" }}
                className="pf-builder-editor"
              >
                <div>
                  <Tabs defaultActiveKey={0}>
                    <Tab eventKey={0} title={<TabTitleText>Main</TabTitleText>}>
                      <CodeEditor
                        language={Language.javascript}
                        height={`calc(${
                          showProps ? "50vh - 96px" : "100vh - 174px"
                        })`}
                        width="500px"
                        code={code}
                        onChange={onChange}
                        isLineNumbersVisible
                        // onEditorWillMount={onEditorWillMount}
                        onEditorDidMount={onEditorDidMount}
                        options={{
                          automaticLayout: true,
                        }}
                      />
                      {/* <MonacoEditor
                        height={`calc(${
                          showProps ? "50vh - 96px" : "100vh - 174px"
                        })`}
                        width="500px"
                        language="javascript"
                        value={code}
                        onChange={onChange}
                        editorDidMount={onEditorDidMount}
                        options={{
                          automaticLayout: true,
                        }}
                      /> */}
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
  );
};
