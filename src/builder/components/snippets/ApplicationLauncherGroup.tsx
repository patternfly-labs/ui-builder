/**
 * Override PF component because it does not forward props
 * https://github.com/patternfly/patternfly-react/issues/6454
 */

import * as React from 'react';
import { DropdownGroup, DropdownGroupProps } from './DropdownGroup';

export const ApplicationLauncherGroup: React.FunctionComponent<DropdownGroupProps> = ({
  children,
  ...props
}: DropdownGroupProps) => <DropdownGroup {...props}>{children}</DropdownGroup>;
ApplicationLauncherGroup.displayName = 'ApplicationLauncherGroup';
