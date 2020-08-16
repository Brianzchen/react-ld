// @flow
import * as React from 'react';

import LdContext from './Context';

export default function useLdFlag(name: string, fallback?: boolean = false): boolean {
  const { flags } = React.useContext(LdContext);

  if (!flags) return fallback;

  return flags?.[name];
}
