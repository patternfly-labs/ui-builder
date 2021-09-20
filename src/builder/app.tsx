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
} from "@patternfly/react-core";
import { CodeEditor, Language } from "@patternfly/react-code-editor";
import logo from "./logo.svg";
import { LiveRegion } from "./liveRegion";
import { ComponentList } from "./components/componentList";
import { Base64 } from "js-base64";

export const App = ({ vscode, data, filePath }) => {
  const [code, setCode] = React.useState("<Page>page</Page>");
  const [showCode, setShowCode] = React.useState(true);

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

  const onChange = (newCode) => {
    setCode(newCode);
    vscode &&
      vscode.postMessage &&
      vscode.postMessage({
        command: "codeEditor",
        text: newCode,
      });
  };
  return (
    <Page
      className="pf-builder-page"
      isManagedSidebar
      header={
        <PageHeader
          showNavToggle
          logo={<Brand src={logo} alt="PatternFly Logo" />}
          headerTools={
            <PageHeaderTools>
              <PageHeaderToolsGroup>
                <PageHeaderToolsItem>
                  <Switch
                    label="Show code"
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
        <PageSidebar className="pf-builder-sidebar" nav={<ComponentList />} />
      }
    >
      <PageSection>
        <Split>
          <SplitItem isFilled className="uib-preview">
            <LiveRegion code={code} setCode={onChange} />
          </SplitItem>
          {showCode && (
            <SplitItem>
              <CodeEditor
                language={Language.javascript}
                height="calc(100vh - 142px)"
                width="400px"
                code={code}
                onChange={onChange}
                isLineNumbersVisible
              />
            </SplitItem>
          )}
        </Split>
      </PageSection>
    </Page>
  );
};
