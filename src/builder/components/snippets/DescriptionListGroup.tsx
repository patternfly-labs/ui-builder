/**
 * Override PF component because it does not forward props
 * https://github.com/patternfly/patternfly-react/blob/main/packages/react-core/src/components/DescriptionList/DescriptionListGroup.tsx
 */

import * as React from 'react';
import styles from '@patternfly/react-styles/css/components/DescriptionList/description-list';
import { css } from '@patternfly/react-styles';

export interface DescriptionListGroupProps extends React.HTMLProps<HTMLDivElement> {
  /** Any elements that can be rendered in the list group */
  children?: any;
  /** Additional classes added to the DescriptionListGroup */
  className?: string;
}

export const DescriptionListGroup: React.FC<DescriptionListGroupProps> = ({
  className,
  children,
  ...props
}: DescriptionListGroupProps) => <div className={css(styles.descriptionListGroup, className)} {...props}>{children}</div>;
DescriptionListGroup.displayName = 'DescriptionListGroup';