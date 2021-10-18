import * as React from 'react';
import { componentToClassMap } from '../componentToClassMap';

export interface AccordionItemProps {
  /** Content rendered inside the Accordion item  */
  children?: React.ReactNode;
}

export const AccordionItem: React.FunctionComponent<AccordionItemProps> = ({ children = null, ...props }: AccordionItemProps) => (
  <div className={`${componentToClassMap.AccordionItem}`} {...props}>{children}</div>
);
AccordionItem.displayName = 'AccordionItem';