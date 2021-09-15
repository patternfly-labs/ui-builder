import * as React from 'react';
import { Page, PageHeader, PageSidebar, PageHeaderTools, PageHeaderToolsGroup, PageHeaderToolsItem, PageSection, Switch, Brand } from '@patternfly/react-core';
import { CodeEditor, Language } from '@patternfly/react-code-editor';
import logo from './logo.svg';
import { LiveRegion } from './liveRegion';
import { ComponentList } from './components/componentList';

export const App = () => {
  const [code, setCode] = React.useState('<Page>page</Page>');
  const [showCode, setShowCode] = React.useState(true);

  return (
    <Page
      className="pf-builder-page"
      header={
        <PageHeader
          showNavToggle
          logo={
            <Brand src={logo} alt="PatternFly Logo" />
          }
          headerTools={
            <PageHeaderTools>
              <PageHeaderToolsGroup>
                <PageHeaderToolsItem>
                  <Switch label="Show code" isChecked={showCode} onChange={() => setShowCode(!showCode)} />
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
        <LiveRegion code={code} setCode={setCode} />
        {showCode && <CodeEditor
          language={Language.javascript}
          height="400px"
          code={code}
          onChange={newCode => setCode(newCode)}
          isLineNumbersVisible
        />}
      </PageSection>
    </Page>
  );
};

