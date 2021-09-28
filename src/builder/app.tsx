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
  componentDemos,
  ComponentList,
} from "./components/componentList";
import { Base64 } from "js-base64";
import { css } from "@patternfly/react-styles";
import { Props } from "./components/docgen/Props";
import { parse } from "./helpers/parse";

export const App = ({ vscode, data, filePath }) => {
  const codeFromStorage = localStorage.getItem("pf-builder-code");
  const template = components.Page;
  const [code, setCode] = React.useState(codeFromStorage || template);
  const [showCode, setShowCode] = React.useState(true);
  const [component, setComponent] = React.useState(null);

  React.useEffect(() => {
    if (data) {
      console.log(vscode);
      console.log(filePath);
      const decodedData = Base64.decode(data);
      if (decodedData !== code) {
        debugger;
        setCode(decodedData);
      }
    }
  }, [data]);

  React.useEffect(() => {
    // save to local storage on code change
    localStorage.setItem("pf-builder-code", code);
  }, [code]);

  const onChange = (newCode) => {
    debugger;
    if (!newCode) {
      setTimeout(() => setCode(template), 1);
    } /*else if (newCode.includes("PageHeader") && !newCode.includes("header=")) {
      // cheating here... remove when LiveRegion onLiveRegionDrop can handle adding JSXAttributes
      setCode(`<Page header={<PageHeader></PageHeader>}></Page>`);
    } */ else {
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
        // Log the current word in the console, you probably want to do something else here.
        // console.log(model.getWordAtPosition(position));
        return {
          range: new monaco.Range(
            1,
            1,
            model.getLineCount(),
            model.getLineMaxColumn(model.getLineCount())
          ),
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
      if (possibleTag && components[possibleTag]) {
        // const offset = editor.getModel().getOffsetAt(editor.getPosition());
        // const fullText = editor.getValue();
        // // the character directly following after the cursor
        // console.log(fullText[offset]);
        // let startOffset = offset - 1;
        // let endOffset = offset + 1;
        // while (startOffset !== 0 && fullText[startOffset] !== "<") {
        //   startOffset = startOffset - 1;
        // }
        // while (endOffset !== fullText.length && fullText[endOffset] !== ">") {
        //   endOffset = endOffset + 1;
        // }
        // const tag =
        //   fullText.substring(startOffset, endOffset + 1) + `</${possibleTag}>`;
        // console.log(`full tag`);
        // console.log(tag);
        // const jsx = parse(tag);
        // debugger;
        // var position = editor.getPosition();
        // var text = editor.getValue(position);
        // var splitedText = text.split("\n");
        // var line = splitedText[position.lineNumber - 1];
        // var regex = /<(\w+)[^\/>]*$/;
        // if (line.match(regex)) {
        //   var content = "</" + line.match(regex)[1] + ">";
        //   editor.trigger("bla", "type", { text: content });
        //   editor.setPosition(position);
        // }

        // const asd = monaco;
        // const bbb = editor;
        // const m = editor.getModel();
        // const a = m.getWordAtPosition(editor.getPosition());
        // console.log(a);

        setComponent(possibleTag);
        // console.log(components[possibleTag]);
      }
    });
  };

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
            className={css("uib-preview", showCode ? "layout-mode" : "preview-mode")}
          >
            <LiveRegion code={code} setCode={onChange} />
          </SplitItem>
          {showCode && (
            <>
              <SplitItem
                style={{ display: !vscode ? "block" : "none" }}
                className="pf-builder-editor"
              >
                <div>
                  <Tabs defaultActiveKey={0}>
                    <Tab eventKey={0} title={<TabTitleText>Main</TabTitleText>}>
                      <CodeEditor
                        language={Language.javascript}
                        height={`calc(${
                          component ? "50vh - 96px" : "100vh - 174px"
                        })`}
                        width="400px"
                        code={code}
                        onChange={onChange}
                        isLineNumbersVisible
                        // onEditorWillMount={onEditorWillMount}
                        onEditorDidMount={onEditorDidMount}
                        options={{
                          automaticLayout: true,
                        }}
                      />
                    </Tab>
                  </Tabs>
                </div>
                {component && (
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
