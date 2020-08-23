// @flow
import * as React from 'react';

import LdContext from './Context';

export default function useLdFlag<T = boolean>(name: string, fallback: T): T {
  const { flags } = React.useContext(LdContext);
  const feature = flags?.[name];

  if (typeof feature === 'undefined') return fallback;

  return feature;
}
