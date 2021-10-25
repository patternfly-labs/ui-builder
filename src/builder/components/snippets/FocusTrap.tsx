import * as React from 'react';

export const FocusTrap = ({
  children,
  className,
  focusTrapOptions,
  active,
  paused,
  preventScrollOnDeactivate,
  ...rest
}) => <div className={className} {...rest}>{children}</div>;
